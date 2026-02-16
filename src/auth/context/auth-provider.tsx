/**
 * Copyright 2026 ASPPIBRA – Associação dos Proprietários e Possuidores de Imóveis no Brasil.
 * Project: Governance System (ASPPIBRA DAO)
 * Role: Auth Context Provider (Next.js Client)
 * Version: 1.1.0 - Full Credential Cycle Integration
 */

'use client';

import type { User, AuthState } from '../types';

import { useSetState } from 'minimal-shared/hooks';
import { useMemo, useEffect, useCallback } from 'react';

import axios, { endpoints } from 'src/lib/axios';

import { AuthContext } from './auth-context';
import { JWT_STORAGE_KEY } from './constant';
import { setSession, isValidToken } from './utils';

type Props = { children: React.ReactNode };

/**
 * Mapeamento do Usuário (Backend D1 -> Frontend React)
 * Transforma a estrutura bruta do banco de dados em um objeto 'User' tipado.
 * Otimiza o TBT (Total Blocking Time) ao tratar strings fora do render loop.
 */
const mapUser = (user: Partial<User>, accessToken: string): User => ({
  ...user,
  id: user.id || 0,
  email: user.email || '',
  firstName: user.firstName || '',
  lastName: user.lastName || '',
  displayName: user.displayName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Membro DAO',
  role: user.role || 'citizen', 
  photoURL: user.photoURL || '/assets/icons/glass/ic_glass_users.png',
  accessToken,
}) as User;

export function AuthProvider({ children }: Props) {
  const { state, setState } = useSetState<AuthState>({
    user: null, 
    loading: true 
  });

  // [1. CHECK SESSION] - Validação de persistência ao recarregar a página
  const checkUserSession = useCallback(async () => {
    try {
      const accessToken = typeof window !== 'undefined' ? localStorage.getItem(JWT_STORAGE_KEY) : null;

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);
        const res = await axios.get(endpoints.auth.me);
        
        // Extração baseada no utilitário de resposta padronizada v1.1.0 do backend
        const userData = res.data?.data?.user || res.data?.user;
        
        const sessionUser = mapUser(userData, accessToken);
        setState({ user: sessionUser, loading: false });
      } else {
        setSession(null);
        setState({ user: null, loading: false });
      }
    } catch (error: any) {
      // Resiliência para conexões instáveis ou offline
      if (!error.response) {
        console.warn('⚠️ Modo Offline: Mantendo sessão local persistida.');
        setState({ loading: false });
      } else {
        setSession(null);
        setState({ user: null, loading: false });
      }
    }
  }, [setState]);

  // [2. SIGN IN] - Autenticação de usuários existentes
  const signIn = useCallback(async (email: string, password: string) => {
    const res = await axios.post(endpoints.auth.signIn, { email, password });
    
    const { accessToken, user } = res.data.data;

    if (!accessToken) throw new Error('Falha crítica: Token de acesso não emitido.');

    const sessionUser = mapUser(user, accessToken);
    
    setSession(accessToken); 
    setState({ user: sessionUser, loading: false });
  }, [setState]);

  // [3. SIGN UP] - Registro de novos membros (🟢 NOVO: Integrado)
  const signUp = useCallback(async (data: any) => {
    const res = await axios.post(endpoints.auth.signUp, data);
    
    const { accessToken, user } = res.data.data;

    if (!accessToken) throw new Error('Erro ao gerar credenciais pós-cadastro.');

    const sessionUser = mapUser(user, accessToken);
    
    setSession(accessToken);
    setState({ user: sessionUser, loading: false });
  }, [setState]);

  // [4. SIGN OUT] - Encerramento de sessão
  const signOut = useCallback(async () => {
    setSession(null);
    setState({ user: null, loading: false });
  }, [setState]);

  // Inicialização do estado de autenticação
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  // Derivação de status para facilitar o controle de guards (AuthGuard)
  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';
  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      signIn,
      signUp, // Exposto para componentes de registro
      signOut,
      checkUserSession,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
    }),
    [checkUserSession, state.user, status, signIn, signUp, signOut]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}