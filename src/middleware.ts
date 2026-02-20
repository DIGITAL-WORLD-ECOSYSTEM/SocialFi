/**
 * Copyright 2026 ASPPIBRA – Associação dos Proprietários e Possuidores de Imóveis no Brasil.
 * Project: Governance System (ASPPIBRA DAO)
 * Role: Enterprise Route Guard (Frontend Middleware)
 * Version: 1.1.0 - Production Hardened
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// --- CONFIGURAÇÃO DE ROTAS ---

/** * Rotas que exigem obrigatoriamente um Token JWT válido.
 * Inclui o Dashboard da DAO e configurações de conta do Cidadão.
 */
const PROTECTED_PATHS = ['/dashboard', '/user/account'];

/** * Rotas de acesso (Login/Registro).
 * Se o usuário já estiver logado, ele será impedido de acessar estas páginas.
 */
const AUTH_PATHS = ['/auth/sign-in', '/auth/sign-up'];

/**
 * Lógica Principal do Middleware
 * Executada no Edge Runtime da Vercel para latência ultra-baixa.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. EXTRAÇÃO DE CREDENCIAIS
  // Recupera o accessToken dos cookies gerado pelo serviço de Auth.
  const token = request.cookies.get('accessToken')?.value;

  // 2. VALIDAÇÃO DE ACESSO PROTEGIDO
  // Verifica se o caminho atual começa com algum dos caminhos protegidos.
  const isAccessingProtected = PROTECTED_PATHS.some((path) => pathname.startsWith(path));

  if (isAccessingProtected && !token) {
    // Usuário sem permissão: Redireciona para o login preservando a rota pretendida.
    const loginUrl = new URL('/auth/sign-in', request.url);
    loginUrl.searchParams.set('returnTo', pathname);
    
    return NextResponse.redirect(loginUrl);
  }

  // 3. PREVENÇÃO DE LOGIN DUPLICADO
  // Se o cidadão já está autenticado, não faz sentido ele ver a tela de login novamente.
  const isAccessingAuth = AUTH_PATHS.some((path) => pathname.startsWith(path));

  if (isAccessingAuth && token) {
    // Usuário já logado: Redireciona para a home do Dashboard.
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 4. FLUXO PADRÃO
  // Se não cair em nenhuma regra acima, permite o carregamento normal da página.
  return NextResponse.next();
}

/**
 * ✅ ESTRATÉGIA DE ENGENHARIA DE CUSTOS (MATCHER)
 * Configuração vital para o Plano Hobby da Vercel.
 * O Middleware só é invocado para páginas reais, ignorando arquivos estáticos e assets.
 * Isso economiza milhares de execuções de Edge Functions por mês.
 */
export const config = {
  matcher: [
    /*
     * Ignora caminhos que contenham:
     * - api (Chamadas de API interna)
     * - _next/static & _next/image (Arquivos gerados pelo Next.js)
     * - assets (Imagens, ícones, documentos da DAO)
     * - Arquivos de SEO (favicon, robots, sitemap)
     */
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|sitemap.xml|robots.txt).*)',
  ],
};