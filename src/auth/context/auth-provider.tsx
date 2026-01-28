'use client';

import type { AuthState } from '../types';

import { useSetState } from 'minimal-shared/hooks';
import { useMemo, useEffect, useCallback } from 'react';

// Importamos o axios e os endpoints configurados
import axios, { endpoints } from 'src/lib/axios';

import { JWT_STORAGE_KEY } from './constant';
import { AuthContext } from './auth-context';
import { setSession, isValidToken } from './utils';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const { state, setState } = useSetState<AuthState>({ 
    user: null, 
    loading: true 
  });

  const checkUserSession = useCallback(async () => {
    try {
      // 1. Buscamos o token real armazenado (localStorage ou sessionStorage)
      const accessToken = sessionStorage.getItem(JWT_STORAGE_KEY);

      // 2. Verificamos se o token existe e se não está expirado
      if (accessToken && isValidToken(accessToken)) {
        // Define o token no cabeçalho do Axios: Authorization: Bearer <token>
        setSession(accessToken);

        // 3. Chamada REAL para o seu Backend na Cloudflare
        // Rota: GET https://api.asppibra.com/api/core/auth/me
        const res = await axios.get(endpoints.auth.me);
        
        const { user } = res.data;

        // 4. Define o usuário real no estado global do React
        setState({ 
          user: { 
            ...user, 
            accessToken,
            role: user?.role ?? 'citizen' // Role padrão caso não venha do banco
          }, 
          loading: false 
        });
      } else {
        // Se não houver token válido, limpa a sessão e desloga
        setSession(null);
        setState({ user: null, loading: false });
      }
    } catch (error) {
      console.error('Erro na sessão do usuário:', error);
      setSession(null);
      setState({ user: null, loading: false });
    }
  }, [setState]);
  
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';
  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      checkUserSession,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
    }),
    [checkUserSession, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}