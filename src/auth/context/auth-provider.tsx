'use client';

import type { AuthState, User } from '../types';
import { useSetState } from 'minimal-shared/hooks';
import { useMemo, useEffect, useCallback } from 'react';
import axios, { endpoints } from 'src/lib/axios';
import { JWT_STORAGE_KEY } from './constant';
import { AuthContext } from './auth-context';
import { setSession, isValidToken } from './utils';

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
        throw new Error('Token inválido ou ausente');
      }
    } catch (error: any) {
      // 🛡️ MELHORIA: Tratamento de erro de rede vs erro de auth
      if (!error.response) {
        // Erro de Rede (Servidor Offline) - Mantemos a sessão local
        console.warn('⚠️ ASPPIBRA-DAO Offline: Tentando manter sessão local.');
        const backupToken = localStorage.getItem(JWT_STORAGE_KEY);
        if (backupToken) setSession(backupToken);
        setState((prevState) => ({ ...prevState, loading: false }));
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
      const res = await axios.post(endpoints.auth.login, { email, password });
      
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

  // [LOGOUT] - Limpeza de sessão robusta e imediata
  const signOut = useCallback(async () => {
    setSession(null); // Limpa o header do Axios e o localStorage
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

  return <AuthContext.Provider value={memoi""zedValue}>{children}</AuthContext.Provider>;
}
