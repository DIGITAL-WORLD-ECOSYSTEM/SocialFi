/**
 * Copyright 2026 ASPPIBRA – Associação dos Proprietários e Possuidores de Imóveis no Brasil.
 * Project: Governance System (ASPPIBRA DAO)
 * Role: User Edit Page (Server-Side Entry Point)
 * Version: 1.5.4 - Fix: TypeScript Property Error (TS2353) & Prerender Fix
 */

import type { IUserItem } from 'src/types/user';

import { _mock } from 'src/_mock';
import { UserEditView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

/**
 * ✅ ESTABILIDADE DE BUILD (DYNAMISM):
 * Forçamos o modo dinâmico para evitar que o Next.js tente gerar versões estáticas
 * de perfis administrativos durante o build, eliminando erros de Prerender.
 */
export const dynamic = 'force-dynamic';

/**
 * ✅ OTIMIZAÇÃO DE RUNTIME:
 * O uso de 'nodejs' garante recursos suficientes para processar a árvore de componentes
 * e metadados de governança da ASPPIBRA DAO.
 */
export const runtime = 'nodejs';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

// ----------------------------------------------------------------------

/**
 * 🏛️ COMPONENTE PRINCIPAL (SERVER COMPONENT):
 */
export default async function UserEditPage({ params }: Props) {
  // Captura o ID de forma assíncrona conforme o padrão Next.js 15
  const { id } = await params;

  /**
   * 👤 CONSTRUÇÃO DOS DADOS (SERVER-SIDE):
   * Removida a propriedade 'about' para resolver o erro TS2353.
   * Os dados refletem o contexto de atuação em Paraty, RJ.
   */
  const currentUser: IUserItem = {
    id: id || _mock.id(1),
    role: 'Administrador',
    email: _mock.email(1),
    name: _mock.fullName(1),
    status: 'active',
    address: 'Área Rural de Paraty, RJ',
    country: 'Brasil', 
    state: 'Rio de Janeiro',
    city: 'Paraty',
    zipCode: '23970-000',
    company: 'ASPPIBRA', 
    isVerified: true,
    avatarUrl: _mock.image.avatar(1),
    phoneNumber: _mock.phoneNumber(1),
  };

  /**
   * ✅ RENDERIZAÇÃO SEGUIDA DE BLINDAGEM:
   * Encaminhamos para a UserEditView que aplica a sanitização de dados (JSON.stringify)
   * necessária para uma ponte segura entre Server e Client.
   */
  return <UserEditView user={currentUser} />;
}