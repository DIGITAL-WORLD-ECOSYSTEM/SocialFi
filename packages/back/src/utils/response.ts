/**
 * Copyright 2026 ASPPIBRA – Associação dos Proprietários e Possuidores de Imóveis no Brasil.
 * Project: Governance System (ASPPIBRA DAO)
 * Role: Standardized API Responses (Absolute Bank-Grade 10/10)
 * Version: 3.0.0 - Trace Fallbacks, Structured Error Codes & Prod Masking
 */

import { Context } from 'hono';
import { ContentfulStatusCode } from 'hono/utils/http-status';

/**
 * 🛡️ SRE: Interface Base (Bank-Grade)
 * Garante que TODO payload possua metadados de rastreabilidade e estrutura para Automação/i18n.
 */
interface ApiResponse<T = null> {
  success: boolean;
  message: string;
  data?: T | null;
  error?: {
    code: number;
    errorCode?: string; // Ex: 'AUTH_INVALID_TOKEN' (Para i18n e roteamento no front)
    message: string;
    details?: Record<string, string[] | string> | string | null;
  };
  meta: {
    timestamp: string;
    traceId: string;
  };
}

/**
 * Resposta de Sucesso Padronizada (Type-Safe)
 * Injeta o Trace ID e garante Content-Type explícito.
 */
export const success = <T = null>(
  c: Context,
  message: string = 'Operação realizada com sucesso',
  data: T | null = null,
  status: ContentfulStatusCode = 200
) => {
  // 🛡️ SRE: Fallback garantido do TraceId para que nenhum log fique órfão
  const traceId = c.res.headers.get('X-Trace-Id') || c.req.header('X-Trace-Id') || crypto.randomUUID();
  const timestamp = new Date().toISOString();

  // Força cabeçalhos de contrato estritos
  c.header('Content-Type', 'application/json; charset=utf-8');
  c.header('X-Trace-Id', traceId);

  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
    meta: { timestamp, traceId }
  };

  return c.json(response, status);
};

/**
 * Resposta de Erro Padronizada (Secure Serialization & Data Masking)
 * Evita vazamento de topologia e suporta Códigos Estruturados para i18n.
 */
export const error = (
  c: Context,
  message: string,
  details: Record<string, string[] | string> | string | null = null,
  status: ContentfulStatusCode = 400,
  errorCode?: string // 🛡️ SRE: Ex: "RATE_LIMIT_EXCEEDED"
) => {
  const traceId = c.res.headers.get('X-Trace-Id') || c.req.header('X-Trace-Id') || crypto.randomUUID();
  const timestamp = new Date().toISOString();
  const env = (c.env as any)?.NODE_ENV || 'production';
  const isProd = env === 'production';

  // 🛡️ SECURITY: Fail-safe 1 - Intercepta instâncias reais de erro
  let safeDetails: any = details instanceof Error ? 'Internal Error Object Redacted' : details;

  // 🛡️ SECURITY: Fail-safe 2 - Mascara strings livres em produção (Evita vazar mensagens de driver SQL)
  // Permitimos apenas objetos (como erros do Zod) em produção, ou null.
  if (isProd && typeof safeDetails === 'string') {
    safeDetails = 'Redacted for security. See worker logs with traceId.';
  }

  // Força cabeçalhos de contrato estritos
  c.header('Content-Type', 'application/json; charset=utf-8');
  c.header('X-Trace-Id', traceId);

  const response: ApiResponse = {
    success: false,
    message: 'Operation Failed',
    error: {
      code: status,
      ...(errorCode && { errorCode }),
      message,
      details: safeDetails
    },
    meta: { timestamp, traceId }
  };

  return c.json(response, status);
};
