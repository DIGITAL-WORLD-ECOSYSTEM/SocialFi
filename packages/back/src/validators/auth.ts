/**
 * Copyright 2026 ASPPIBRA – Associação dos Proprietários e Possuidores de Imóveis no Brasil.
 * Project: Governance System (ASPPIBRA DAO)
 * Role: Authentication Validators (Absolute Bank-Grade 10/10)
 * Version: 3.0.0 - Semantic Preprocessing, Strict Regex & Generic Masking
 */

import { z } from 'zod';

/**
 * 🛡️ SECURITY: Padrão Bancário de Senha
 * - Pelo menos uma letra minúscula
 * - Pelo menos uma letra maiúscula
 * - Pelo menos um dígito numérico
 * - Tamanho entre 8 e 128 (O limite de 128 é aplicado via .max() para performance de erro)
 */
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/;
const passwordMessage = "A senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma minúscula e um número.";

/**
 * 🛡️ STRUCTURAL: Regex para Nomes Humanos
 * Evita falsa sensação de segurança contra XSS (que deve ser resolvido no output render/React)
 * Garante apenas que é um nome humanamente válido, cobrindo Unicode (acentos), espaços e hifens.
 */
const nameRegex = /^[\p{L}\s'-]+$/u;

/**
 * 🛡️ STRUCTURAL: Regex para Wallet EVM (Ethereum/BSC)
 * - Deve começar com 0x
 * - Seguido por exatos 40 caracteres hexadecimais (Total 42)
 */
const walletRegex = /^0x[a-fA-F0-9]{40}$/;

// --- [REGISTRO (Sign-Up)] ---
export const signUpSchema = z.object({
  firstName: z.string()
    .trim()
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .max(64, "O nome excede o tamanho máximo") // 🛡️ SRE: Memory/Column Bound
    .regex(nameRegex, "O nome contém caracteres inválidos"),

  lastName: z.string()
    .trim()
    .min(2, "O sobrenome deve ter pelo menos 2 caracteres")
    .max(64, "O sobrenome excede o tamanho máximo")
    .regex(nameRegex, "O sobrenome contém caracteres inválidos"),

  email: z.string()
    .trim()
    .toLowerCase()
    .max(255, "Formato de email inválido") // 🛡️ SRE: DB Overflow Bound
    .email("Formato de email inválido"),

  password: z.string()
    .min(8, passwordMessage)
    .max(128, "A senha não pode exceder 128 caracteres") // 🛡️ SRE: Defesa contra CPU Exhaustion no Bcrypt/Argon2
    .regex(passwordRegex, passwordMessage),

  // 🛡️ DATA HYGIENE: Preprocessa strings vazias para undefined para limpar o estado do banco
  walletAddress: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string()
      .length(42, "O endereço Web3 deve ter exatamente 42 caracteres")
      .regex(walletRegex, "Endereço de carteira Web3 inválido")
      .optional()
  ),
});

// --- [LOGIN (Sign-In)] ---
export const loginSchema = z.object({
  email: z.string()
    .trim()
    .toLowerCase()
    .max(255, "E-mail ou senha incorretos") // 🛡️ SECURITY: Erro genérico para não revelar regras de bloqueio (Anti-enumeration)
    .email("E-mail ou senha incorretos"),

  password: z.string()
    .min(1, "A senha é obrigatória")
    .max(128, "E-mail ou senha incorretos"), // Fast-fail silencioso
});

// --- [ESQUECI MINHA SENHA] ---
export const forgotPasswordSchema = z.object({
  email: z.string()
    .trim()
    .toLowerCase()
    .max(255, "Digite um email válido")
    .email("Digite um email válido"),
});

// --- [DEFINIR NOVA SENHA (Reset)] ---
export const resetPasswordSchema = z.object({
  token: z.string()
    .length(64, "Link de recuperação inválido ou expirado") // 🛡️ SRE: Tokens são estritamente 64 chars
    .regex(/^[a-f0-9]{64}$/, "Link de recuperação inválido ou expirado"),

  password: z.string()
    .min(8, passwordMessage)
    .max(128, "A senha não pode exceder 128 caracteres")
    .regex(passwordRegex, passwordMessage),

  confirmPassword: z.string()
    .max(128, "A senha não pode exceder 128 caracteres")
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

// --- [INFERÊNCIA DE TIPOS] ---
export type SignUpInput = z.infer<typeof signUpSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
