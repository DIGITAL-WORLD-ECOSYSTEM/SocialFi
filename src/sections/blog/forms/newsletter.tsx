'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

/**
 * Secção 8: Newsletter (PostNewsletter)
 * Bloco de captura de leads com design moderno e foco em conversão.
 */
export function PostNewsletter() {
  const theme = useTheme();

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.neutral' }}>
      <Container>
        <Stack
          spacing={5}
          alignItems="center"
          sx={{
            px: { xs: 3, md: 8 },
            py: { xs: 8, md: 10 },
            borderRadius: 3,
            position: 'relative',
            overflow: 'hidden',
            bgcolor: 'grey.900', // Fundo escuro para contraste final
            textAlign: 'center',
            color: 'common.white',
            boxShadow: theme.customShadows.z24,
          }}
        >
          {/* Elemento Visual de Fundo (Glow Effect) */}
          <Box
            sx={{
              top: -120,
              right: -120,
              width: 320,
              height: 320,
              opacity: 0.24,
              borderRadius: '50%',
              position: 'absolute',
              filter: 'blur(100px)',
              bgcolor: theme.palette.primary.main,
            }}
          />

          <Stack spacing={2} sx={{ zIndex: 9, maxWidth: 560 }}>
            <Iconify 
              icon={"solar:letter-bold-duotone" as any} 
              width={64} 
              sx={{ color: '#FA541C', mx: 'auto', mb: 1 }} 
            />

            <Typography variant="h2" sx={{ fontWeight: 800 }}>
              Mantenha-se à Frente no Mercado Cripto
            </Typography>

            <Typography variant="body1" sx={{ opacity: 0.72 }}>
              Receba as monitorizações das comunidades, vídeos exclusivos e as notícias em alta 
              diretamente no seu e-mail. Sem spam, apenas inteligência de mercado.
            </Typography>
          </Stack>

          {/* Formulário de Subscrição */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            sx={{ width: 1, maxWidth: 480, zIndex: 9 }}
          >
            <TextField
              fullWidth
              placeholder="Digite o seu melhor e-mail"
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: alpha(theme.palette.common.white, 0.08),
                  '& fieldset': { borderColor: alpha(theme.palette.common.white, 0.16) },
                  '&:hover fieldset': { borderColor: alpha(theme.palette.common.white, 0.32) },
                  '& input': { color: 'common.white' },
                },
              }}
            />
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 4,
                bgcolor: '#FA541C', // Mantendo o laranja de destaque
                '&:hover': { bgcolor: alpha('#FA541C', 0.8) },
              }}
            >
              Subscrever
            </Button>
          </Stack>

          <Typography variant="caption" sx={{ opacity: 0.48, zIndex: 9 }}>
            Ao subscrever, aceita a nossa Política de Privacidade e Termos de Serviço.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}