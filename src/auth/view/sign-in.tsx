/**
 * Copyright 2026 ASPPIBRA – Associação dos Proprietários e Possuidores de Imóveis no Brasil.
 * Project: Governance System (ASPPIBRA DAO)
 * Role: Authentication View (Sign In)
 * Version: 1.2.0 - Smart Redirect & UX Hardened
 */

'use client';

import * as z from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useAuthContext } from '../hooks';
import { Form, Field, Iconify, FormHead, schemaUtils, AnimateLogoRotate } from '../components';

// ----------------------------------------------------------------------

// Definição do tipo baseado no Schema para garantir Type-Safety
export type SignInSchemaType = z.infer<typeof SignInSchema>;

/**
 * SCHEMA DE VALIDAÇÃO (ZOD)
 * Utiliza utilitários globais para manter consistência com o Backend.
 */
export const SignInSchema = z.object({
  email: schemaUtils.email(), // Validação rigorosa de formato de e-mail
  password: z.string().min(1, { message: 'A senha é obrigatória!' }),
});

// ----------------------------------------------------------------------

export function CenteredSignInView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  /** * 🟢 REDIRECIONAMENTO INTELIGENTE
   * Recupera o parâmetro 'returnTo' injetado pelo Middleware se o usuário
   * tentou acessar uma rota protegida sem estar logado.
   */
  const returnTo = searchParams.get('returnTo');

  const { signIn } = useAuthContext();
  const showPassword = useBoolean();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Valores iniciais do formulário
  const defaultValues: SignInSchemaType = {
    email: '',
    password: '',
  };

  const methods = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  /**
   * HANDLER DE SUBMISSÃO
   * Integra com o Contexto de Autenticação para gerar Cookies e Sessão.
   */
  const onSubmit = handleSubmit(async (data: SignInSchemaType) => {
    try {
      setErrorMessage(null);
      
      // Chamada ao serviço de autenticação (Configura Axios + Cookies)
      await signIn(data.email, data.password);

      // Se houver uma rota de retorno, prioriza ela; caso contrário, vai para a raiz do dashboard
      router.push(returnTo || paths.dashboard.root);
      
    } catch (error: any) {
      console.error('🔥 Login Error:', error);
      // Extrai mensagem de erro vinda do Interceptor do Axios (backend)
      setErrorMessage(error.message || 'E-mail ou senha incorretos.');
    }
  });

  const renderForm = (
    <Stack spacing={3}>
      {/* Exibição de Erros do Backend */}
      {!!errorMessage && (
        <Alert severity="error" variant="filled" sx={{ borderRadius: 1 }}>
          {errorMessage}
        </Alert>
      )}

      <Field.Text 
        name="email" 
        label="E-mail" 
        placeholder="sandro_ceo@asppibra.com.br"
        slotProps={{ inputLabel: { shrink: true } }} 
      />

      <Field.Text
        name="password"
        label="Senha"
        type={showPassword.value ? 'text' : 'password'}
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={showPassword.onToggle} edge="end">
                  <Iconify icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <Link
        component={RouterLink}
        href={paths.auth.reset}
        variant="body2"
        color="primary"
        underline="hover"
        sx={{ alignSelf: 'flex-end', fontWeight: '600' }}
      >
        Esqueceu a senha?
      </Link>

      <Button
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{ 
          bgcolor: 'text.primary', 
          color: 'background.paper',
          '&:hover': { bgcolor: 'text.secondary' } 
        }}
      >
        Entrar no Portal
      </Button>
    </Stack>
  );

  return (
    <>
      {/* Logotipo com animação de entrada */}
      <AnimateLogoRotate sx={{ mb: 3, mx: 'auto' }} />

      <FormHead
        title="Login ASPPIBRA"
        description={
          <>
            {`Novo na DAO? `}
            <Link component={RouterLink} href={paths.auth.signUp} variant="subtitle2" color="primary">
              Solicitar Acesso
            </Link>
          </>
        }
        sx={{ textAlign: 'center' }}
      />

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>
    </>
  );
}