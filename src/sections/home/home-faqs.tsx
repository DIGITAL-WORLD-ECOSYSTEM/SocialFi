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
import Accordion from '@mui/material/Accordion';
import { alpha, useTheme } from '@mui/material/styles';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

const FAQs = [
  {
    question: 'Como posso obter atualizações sobre o projeto?',
    answer:
      'Você receberá atualizações constantes sobre a governança da DAO e o progresso da tokenização RWA através de nossos canais oficiais no Discord e Telegram.',
  },
  {
    question: 'Qual o papel da ASPPIBRA-DAO na agroecologia?',
    answer:
      'Atuamos na digitalização de processos e rastreabilidade para produtores rurais, como os de café agroecológico em Paraty, garantindo mais transparência e valorização do produto.',
  },
  {
    question: 'O projeto possui conformidade jurídica?',
    answer:
      'Sim, a Fase 01 do nosso roadmap foca no estabelecimento da estrutura jurídica e compliance institucional para garantir a segurança e a legalidade de todas as operações.',
  },
  {
    question: 'Como funciona a segurança dos ativos?',
    answer:
      'A segurança é garantida por meio de contratos inteligentes auditados na blockchain, que asseguram a imutabilidade, a transparência e a soberania das transações de ativos tokenizados.',
  },
];

export function HomeFAQs({ sx, ...other }: BoxProps) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<string | false>(FAQs[0].question);

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  // 🔥 Padding único e padronizado para título e texto
  const FAQ_PADDING = theme.spacing(2.5, 4); // 20px vertical | 32px horizontal

  return (
    <Box
      id="faqs"
      component="section"
      sx={[
        { position: 'relative', overflow: 'hidden', bgcolor: 'transparent', py: { xs: 10, md: 15 } },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
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
                boxShadow: `0 0 12px ${alpha(theme.palette.info.main, 0.4)}`,
              }}
            >
              <Typography
                component="span"
                sx={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: '0.25em',
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
                fontSize: { xs: '2rem', md: '3rem' },
                letterSpacing: '0.05em',
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
            <Stack spacing={2} sx={{ mt: { xs: 6, md: 8 }, mx: 'auto', maxWidth: 720, textAlign: 'left' }}>
              {FAQs.map((item) => {
                const isOpen = expanded === item.question;

                return (
                  <Accordion
                    key={item.question}
                    disableGutters
                    expanded={isOpen}
                    onChange={handleChange(item.question)}
                    sx={{
                      borderRadius: 2,
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      border: `1px solid ${alpha(theme.palette.info.main, isOpen ? 0.7 : 0.35)}`,
                      bgcolor: alpha(theme.palette.grey[900], isOpen ? 0.55 : 0.25),
                      boxShadow: isOpen
                        ? `0 0 25px ${alpha(theme.palette.info.main, 0.35)}`
                        : `0 0 12px ${alpha(theme.palette.info.main, 0.18)}`,
                      transition: theme.transitions.create(['border-color', 'box-shadow', 'background-color']),
                      '&:before': { display: 'none' },

                      // 🔥 PADRONIZAÇÃO REAL
                      '& .MuiAccordionSummary-content': {
                        margin: 0,
                      },
                      '& .MuiAccordionSummary-root': {
                        padding: FAQ_PADDING,
                        minHeight: 'unset',
                      },
                      '& .MuiAccordionDetails-root': {
                        padding: FAQ_PADDING,
                      },

                      '&:hover': {
                        borderColor: theme.palette.info.main,
                        bgcolor: alpha(theme.palette.grey[900], 0.4),
                        boxShadow: `0 0 22px ${alpha(theme.palette.info.main, 0.3)}`,
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <Iconify
                          icon="solar:double-alt-arrow-down-bold-duotone"
                          width={20}
                          sx={{ color: isOpen ? 'info.main' : 'inherit', transition: 'color 0.3s' }}
                        />
                      }
                    >
                      <Typography
                        component="span"
                        sx={{
                          fontFamily: "'Orbitron', sans-serif",
                          fontWeight: 700,
                          fontSize: { xs: 15, md: 16 },
                          letterSpacing: '0.03em',
                          color: isOpen ? 'common.white' : alpha(theme.palette.common.white, 0.75),
                        }}
                      >
                        {item.question}
                      </Typography>
                    </AccordionSummary>

                    <AccordionDetails
                      sx={{
                        color: alpha(theme.palette.common.white, 0.85),
                        lineHeight: 1.75,
                        fontSize: 15,
                      }}
                    >
                      {item.answer}
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </Stack>
          </m.div>
        </Container>
      </MotionViewport>
    </Box>
  );
}