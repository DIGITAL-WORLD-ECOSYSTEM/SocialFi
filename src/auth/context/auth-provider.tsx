'use client';

import type { AuthState } from '../types';

import { useSetState } from 'minimal-shared/hooks';
import { useMemo, useEffect, useCallback } from 'react';

import axios, { endpoints } from 'src/lib/axios';

import { JWT_STORAGE_KEY } from './constant';
import { AuthContext } from './auth-context';
import { setSession, isValidToken } from './utils';

// ----------------------------------------------------------------------

/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const { state, setState } = useSetState<AuthState>({ user: null, loading: true });

  const checkUserSession = useCallback(async () => {
    try {
      // --- CÓDIGO PARA DESENVOLVIMENTO (MOCK) ---
      // Aqui simulamos que encontramos um token e que o usuário é válido
      const mockUser = {
        id: '1',
        displayName: 'Desenvolvedor Cloudflare',
        email: 'dev@cloudflare.com',
        role: 'admin', // Garante acesso a todas as áreas
        photoURL: '/assets/images/avatar/avatar-1.webp', // Verifique se este caminho existe em public/
        accessToken: 'fake-jwt-token'
      };

      // Forçamos o estado de autenticado imediatamente
      setState({ user: mockUser, loading: false });
      
      // Opcional: define um token falso no sessionStorage para outros componentes não reclamarem
      // A função setSession original tenta decodificar o token, o que causa um erro com 'fake-jwt-token'.
      // Fazemos as partes necessárias de setSession manualmente.
      const fakeToken = 'fake-jwt-token';
      sessionStorage.setItem(JWT_STORAGE_KEY, fakeToken);
      axios.defaults.headers.common.Authorization = `Bearer ${fakeToken}`;
      // ------------------------------------------

      /* // COMENTADO PARA NÃO PRECISAR DE BACKEND AGORA:
      const accessToken = sessionStorage.getItem(JWT_STORAGE_KEY);
      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);
        const res = await axios.get(endpoints.auth.me);
        const { user } = res.data;
        setState({ user: { ...user, accessToken }, loading: false });
      } else {
        setState({ user: null, loading: false });
      }
      */
    } catch (error) {
      console.error(error);
      setState({ user: null, loading: false });
    }
  }, [setState]);
  
  useEffect(() => {
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user ? { ...state.user, role: state.user?.role ?? 'admin' } : null,
      checkUserSession,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
    }),
    [checkUserSession, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
