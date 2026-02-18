/**
 * Copyright 2026 ASPPIBRA – Associação dos Proprietários e Possuidores de Imóveis no Brasil.
 * Project: Governance System (ASPPIBRA DAO)
 * Role: User Edit Page (Server-Side Entry Point)
 * Version: 1.5.3 - Final: Prerender Fix & View Orchestration
 */

import type { IUserItem } from 'src/types/user';

import { _mock } from 'src/_mock';
import { UserEditView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

/**
 * ✅ ESTABILIDADE DE BUILD (DYNAMISM):
 * O Next.js tenta gerar páginas estáticas durante o build. Como rotas de edição 
 * dependem de IDs variáveis e dados de usuários, forçamos o modo dinâmico para 
 * evitar erros de 'Prerender' na Vercel.
 */
export const dynamic = 'force-dynamic';

/**
 * ✅ OTIMIZAÇÃO DE RUNTIME:
 * Utilizamos o runtime 'nodejs' para garantir que o servidor tenha recursos 
 * suficientes (memória e CPU) para processar os metadados de governança da DAO.
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
 * Responsável por capturar o parâmetro da URL e buscar os dados do usuário.
 */
export default async function UserEditPage({ params }: Props) {
  // Captura o ID de forma assíncrona (Padrão Next.js 15)
  const { id } = await params;

  /**
   * 👤 CONSTRUÇÃO DOS DADOS (SERVER-SIDE):
   * Atualmente utilizando dados simulados (Mock).
   * No futuro, este bloco será substituído pela chamada: const { user } = await getUser(id);
   */
  const currentUser: IUserItem = {
    id: id || _mock.id(1),
    role: 'Administrador', // Contexto ASPPIBRA
    email: _mock.email(1),
    name: _mock.fullName(1),
    state: 'Rio de Janeiro',
    status: 'active',
    address: 'Área Rural de Paraty, RJ',
    country: 'Brasil', 
    avatarUrl: _mock.image.avatar(1),
    phoneNumber: _mock.phoneNumber(1),
    company: 'ASPPIBRA', 
    isVerified: true,
    city: 'Paraty',
    zipCode: '23970-000',
    about: 'Liderança ativa na regularização agroecológica e inovação Web3 em Paraty.', 
  };

  /**
   * ✅ RENDERIZAÇÃO SEGUIDA DE BLINDAGEM:
   * Em vez de chamar o formulário diretamente, chamamos a 'UserEditView'.
   * Ela contém o 'useMemo' de sanitização que criamos no passo anterior, 
   * garantindo que nenhum erro de serialização quebre o build.
   */
  return <UserEditView user={currentUser} />;
}