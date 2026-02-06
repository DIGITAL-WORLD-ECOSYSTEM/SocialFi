'use client';

import type { SxProps } from '@mui/material/styles';
import { m } from 'framer-motion';

import Typography from '@mui/material/Typography';
import { Theme, useTheme } from '@mui/material/styles';
import Container, { ContainerProps } from '@mui/material/Container';

import { varBounce, MotionContainer } from 'src/components/animate';
import { ForbiddenIllustration } from 'src/assets/illustrations';

import { User } from '../types';

// ----------------------------------------------------------------------

type RoleBasedGuardProp = {
  hasContent?: boolean;
  allowedRoles: (User['role'])[]; // 🛡️ Tipagem forte com base no nosso tipo User
  currentRole: User['role'] | undefined;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
};

export default function RoleBasedGuard({ hasContent, allowedRoles, currentRole, children, sx }: RoleBasedGuardProp) {
  const theme = useTheme();

  // 🛡️ Lógica de validação 10/10 - Normaliza a entrada para sempre ser um array
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  // Se o cargo atual não estiver na lista de permitidos, bloqueia o acesso.
  if (!currentRole || !roles.includes(currentRole)) {
    return hasContent ? (
      <Container component={MotionContainer} sx={{ textAlign: 'center', ...sx }}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Acesso não autorizado
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            Você não possui as permissões necessárias para acessar esta área.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </m.div>
      </Container>
    ) : null;
  }

  return <>{children}</>;
}
