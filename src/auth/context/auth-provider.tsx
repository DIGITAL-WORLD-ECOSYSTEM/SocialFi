'use client';

// ✅ Sincronizado com o RoleBasedGuard: Usando 'User' como membro exportado
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
 * Melhora o TBT ao processar dados fora do ciclo principal de renderização
 */
const mapUser = (user: any, accessToken: string): User => ({
  ...user,
  displayName: user.displayName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Usuário',
  role: user.role || 'user', 
  photoURL: user.photoURL || '/assets/icons/glass/ic_glass_users.png',
  accessToken,
});

export function AuthProvider({ children }: Props) {
  const { state, setState } = useSetState<AuthState>({
    user: null, 
    loading: true 
  });

  // [CHECK SESSION] - Foco em evitar travamento da Main Thread (TBT)
  const checkUserSession = useCallback(async () => {
    try {
      const accessToken = typeof window !== 'undefined' ? localStorage.getItem(JWT_STORAGE_KEY) : null;

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);
        const res = await axios.get(endpoints.auth.me);
        
        // Garantindo extração segura dos dados conforme seu log de build
        const userData = res.data?.data?.user || res.data?.user || res.data;
        
        const sessionUser = mapUser(userData, accessToken);
        setState({ user: sessionUser, loading: false });
      } else {
        setSession(null);
        setState({ user: null, loading: false });
      }
    } catch (error: any) {
      if (!error.response) {
        console.warn('⚠️ Conexão offline: Tentando manter sessão local.');
        const backupToken = localStorage.getItem(JWT_STORAGE_KEY);
        if (backupToken) setSession(backupToken);
        setState({ loading: false });
      } else {
        setSession(null);
        setState({ user: null, loading: false });
      }
    }
  }, [setState]);

  // [LOGIN] - Implementação otimizada
  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const res = await axios.post(endpoints.auth.signIn, { email, password });
      
      const { accessToken, user } = res.data.data;

      if (!accessToken) throw new Error('Falha na emissão do passaporte digital.');

      const sessionUser = mapUser(user, accessToken);
      
      setSession(accessToken); 
      setState({ user: sessionUser, loading: false });

    } catch (error: any) {
      const message = error.response?.data?.message || 'Erro na comunicação com o sistema.';
      
      if (error.response?.status === 403) {
        throw new Error('Acesso pendente de aprovação (KYC).');
      }
      
      throw new Error(message);
    }
  }, [setState]);

  const signOut = useCallback(async () => {
    setSession(null);
    setState({ user: null, loading: false });
  }, [setState]);

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';
  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      signIn,
      signOut,
      checkUserSession,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
    }),
    [checkUserSession, state.user, status, signIn, signOut]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}