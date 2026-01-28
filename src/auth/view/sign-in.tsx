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
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { signInWithPassword } from '../context/action';
import { Form, Field, Iconify, FormHead, schemaUtils, AnimateLogoRotate } from '../components';

// ----------------------------------------------------------------------

export type SignInSchemaType = z.infer<typeof SignInSchema>;

export const SignInSchema = z.object({
  email: schemaUtils.email(),
  password: z.string().min(1, { message: 'A senha é obrigatória!' }),
});

// ----------------------------------------------------------------------

export function CenteredSignInView() {
  const router = useRouter();
  const showPassword = useBoolean();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  // CORREÇÃO AQUI: Adicionamos o tipo explícito ": SignInSchemaType"
  const onSubmit = handleSubmit(async (data: SignInSchemaType) => {
    try {
      setErrorMessage(null);
      
      // Chamada real para o seu Backend na Cloudflare
      await signInWithPassword({
        email: data.email,
        password: data.password,
      });

      // Se o login for bem sucedido, o setSession já foi chamado dentro do action.ts
      // Redirecionamos para o dashboard
      router.push(paths.dashboard.root);
      
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message || 'E-mail ou senha incorretos.');
    }
  });

  const renderForm = (
    <Stack spacing={3}>
      {!!errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <Field.Text 
        name="email" 
        label="E-mail" 
        placeholder="exemplo@asppibra.com"
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
        color="inherit"
        underline="always"
        sx={{ alignSelf: 'flex-end' }}
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
      >
        Entrar no Sistema
      </Button>
    </Stack>
  );

  return (
    <>
      <AnimateLogoRotate sx={{ mb: 3, mx: 'auto' }} />

      <FormHead
        title="Login ASPPIBRA"
        description={
          <>
            {`Não tem uma conta? `}
            <Link component={RouterLink} href={paths.auth.signUp} variant="subtitle2">
              Cadastre-se
            </Link>
          </>
        }
      />

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>
    </>
  );
}