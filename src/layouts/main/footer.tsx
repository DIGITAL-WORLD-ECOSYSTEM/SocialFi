'use client';

import type { Breakpoint } from '@mui/material/styles';

import { useCallback } from 'react';

import Box from '@mui/material/Box'; 
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { styled, keyframes } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Logo } from 'src/components/logo';
import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const pulse = keyframes`
  0% { box-shadow: 0 0 8px #00ff7f; }
  50% { box-shadow: 0 0 16px #00ff7f; }
  100% { box-shadow: 0 0 8px #00ff7f; }
`;

const LINKS = [
  {
    headline: 'ECOSSISTEMA',
    children: [
      { name: 'Swap & Pools', href: '#' },
      { name: 'Governança', href: '#' },
      { name: 'Ativos (RWA)', href: '#' },
      { name: 'Roadmap', href: '#' },
    ],
  },
  {
    headline: 'RECURSOS',
    children: [
      { name: 'Whitepaper', href: '#' },
      { name: 'Documentação', href: '#' },
      { name: 'Auditorias', href: '#' },
      { name: 'Termos de Uso', href: '#' },
    ],
  },
];

const CUSTOM_SOCIALS = [
  { name: 'Twitter', href: '#', icon: 'ri:twitter-x-fill' },
  { name: 'Instagram', href: '#', icon: 'ri:instagram-fill' },
  { name: 'LinkedIn', href: '#', icon: 'ri:linkedin-fill' },
  { name: 'GitHub', href: '#', icon: 'ri:github-fill' },
  { name: 'Telegram', href: '#', icon: 'ri:telegram-fill' },
  { name: 'Crunchbase', href: 'https://www.crunchbase.com/organization/sandro', icon: 'simple-icons:crunchbase' },
];

const FooterRoot = styled('footer')(({ theme }) => ({
  position: 'relative',
  backgroundColor: '#000000',
  color: '#FFFFFF',
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(3),
  borderTop: `1px solid rgba(255, 255, 255, 0.1)`,
  fontFamily: '"Public Sans", sans-serif', // Fonte principal para o corpo
}));

export type FooterProps = React.ComponentProps<typeof FooterRoot>;

export function Footer({
  sx,
  layoutQuery = 'md',
  ...other
}: FooterProps & { layoutQuery?: Breakpoint }) {
  
  const contractAddress = "0x0697AB2B003FD2Cbaea2dF1ef9b404E45bE59d4C";

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(contractAddress);
    toast.success('Endereço do contrato copiado!');
  }, [contractAddress]);

  const truncate = (str: string) => `${str.substring(0, 6)}...${str.substring(str.length - 4)}`;

  return (
    <FooterRoot sx={sx} {...other}>
      <Container>
        <Grid container spacing={5} sx={{ mb: 8 }}>
          
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ mb: 2 }}>
               <Logo sx={{ color: '#FFF' }} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: '#00ff7f',
                  animation: `${pulse} 2s infinite`,
                }}
              />
              <Typography
                variant="caption"
                sx={{ 
                  color: '#00ff7f', 
                  fontWeight: 'bold', 
                  letterSpacing: 2, 
                  fontSize: '0.7rem',
                  fontFamily: '"Orbitron", sans-serif' // Fonte tecnológica
                }}
              >
                SYSTEM ONLINE
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'grey.500', maxWidth: 360, mb: 4, lineHeight: 1.6, fontFamily: '"Public Sans", sans-serif' }}>
              Redefinindo ativos reais no mundo digital. Governança descentralizada, transparência e
              inovação através de tecnologia Web3 e Inteligência Artificial.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {CUSTOM_SOCIALS.map((social) => (
                <Tooltip key={social.name} title={social.name}>
                  <IconButton
                    component={Link}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Link para ${social.name}`}
                    sx={{
                      color: 'grey.500',
                      '&:hover': { color: 'common.white', bgcolor: 'rgba(255,255,255,0.08)' },
                    }}
                  >
                    <Iconify icon={social.icon as any} width={20} />
                  </IconButton>
                </Tooltip>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 4,
              }}
            >
              {LINKS.map((list) => (
                <Box key={list.headline} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      color: 'grey.400', 
                      fontWeight: 'bold', 
                      letterSpacing: 1.5, 
                      fontSize: '0.75rem',
                      fontFamily: '"Orbitron", sans-serif' // Título da seção
                    }}
                  >
                    {list.headline}
                  </Typography>

                  {list.children.map((link) => (
                    <Link
                      key={link.name}
                      component={RouterLink}
                      href={link.href}
                      color="inherit"
                      variant="body2"
                      underline="none"
                      sx={{
                        color: 'grey.500',
                        transition: 'color 0.2s',
                        fontFamily: '"Public Sans", sans-serif',
                        '&:hover': { color: 'common.white' },
                      }}
                    >
                      {link.name}
                    </Link>
                  ))}
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    color: 'grey.400', 
                    fontWeight: 'bold', 
                    mb: 2, 
                    letterSpacing: 1, 
                    fontSize: '0.75rem',
                    fontFamily: '"Orbitron", sans-serif' // Título técnico
                  }}
                >
                  TOKEN CONTRACT (BEP-20)
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={truncate(contractAddress)}
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title="Copiar endereço">
                          <IconButton 
                            edge="end" 
                            sx={{ color: 'grey.500' }} 
                            onClick={handleCopy}
                            aria-label="Copiar endereço do contrato"
                          >
                            <Iconify icon="solar:copy-bold" width={20} />
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    ),
                    sx: {
                      height: 48,
                      color: 'grey.300',
                      bgcolor: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: 1,
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                      '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.2) !important' },
                      '&.Mui-focused fieldset': { borderColor: 'rgba(255, 255, 255, 0.3) !important' },
                    },
                  }}
                />
              </Box>

              <Box>
                <Typography variant="body2" sx={{ color: 'grey.600', mb: 0.5, fontSize: '0.8rem', fontFamily: '"Public Sans", sans-serif' }}>
                  Precisa de suporte?
                </Typography>
                <Link
                  component={RouterLink}
                  href={paths.faqs}
                  variant="body1"
                  underline="none"
                  sx={{ 
                    color: 'grey.300', 
                    fontFamily: '"Public Sans", sans-serif',
                    '&:hover': { color: 'common.white' } 
                  }}
                >
                  Acesse a Central de Ajuda
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)', mb: 3 }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: 'grey.600', fontSize: '0.8rem', fontFamily: '"Public Sans", sans-serif' }}>
            © 2026 DEX World. Todos os direitos reservados.
          </Typography>

          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="#" variant="body2" underline="none" sx={{ color: 'grey.600', fontSize: '0.8rem', fontFamily: '"Public Sans", sans-serif', '&:hover': { color: 'grey.400' } }}>
              Privacidade
            </Link>
            <Link href="#" variant="body2" underline="none" sx={{ color: 'grey.600', fontSize: '0.8rem', fontFamily: '"Public Sans", sans-serif', '&:hover': { color: 'grey.400' } }}>
              Cookies
            </Link>
          </Box>
        </Box>
      </Container>
    </FooterRoot>
  );
}

export { Footer as HomeFooter };