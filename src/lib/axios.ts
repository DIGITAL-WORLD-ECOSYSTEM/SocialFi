/**
 * Copyright 2026 ASPPIBRA – Associação dos Proprietários e Possuidores de Imóveis no Brasil.
 * Project: Governance System (ASPPIBRA DAO)
 * Role: API Client Configuration (Axios Instance)
 * Version: 1.1.0 - Auth Injection & Error Handling
 */

import type { AxiosRequestConfig } from 'axios';

import axios from 'axios';

import { JWT_STORAGE_KEY } from 'src/auth/context/constant';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  // URL base sincronizada com o domínio customizado definido no wrangler.jsonc
  baseURL: 'https://api.asppibra.com', 
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 1. INTERCEPTOR DE REQUISIÇÃO
 * Este bloco é vital: Ele verifica se existe um token no localStorage
 * e o injeta automaticamente no Header Authorization de cada chamada.
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem(JWT_STORAGE_KEY) : null;
    
    if (token) {
      // 🟢 Injeção do Bearer Token compatível com o middleware requireAuth v1.2.1
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * 2. INTERCEPTOR DE RESPOSTA
 * Simplifica o tratamento de erros nos componentes React, extraindo a mensagem 
 * enviada pelo utilitário response.ts do Backend Cloudflare.
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Captura a mensagem customizada do Backend (e.g., "E-mail já cadastrado")
    const message = error?.response?.data?.message || error?.message || 'Erro inesperado no sistema!';
    
    /**
     * Se o backend retornar 401 (Unauthorized), pode significar que o token expirou.
     * Aqui você poderia disparar um evento de logout automático se desejar.
     */
    
    return Promise.reject({ message, ...error });
  }
);

export default axiosInstance;

// ----------------------------------------------------------------------

/**
 * FETCHER GENÉRICO
 * Utilizado principalmente para hooks de busca de dados (SWR / React Query).
 */
export const fetcher = async <T = unknown>(
  args: string | [string, AxiosRequestConfig]
): Promise<T> => {
  const [url, config] = Array.isArray(args) ? args : [args, {}];
  const res = await axiosInstance.get<T>(url, config);
  return res.data;
};

// ----------------------------------------------------------------------

/**
 * ENDPOINTS DA PLATAFORMA
 * Centralização de rotas para evitar Magic Strings e facilitar o refactor.
 * O uso de 'as const' garante Type-Safety total no TypeScript.
 */
export const endpoints = {
  auth: {
    me: '/api/core/auth/me',
    signIn: '/api/core/auth/login',
    signUp: '/api/core/auth/register',
    resetPassword: '/api/core/auth/reset-password',
    updatePassword: '/api/core/auth/update-password',
    verify: '/api/core/auth/verify',
    resendCode: '/api/core/auth/resend-code',
  },
  post: {
    list: '/api/posts', 
    // Ajustado para refletir a busca por slug/identificador no SocialFi
    details: (slug: string) => `/api/posts/${slug}`,
  },
  agro: {
    list: '/api/products/agro',
    inventory: '/api/products/agro/inventory',
  },
  rwa: {
    list: '/api/products/rwa',
    valuation: (id: string) => `/api/products/rwa/valuation/${id}`,
  }
} as const;