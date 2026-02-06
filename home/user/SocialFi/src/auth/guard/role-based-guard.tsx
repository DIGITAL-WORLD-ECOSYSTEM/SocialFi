'use client';

import type { SxProps } from '@mui/material/styles';
import { m, Variants } from 'framer-motion';

import Typography from '@mui/material/Typography';
import { Theme, useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';

import { varBounce, MotionContainer } from 'src/components/animate';
import { ForbiddenIllustration } from 'src/assets/illustrations';

import { User } from '../types';

// ----------------------------------------------------------------------

type RoleBasedGuardProp = {
  hasContent?: boolean;
  allowedRoles: (User['role'])[]; 
  currentRole: User['role'] | undefined;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
};

export default function RoleBasedGuard({ hasContent, allowedRoles, currentRole, children, sx }: RoleBasedGuardProp) {
  const theme = useTheme();

  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  if (!currentRole || !roles.includes(currentRole)) {
    return hasContent ? (
      <Container component={MotionContainer} sx={{ textAlign: 'center', ...sx }}>
        {/* 🛡️ Correção: Passando o parâmetro de direção e forçando o tipo Variants */}
        <m.div variants={varBounce() as unknown as Variants}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Acesso não autorizado
          </Typography>
        </m.div>

        <m.div variants={varBounce() as unknown as Variants}>
          <Typography sx={{ color: 'text.secondary' }}>
            Você não possui as permissões necessárias para acessar esta área.
          </Typography>
        </m.div>

        <m.div variants={varBounce() as unknown as Variants}>
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
