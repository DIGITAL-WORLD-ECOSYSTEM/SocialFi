'use client';

import type { BoxProps } from '@mui/material/Box';
import { useState } from 'react';
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Accordion, { accordionClasses } from '@mui/material/Accordion';
import { alpha, useTheme } from '@mui/material/styles';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

const FAQs = [
  {
    question: 'Como posso obter atualizações sobre o projeto?',
    answer: 'Você receberá atualizações constantes sobre a governança da DAO e o progresso da tokenização RWA através de nossos canais oficiais no Discord e Telegram.',
  },
  {
    question: 'Qual o papel da ASPPIBRA-DAO na agroecologia?',
    answer: 'Atuamos na digitalização de processos e rastreabilidade para produtores rurais, como os de café agroecológico em Paraty, garantindo mais transparência e valorização do produto.',
  },
  {
    question: 'O projeto possui conformidade jurídica?',
    answer: 'Sim, a Fase 01 do nosso roadmap foca no estabelecimento da estrutura jurídica e compliance institucional para garantir a segurança e a legalidade de todas as operações.',
  },
  {
    question: 'Como funciona a segurança dos ativos?',
    answer: 'A segurança é garantida por meio de contratos inteligentes auditados na blockchain, que asseguram a imutabilidade, a transparência e a soberania das transações de ativos tokenizados.'
  },
];

export function HomeFAQs({ sx, ...other }: BoxProps) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<string | false>(FAQs[0].question);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box 
      id="faqs" 
      component="section" 
      sx={[{ 
        position: 'relative', 
        overflow: 'hidden', 
        bgcolor: 'transparent', 
        py: { xs: 10, md: 15 } 
      }, 
      ...(Array.isArray(sx) ? sx : [sx])]} 
      {...other}
    >
      <MotionViewport>
        <Container sx={{ position: 'relative', zIndex: 9, textAlign: 'center' }}>

          <m.div variants={varFade('inUp')}>
            <Box
              sx={{
                display: 'inline-block',
                border: `1px solid ${theme.palette.info.main}`,
                borderRadius: 2,
                px: 1.5,
                py: 0.5,
                mb: 5,
              }}
            >
              <Typography
                component="span"
                sx={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'info.main',
                }}
              >
                FAQS
              </Typography>
            </Box>
          </m.div>

          <m.div variants={varFade('inUp')}>
            <Typography
              component="h2"
              sx={{
                fontFamily: "'Orbitron', sans-serif",
                fontWeight: 900,
                fontSize: { xs: '2.2rem', md: '3rem' },
                letterSpacing: '0.08em',
                lineHeight: 1.2,
                textTransform: 'uppercase',
              }}
            >
              <Box component="span" sx={{ color: 'common.white' }}>
                TEMOS AS
              </Box>
              <Box component="span" sx={{ color: 'warning.main', ml: 1.5 }}>
                RESPOSTAS
              </Box>
            </Typography>
          </m.div>

          <m.div variants={varFade('inUp')}>
            <Stack
              spacing={2}
              sx={{
                mt: { xs: 6, md: 8 },
                mx: 'auto',
                maxWidth: 720,
                textAlign: 'left',
              }}
            >
              {FAQs.map((item) => (
                <Accordion
                  key={item.question}
                  disableGutters
                  expanded={expanded === item.question}
                  onChange={handleChange(item.question)}
                  sx={{
                    borderRadius: 2,
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
                    bgcolor: alpha(theme.palette.grey[900], 0.2),
                    transition: theme.transitions.create(['border-color', 'box-shadow']),
                    '&:before': { display: 'none' },
                    [`&.${accordionClasses.expanded}`]: {
                      borderColor: theme.palette.info.main,
                      boxShadow: `0 0 16px ${alpha(theme.palette.info.main, 0.4)}`,
                      bgcolor: alpha(theme.palette.grey[900], 0.4),
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<Iconify icon="solar:alt-arrow-down-bold-duotone" width={20} />}
                    sx={{ px: 2.5, minHeight: 64 }}
                  >
                    <Typography 
                      component="span" 
                      sx={{
                        fontFamily: "'Orbitron', sans-serif",
                        fontWeight: 700,
                        fontSize: 16,
                        letterSpacing: '0.02em',
                      }}
                    >
                      {item.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 2.5, pb: 2.5, color: 'text.secondary', typography: 'body2' }}>
                    {item.answer}
                  </AccordionDetails>
                </Accordion>
              ))}
            </Stack>
          </m.div>

        </Container>
      </MotionViewport>
    </Box>
  );
}
