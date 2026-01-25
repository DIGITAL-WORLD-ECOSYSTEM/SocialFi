import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  // URL base da sua API real na Cloudflare
  baseURL: 'https://api.asppibra.com', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de Resposta para simplificar o tratamento de erros nos componentes
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Captura a mensagem de erro vinda do Cloudflare Worker ou erro de rede
    const message = error?.response?.data?.message || error?.message || 'Erro inesperado!';
    return Promise.reject({ message, ...error });
  }
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async <T = unknown>(
  args: string | [string, AxiosRequestConfig]
): Promise<T> => {
  const [url, config] = Array.isArray(args) ? args : [args, {}];
  const res = await axiosInstance.get<T>(url, config);
  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  // Rotas sincronizadas com o seu src/index.ts do Backend
  auth: {
    me: '/api/core/auth/me',
    signIn: '/api/core/auth/login',
    signUp: '/api/core/auth/register',
  },
  post: {
    list: '/api/posts', // Rota que definimos para o Blog
    details: (id: string) => `/api/posts/${id}`,
  },
  agro: {
    list: '/api/products/agro',
  },
  rwa: {
    list: '/api/products/rwa',
  }
} as const;