'use client';

// ----------------------------------------------------------------------
// Imports — tipos e react/motion
// ----------------------------------------------------------------------
import type { BoxProps } from '@mui/material/Box';
import { useState } from 'react';
import { m } from 'framer-motion';
import { varAlpha } from 'minimal-shared/utils';

// ----------------------------------------------------------------------
// Imports — MUI
// ----------------------------------------------------------------------
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Accordion, { accordionClasses } from '@mui/material/Accordion';
import { alpha, useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------
// Imports — app
// ----------------------------------------------------------------------
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SectionTitle } from './components/section-title';
import { FloatLine, FloatPlusIcon, FloatTriangleDownIcon } from './components/svg-elements';

// ✅ REMOVIDO: HomeBackground não é mais necessário aqui pois já está no HomeView

// ----------------------------------------------------------------------

const FAQs = [
  {
    question: 'Como posso obter atualizações sobre o projeto?',
    answer: (
      <Typography>
        Você receberá atualizações constantes sobre a governança da DAO e o progresso da tokenização RWA.
      </Typography>
    ),
  },
  {
    question: 'Qual o papel da ASPPIBRA-DAO na agroecologia?',
    answer: (
      <Typography>
        Atuamos na digitalização de processos e rastreabilidade para produtores rurais, como os de café agroecológico em Paraty.
      </Typography>
    ),
  },
  {
    question: 'O projeto possui conformidade jurídica?',
    answer: (
      <Typography>
        Sim, a Fase 01 do nosso roadmap foca no estabelecimento da estrutura jurídica e compliance institucional.
      </Typography>
    ),
  },
];

// ----------------------------------------------------------------------

export function HomeFAQs({ sx, ...other }: BoxProps) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<string | false>(FAQs[0].question);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const renderDescription = () => (
    <SectionTitle
      caption="FAQs"
      title="Temos as"
      txtGradient="respostas"
      sx={{ textAlign: 'center' }}
    />
  );

  const renderContent = () => (
    <Box
      sx={{
        mt: 8,
        gap: 2,
        mx: 'auto',
        maxWidth: 720,
        display: 'flex',
        mb: { xs: 5, md: 8 },
        flexDirection: 'column',
        position: 'relative',
        zIndex: 2,
      }}
    >
      {FAQs.map((item, index) => (
        <Accordion
          key={item.question}
          disableGutters
          component={m.div}
          variants={varFade('inUp', { distance: 24 })}
          expanded={expanded === item.question}
          onChange={handleChange(item.question)}
          sx={{
            py: 0.5,
            px: 1,
            borderRadius: 2,
            position: 'relative',
            // ✅ VIDRO LÍQUIDO: Transparência para ver o Vortex 3D unificado
            bgcolor: alpha(theme.palette.background.paper, 0.4),
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            transition: theme.transitions.create(['background-color', 'border-color']),
            border: '2px solid transparent',
            backgroundClip: 'padding-box, border-box',
            backgroundOrigin: 'padding-box, border-box',
            backgroundImage: `linear-gradient(${theme.palette.background.paper}, ${theme.palette.background.paper}), 
                             linear-gradient(to right, #00FFCC 0%, #7A5AF8 100%)`,
            '&:before': { display: 'none' },
            '&:hover': { bgcolor: alpha(theme.palette.background.paper, 0.6) },
            [`&.${accordionClasses.expanded}`]: {
              bgcolor: alpha(theme.palette.background.paper, 0.8),
            },
          }}
        >
          <AccordionSummary
            id={`home-faqs-panel${index}-header`}
            aria-controls={`home-faqs-panel${index}-content`}
            expandIcon={<Iconify icon={"eva:arrow-ios-downward-fill" as any} />}
          >
            <Typography component="span" variant="h6">
              {item.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ color: 'text.secondary' }}>
            {item.answer}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );

  const renderContact = () => (
    <Box
      sx={{
        px: 3,
        py: 8,
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        background: `linear-gradient(to left, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}, transparent)`,
      }}
    >
      <m.div variants={varFade('in')}>
        <Typography variant="h4">Ainda tem dúvidas?</Typography>
      </m.div>
      <m.div variants={varFade('in')}>
        <Typography sx={{ mt: 2, mb: 3, color: 'text.secondary' }}>
          Contate nossa equipe para suporte detalhado sobre a associação.
        </Typography>
      </m.div>
      <m.div variants={varFade('in')}>
        <Button
          component={RouterLink}
          href={paths.contact}
          color="inherit"
          variant="contained"
          startIcon={<Iconify icon={"solar:letter-bold" as any} />}
        >
          Contate-nos
        </Button>
      </m.div>
    </Box>
  );

  return (
    <Box id="faqs" component="section" sx={[{ position: 'relative', overflow: 'hidden', bgcolor: 'transparent' }, ...(Array.isArray(sx) ? sx : [sx])]} {...other}>
      {/* ✅ LINHA REMOVIDA: <HomeBackground section="faqs" /> */}

      <MotionViewport sx={{ py: 10, position: 'relative' }}>
        {topLines()}
        <Container sx={{ position: 'relative', zIndex: 9 }}>
          {renderDescription()}
          {renderContent()}
        </Container>
        <Stack sx={{ position: 'relative' }}>
          {bottomLines()}
          {renderContact()}
        </Stack>
      </MotionViewport>
    </Box>
  );
}

// Helpers topLines e bottomLines permanecem os mesmos...
const topLines = () => (
  <>
    <Stack spacing={8} alignItems="center" sx={{ top: 64, left: 80, zIndex: 2, position: 'absolute', transform: 'translateX(-50%)' }}>
      <FloatTriangleDownIcon sx={{ position: 'static', opacity: 0.12 }} />
      <FloatTriangleDownIcon sx={{ width: 30, height: 15, opacity: 0.24, position: 'static' }} />
    </Stack>
    <FloatLine vertical sx={{ top: 0, left: 80, zIndex: 1 }} />
  </>
);

const bottomLines = () => (
  <>
    <FloatLine sx={{ top: 0, left: 0, zIndex: 1 }} />
    <FloatLine sx={{ bottom: 0, left: 0, zIndex: 1 }} />
    <FloatPlusIcon sx={{ top: -8, left: 72, zIndex: 2 }} />
    <FloatPlusIcon sx={{ bottom: -8, left: 72, zIndex: 2 }} />
  </>
);