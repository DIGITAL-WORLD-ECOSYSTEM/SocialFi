import axios from 'src/lib/axios';
import { JWT_STORAGE_KEY } from './constant';

// Tipagem para o window não reclamar do timeout
declare global {
  interface Window {
    tokenTimeout: any;
  }
}

// 1. Decode Robusto (Suporta acentos no Nome/Sobrenome)
export function jwtDecode(token: string) {
  try {
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length < 3) throw new Error('Invalid JWT');

    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('🔥 Erro no decode do passaporte:', error);
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

// 3. tokenExpired com Blindagem Total 10/10
export function tokenExpired(exp: number) {
  if (typeof window === 'undefined') return;

  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;

  if (window.tokenTimeout) clearTimeout(window.tokenTimeout);

  // 🛡️ Se o tempo já passou ou é menor que 1s, dispara imediatamente
  if (timeLeft <= 0) {
    window.dispatchEvent(new CustomEvent('onTokenExpired'));
    return;
  }

  window.tokenTimeout = window.setTimeout(() => {
    window.dispatchEvent(new CustomEvent('onTokenExpired'));
  }, timeLeft);
}

// ----------------------------------------------------------------------

// 2. setSession Blindada (SSR safe)
export async function setSession(accessToken: string | null) {
  try {
    if (typeof window === 'undefined') return;

    if (accessToken) {
      localStorage.setItem(JWT_STORAGE_KEY, accessToken);
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      const decoded = jwtDecode(accessToken);
      if (decoded?.exp) tokenExpired(decoded.exp);
    } else {
      localStorage.removeItem(JWT_STORAGE_KEY);
      delete axios.defaults.headers.common.Authorization;
      if (window.tokenTimeout) clearTimeout(window.tokenTimeout);
    }
  } catch (error) {
    console.error('❌ Falha ao sincronizar sessão:', error);
  }
}
