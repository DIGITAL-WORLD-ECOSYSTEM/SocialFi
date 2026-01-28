'use client';

import { useState, useEffect, useCallback } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter, usePathname } from 'src/routes/hooks';

// CORREÇÃO AQUI: Mudamos a importação para respeitar a regra do projeto
import { SplashScreen } from 'src/auth/components';

import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: React.ReactNode;
};

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { authenticated, loading } = useAuthContext();

  const [isChecking, setIsChecking] = useState(true);

  const checkPermissions = useCallback((): void => {
    if (loading) {
      return;
    }

    if (!authenticated) {
      // Se não estiver autenticado, cria o caminho de retorno e redireciona para o login
      const searchParams = new URLSearchParams({ returnTo: pathname }).toString();
      
      const href = `${paths.auth.signIn}?${searchParams}`;

      router.replace(href);
      return;
    }

    // Se estiver autenticado e não estiver carregando, libera a visualização
    setIsChecking(false);
  }, [authenticated, loading, pathname, router]);

  useEffect(() => {
    checkPermissions();
  }, [checkPermissions]);

  // Enquanto estiver carregando a sessão inicial ou verificando permissões, mostra o Splash
  if (loading || isChecking) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}