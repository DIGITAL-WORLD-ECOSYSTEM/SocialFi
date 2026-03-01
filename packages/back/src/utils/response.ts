/**
 * Copyright 2026 ASPPIBRA – Associação dos Proprietários e Possuidores de Imóveis no Brasil.
 * Project: Governance System (ASPPIBRA DAO)
 * Role: Standardized API Responses (Absolute Bank-Grade 10/10)
 * Version: 4.0.0 - O(1) Sizing, Cache Control, Normalized Contract & Circular JSON Defenses
 */

import { Context } from 'hono';
import { ContentfulStatusCode } from 'hono/utils/http-status';

/**
 * 🛡️ SRE: Interface Base (Bank-Grade)
 * Contrato estrito com `message` normalizada (sem duplicação).
 */
interface ApiResponse<T = null> {
  success: boolean;
  message: string; // Human-readable message
  data?: T | null;
  error?: {
    code: number; // Technical HTTP Code
    errorCode?: string; // Ex: 'AUTH_INVALID_TOKEN'
    details?: Record<string, string[] | string> | string | null;
  };
  meta: {
    timestamp: string;
    traceId: string;
  };
}

// 🛡️ SRE: O(1) Memory Protection (Heurísticas leves para evitar double-serialization)
const MAX_ARRAY_ITEMS = 2500;
const MAX_OBJECT_KEYS = 500;

const isOversized = (payload: any): boolean => {
  if (!payload) return false;
  if (Array.isArray(payload)) return payload.length > MAX_ARRAY_ITEMS;
  if (typeof payload === 'object') return Object.keys(payload).length > MAX_OBJECT_KEYS;
  return false;
};

// 🛡️ SRE: Injeta Headers Estritos contra Vazamento em Cache de Borda
const setSecureHeaders = (c: Context, traceId: string) => {
  c.header('Content-Type', 'application/json; charset=utf-8');
  c.header('X-Trace-Id', traceId);
  c.header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  c.header('Pragma', 'no-cache');
  c.header('Expires', '0');
};

/**
 * Resposta de Sucesso Padronizada
 */
export const success = <T = null>(
  c: Context,
  message: string = 'Operação realizada com sucesso',
  data: T | null = null,
  status: ContentfulStatusCode = 200
) => {
  const traceId = c.res.headers.get('X-Trace-Id') || c.req.header('X-Trace-Id') || crypto.randomUUID();
  const timestamp = c.get('timestamp') || new Date().toISOString();

  setSecureHeaders(c, traceId);

  // 🛡️ SRE: Fast O(1) Payload Bound Check
  if (isOversized(data)) {
    console.error(`[SRE_MEMORY_WARN] Trace: ${traceId} - Success payload exceeded safe heuristic limits`);
    return error(c, 'Internal Server Error (Payload Too Large)', null, 500, 'PAYLOAD_OVERSIZED');
  }

  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
    meta: { timestamp, traceId }
  };

  try {
    return c.json(response, status);
  } catch (e) {
    // 🛡️ SRE: Captura Circular JSON Nativamente sem custo prévio
    console.error(`[SRE_SERIALIZATION_CRASH] Trace: ${traceId}`, {
      type: typeof data,
      isArray: Array.isArray(data),
      error: e
    });
    return error(c, 'Internal Serialization Failure', null, 500, 'CIRCULAR_JSON_ERROR');
  }
};

/**
 * Resposta de Erro Padronizada
 */
export const error = (
  c: Context,
  message: string,
  details: Record<string, string[] | string> | string | null = null,
  status: ContentfulStatusCode = 400,
  errorCode?: string
) => {
  const traceId = c.res.headers.get('X-Trace-Id') || c.req.header('X-Trace-Id') || crypto.randomUUID();
  const timestamp = c.get('timestamp') || new Date().toISOString();

  const env = (c.env as any)?.NODE_ENV || 'production';
  const isProd = env === 'production';

  setSecureHeaders(c, traceId);

  // 🛡️ SECURITY: Masking & Instance Redaction
  let safeDetails: any = details instanceof Error ? 'Internal Error Object Redacted' : details;

  if (isProd && typeof safeDetails === 'string' && errorCode !== 'PAYLOAD_OVERSIZED' && errorCode !== 'CIRCULAR_JSON_ERROR') {
    safeDetails = 'Redacted for security. See worker logs with traceId.';
  }

  // 🛡️ SRE: Protege contra detalhes massivos
  if (isOversized(safeDetails)) {
    console.error(`[SRE_MEMORY_WARN] Trace: ${traceId} - Error details exceeded safe limits`);
    safeDetails = 'Error details truncated due to massive size.';
  }

  const response: ApiResponse = {
    success: false,
    message,
    error: {
      code: status,
      ...(errorCode && { errorCode }),
      details: safeDetails
    },
    meta: { timestamp, traceId }
  };

  try {
    return c.json(response, status);
  } catch (e) {
    console.error(`[SRE_SERIALIZATION_CRASH_ERROR] Trace: ${traceId}`, e);
    return c.json({
      success: false,
      message: 'Critical Serialization Failure',
      error: { code: 500, errorCode: 'CRITICAL_CIRCULAR_ERROR' },
      meta: { timestamp, traceId }
    }, 500);
  }
};
