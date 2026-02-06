'use client';

import { useMemo, useEffect, useCallback } from 'react';
import { useSetState } from 'minimal-shared/hooks';

import axios, { endpoints } from 'src/lib/axios';

import { AuthContext } from './auth-context';
import { JWT_STORAGE_KEY } from './constant';
import { setSession, isValidToken } from './utils';

// ✅ Importando tipos corretamente - Certifique-se de que 'User' está exportado em '../types'
import type { AuthState, User } from '../types';

type Props = { children: React.ReactNode };

// Função de mapeamento para alinhar o usuário do Backend (D1) com o Frontend (React)
const mapUser = (user: any, accessToken: string): User => ({
  ...user,
  displayName: `${user.firstName} ${user.lastName}`.trim(),
  role: user.role || 'user', 
  photoURL: user.photoURL || '/assets/icons/glass/ic_glass_users.png',
  accessToken,
});

export function AuthProvider({ children }: Props) {
  const { state, setState } = useSetState<AuthState>({
    user: null, 
    loading: true 
  });

  // [CHECK SESSION] - Nível 10/10 com blindagem de rede
  const checkUserSession = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem(JWT_STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);
        const res = await axios.get(endpoints.auth.me);
        const { user } = res.data.data; 

        const sessionUser = mapUser(user, accessToken);
        setState({ user: sessionUser, loading: false });
      } else {
        setSession(null);
        setState({ user: null, loading: false });
      }
    } catch (error: any) {
      if (!error.response) {
        // Erro de Rede (Servidor Offline) - Mantemos a sessão local
        console.warn('⚠️ ASPPIBRA-DAO Offline: Tentando manter sessão local.');
        const backupToken = localStorage.getItem(JWT_STORAGE_KEY);
        if (backupToken) setSession(backupToken);
        setState({ loading: false });
      } else {
        // Erro de Autenticação Real (401, 500) - Limpa tudo
        setSession(null);
        setState({ user: null, loading: false });
      }
    }
  }, [setState]);

  // [LOGIN] - 🔥 Versão "Blindada" 10/10 com mapeamento do D1
  const signIn = useCallback(async (email: string, password: string) => {
    try {
      // ✅ Corrigido: usando 'signIn' conforme definido no seu axios.ts
      const res = await axios.post(endpoints.auth.signIn, { email, password });
      
      const { accessToken, user } = res.data.data;

      if (!accessToken) throw new Error('Falha na emissão do passaporte digital.');

      const sessionUser = mapUser(user, accessToken);
      
      setSession(accessToken); 
      setState({ user: sessionUser, loading: false });

    } catch (error: any) {
      const message = error.response?.data?.message || 'Erro na comunicação com a DAO';
      
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