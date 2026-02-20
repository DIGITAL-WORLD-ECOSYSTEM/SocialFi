/**
 * Copyright 2026 ASPPIBRA – Associação dos Proprietários e Possuidores de Imóveis no Brasil.
 * Project: Governance System (ASPPIBRA DAO)
 * Role: Auth Utilities (JWT, Session & Cookie Management)
 * Version: 1.2.0 - Middleware Sync & Security Hardened
 */

import axios from 'src/lib/axios';
import { JWT_STORAGE_KEY } from './constant';

// Interface global para controle de timers de expiração no navegador
declare global {
  interface Window {
    tokenTimeout: any;
  }
}

// ----------------------------------------------------------------------

/**
 * 1. DECODE ROBUSTO (UTF-8 Friendly)
 * Decodifica o payload do JWT suportando caracteres especiais e acentuação.
 * Essencial para nomes de produtores e cidadãos brasileiros.
 */
export function jwtDecode(token: string) {
  try {
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length < 3) throw new Error('Invalid JWT Structure');

    // Converte Base64URL para Base64 padrão
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    
    // Decodifica lidando com escape de URI para suporte a Unicode
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('🔥 Erro no decode do passaporte digital:', error);
    return null;
  }
}

// ----------------------------------------------------------------------

/**
 * VALIDAÇÃO DE TOKEN
 * Checa se o token existe e se a data de expiração (exp) ainda é futura.
 */
export function isValidToken(accessToken: string) {
  if (!accessToken) return false;

  const decoded = jwtDecode(accessToken);
  if (!decoded || !decoded.exp) return false;

  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
}

// ----------------------------------------------------------------------

/**
 * 3. GESTÃO DE EXPIRAÇÃO (Auto-Logout)
 * Monitora o tempo restante do token e dispara um evento global ao expirar.
 */
export function tokenExpired(exp: number) {
  if (typeof window === 'undefined') return;

  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;

  // Limpa timeout anterior para evitar execuções duplicadas
  if (window.tokenTimeout) clearTimeout(window.tokenTimeout);

  if (timeLeft <= 0) {
    window.dispatchEvent(new CustomEvent('onTokenExpired'));
    return;
  }

  // Agenda o logout automático exatamente para o segundo em que o token vence
  window.tokenTimeout = window.setTimeout(() => {
    window.dispatchEvent(new CustomEvent('onTokenExpired'));
  }, timeLeft);
}

// ----------------------------------------------------------------------

/**
 * 2. SET SESSION (Sincronização Híbrida: Storage + Cookie + Axios)
 * 🟢 MELHORIA CRÍTICA: Grava o Cookie 'accessToken' para que o Middleware da Vercel
 * possa validar o acesso às rotas protegidas (/dashboard) no lado do servidor.
 */
export function setSession(accessToken: string | null) {
  try {
    if (typeof window === 'undefined') return;

    if (accessToken) {
      // A. Persistência Local (Para o estado do React/Axios)
      localStorage.setItem(JWT_STORAGE_KEY, accessToken);
      
      // B. Configuração de Header Global
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      // C. SINCRONIZAÇÃO COM MIDDLEWARE (Cookie)
      // Define o cookie com validade global e proteção SameSite
      const isSecure = window.location.protocol === 'https:';
      document.cookie = `accessToken=${accessToken}; path=/; SameSite=Lax; ${isSecure ? 'Secure' : ''}`;

      // D. Inicia contador de expiração
      const decoded = jwtDecode(accessToken);
      if (decoded?.exp) tokenExpired(decoded.exp);
      
    } else {
      // LIMPEZA TOTAL (Sign Out)
      localStorage.removeItem(JWT_STORAGE_KEY);
      
      // Remove o Cookie forçando a expiração no passado
      document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
      
      delete axios.defaults.headers.common.Authorization;
      
      if (window.tokenTimeout) clearTimeout(window.tokenTimeout);
    }
  } catch (error) {
    console.error('❌ Falha técnica ao sincronizar sessão:', error);
  }
}