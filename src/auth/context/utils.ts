import { paths } from 'src/routes/paths';

import axios from 'src/lib/axios';

import { JWT_STORAGE_KEY } from './constant';

// ----------------------------------------------------------------------

export function jwtDecode(token: string) {
  try {
    if (!token) return null;

    const parts = token.split('.');
    if (parts.length < 3) { // JWT real sempre tem 3 partes (header, payload, signature)
      throw new Error('Invalid token format');
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(window.atob(base64));

    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null; 
  }
}

// ----------------------------------------------------------------------

export function isValidToken(accessToken: string) {
  if (!accessToken) return false;

  const decoded = jwtDecode(accessToken);
  if (!decoded || !decoded.exp) return false;

  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
}

// ----------------------------------------------------------------------

export function tokenExpired(exp: number) {
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;

  // Limpa timers anteriores se existirem
  if (window.tokenTimeout) {
    clearTimeout(window.tokenTimeout);
  }

  // Agenda o logout automático quando o token expirar
  window.tokenTimeout = window.setTimeout(() => {
    localStorage.removeItem(JWT_STORAGE_KEY);
    delete axios.defaults.headers.common.Authorization;
    window.location.href = paths.auth.signIn;
  }, timeLeft);
}

// ----------------------------------------------------------------------

export async function setSession(accessToken: string | null) {
  try {
    if (accessToken) {
      // Usamos localStorage para o usuário não precisar logar toda vez que fechar a aba
      localStorage.setItem(JWT_STORAGE_KEY, accessToken);
      
      // Injeta o Token em todas as futuras chamadas de API
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      const decodedToken = jwtDecode(accessToken);

      if (decodedToken && decodedToken.exp) {
        tokenExpired(decodedToken.exp);
      }
    } else {
      localStorage.removeItem(JWT_STORAGE_KEY);
      delete axios.defaults.headers.common.Authorization;
      if (window.tokenTimeout) clearTimeout(window.tokenTimeout);
    }
  } catch (error) {
    console.error('Error during set session:', error);
  }
}

// Tipagem para o window não reclamar do timeout
declare global {
  interface Window {
    tokenTimeout: any;
  }
}