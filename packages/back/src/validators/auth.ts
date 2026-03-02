/**
 * Copyright 2026 ASPPIBRA – Associação dos Proprietários e Possuidores de Imóveis no Brasil.
 * Project: Governance System (ASPPIBRA DAO)
 * Role: Authentication Validators (Absolute Bank-Grade 10/10)
 * Version: 5.0.0 - NIST 12-char Policy, EIP-55 Ready, MFA Prepared & Centralized Dictionary
 */

import { z } from 'zod';

// ======================================================================
// 🛡️ CENTRALIZED ERROR DICTIONARY (i18n & UX Consistency)
// ======================================================================
const AUTH_ERRORS = {
  GENERIC_LOGIN: "E-mail ou senha incorretos",
  EMAIL_FORMAT: "Formato de e-mail inválido",
  EMAIL_MAX: "O e-mail excede o tamanho máximo permitido",
  PASSWORD_POLICY: "A senha deve ter no mínimo 12 caracteres (recomendamos o uso de frases, misturando maiúsculas, minúsculas e números)",
  PASSWORD_MAX: "A senha não pode exceder 128 caracteres",
  PASSWORD_MISMATCH: "As senhas não coincidem",
  NAME_MIN: "O nome deve ter pelo menos 2 caracteres",
  NAME_MAX: "O nome excede o tamanho máximo (64 caracteres)",
  NAME_INVALID: "O nome contém caracteres inválidos (use apenas letras, espaços, apóstrofos ou hifens)",
  WALLET_FORMAT: "Endereço de carteira Web3 inválido",
  TOKEN_INVALID: "Link de recuperação inválido, expirado ou corrompido",
  MFA_FORMAT: "Código 2FA deve conter exatamente 6 dígitos numéricos",
} as const;


// ======================================================================
// 🛡️ REUSABLE BASE SCHEMAS (DRY Architecture)
// ======================================================================

/**
 * 🛡️ SECURITY: NIST 800-63B Modern Password Policy
 * - Comprimento mínimo elevado para 12 (Padrão ouro para resistência a brute-force e quantum-resistant hashes).
 * - Max 128 para previnir DoS no Argon2/Bcrypt.
 */
const basePassword = z.string()
  .min(12, AUTH_ERRORS.PASSWORD_POLICY)
  .max(128, AUTH_ERRORS.PASSWORD_MAX)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, AUTH_ERRORS.PASSWORD_POLICY);

const baseEmail = z.string()
  .trim()
  .toLowerCase()
  .email(AUTH_ERRORS.EMAIL_FORMAT)
  .max(255, AUTH_ERRORS.EMAIL_MAX);

const baseName = z.string()
  .trim()
  .min(2, AUTH_ERRORS.NAME_MIN)
  .max(64, AUTH_ERRORS.NAME_MAX)
  .regex(/^[\p{L}\s'-]+$/u, AUTH_ERRORS.NAME_INVALID);

const walletRegex = /^0x[a-fA-F0-9]{40}$/;


// ======================================================================
// 1. REGISTRO (Sign-Up)
// ======================================================================
export const signUpSchema = z.object({
  firstName: baseName,
  lastName: baseName,
  email: baseEmail,
  password: basePassword,

  // 🛡️ WEB3 SRE: Preprocessing & Checksum Readiness
  walletAddress: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string()
      .regex(walletRegex, AUTH_ERRORS.WALLET_FORMAT)
      // 💡 Integração futura para EIP-55 Checksum:
      // .refine((val) => !val || ethers.isAddress(val), { message: "Checksum EIP-55 inválido" })
      .optional()
  ),
});


// ======================================================================
// 2. LOGIN (Sign-In) - Zero-Trust & Anti-Enumeration
// ======================================================================
export const loginSchema = z.object({
  email: z.string()
    .trim()
    .toLowerCase()
    .email(AUTH_ERRORS.GENERIC_LOGIN)
    .max(255, AUTH_ERRORS.GENERIC_LOGIN),

  password: z.string()
    .min(1, AUTH_ERRORS.GENERIC_LOGIN) // 🛡️ SRE: Mensagem genérica mesmo se vazio (impede scripts de mapear validação)
    .max(128, AUTH_ERRORS.GENERIC_LOGIN),

  // 🛡️ FUTURE-PROOF: MFA Token pronto para implantação de TOTP (Time-Based One Time Password)
  mfaCode: z.string()
    .trim()
    .length(6, AUTH_ERRORS.MFA_FORMAT)
    .regex(/^\d{6}$/, AUTH_ERRORS.MFA_FORMAT)
    .optional(),
});


// ======================================================================
// 3. RECUPERAÇÃO DE SENHA (Forgot)
// ======================================================================
export const forgotPasswordSchema = z.object({
  email: baseEmail,
});


// ======================================================================
// 4. DEFINIR NOVA SENHA (Reset)
// ======================================================================
export const resetPasswordSchema = z.object({
  // 🛡️ SRE: Tolerância a erro de formatação do usuário sem comprometer a restrição de tamanho
  token: z.string()
    .trim()
    .toLowerCase()
    .length(64, AUTH_ERRORS.TOKEN_INVALID)
    .regex(/^[a-f0-9]{64}$/, AUTH_ERRORS.TOKEN_INVALID),

  password: basePassword,

  confirmPassword: z.string()
    .min(12, AUTH_ERRORS.PASSWORD_POLICY) // Fast-fail estrutural alinhado à basePassword
    .max(128, AUTH_ERRORS.PASSWORD_MAX)

}).refine((data) => data.password === data.confirmPassword, {
  message: AUTH_ERRORS.PASSWORD_MISMATCH,
  path: ["confirmPassword"],
});


// ======================================================================
// INFERÊNCIA DE TIPOS
// ======================================================================
export type SignUpInput = z.infer<typeof signUpSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
