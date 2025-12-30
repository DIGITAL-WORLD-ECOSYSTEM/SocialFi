# 🔐 Auth Audit Report

🚨 Possível elevação de privilégio: src/auth/hooks/use-mocked-user.ts
⚠️ useEffect sem dependências claras: src/auth/guard/guest-guard.tsx
⚠️ useEffect sem dependências claras: src/auth/guard/auth-guard.tsx
⚠️ sessionStorage usado em: src/auth/context/utils.ts
⚠️ sessionStorage usado em: src/auth/context/auth-provider.tsx
🚨 Possível elevação de privilégio: src/auth/context/auth-provider.tsx
⚠️ useEffect sem dependências claras: src/auth/context/auth-provider.tsx
⚠️ sessionStorage usado em: src/auth/context/action.ts
