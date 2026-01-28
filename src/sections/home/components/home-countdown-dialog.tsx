import type { DialogProps } from '@mui/material';

import { m } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';
import { varTap, varHover } from 'src/components/animate';

// ----------------------------------------------------------------------

interface Props extends DialogProps {
  targetDate: Date;
  onClose: VoidFunction;
}

export default function HomeCountdownDialog({ targetDate, open, onClose, ...other }: Props) {
  const [countdown, setCountdown] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  const setNewTime = useCallback(() => {
    const startTime = new Date().getTime();
    const endTime = targetDate.getTime();
    const distance = endTime - startTime;

    if (distance < 0) {
      setCountdown({ days: '00', hours: '00', minutes: '00', seconds: '00' });
      return;
    }

    setCountdown({
      days: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0'),
      hours: String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0'),
      minutes: String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0'),
      seconds: String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0'),
    });
  }, [targetDate]);

  useEffect(() => {
    const interval = setInterval(() => setNewTime(), 1000);
    return () => clearInterval(interval);
  }, [setNewTime]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      {...other}
      PaperProps={{
        sx: {
          maxWidth: 480,
          borderRadius: 2,
          bgcolor: '#141A21',
          color: 'common.white',
          position: 'relative',
          maxHeight: '90vh',
          // CORREÇÃO: Garante visibilidade sobre o HomeHero (zIndex 10)
          zIndex: (theme) => theme.zIndex.modal + 1, 
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: 'absolute', right: 12, top: 12, color: 'grey.500', zIndex: 9 }}
      >
        <Iconify icon="mingcute:close-line" />
      </IconButton>

      <DialogContent 
        sx={{ 
          py: 5, 
          px: 3, 
          textAlign: 'center',
          scrollbarWidth: 'none', 
          '&::-webkit-scrollbar': { display: 'none' } 
        }}
      >
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 800, textTransform: 'uppercase' }}>
          SocialFi <Box component="span" sx={{ color: '#00A76F' }}>Alpha Launch</Box>
        </Typography>

        <Typography sx={{ color: 'grey.500', mb: 3, lineHeight: 1.6, maxWidth: 480, mx: 'auto' }}>
          Pare de entregar seu conteúdo de graça. Na <strong>DEX World</strong>, suas interações geram valor real. 
          <br /><br />
          Garanta seu <strong>@handle exclusivo</strong> e posicione-se antes que a curadoria de conteúdo comece a pagar.
        </Typography>

        <Stack direction="row" justifyContent="center" spacing={2} sx={{ mb: 4 }}>
          <TimeBlock label="DIAS" value={countdown.days} />
          <TimeBlock label="HORAS" value={countdown.hours} />
          <TimeBlock label="MIN" value={countdown.minutes} />
          <TimeBlock label="SEG" value={countdown.seconds} />
        </Stack>

        <Box component={m.div} whileTap={varTap(0.95)} whileHover={varHover(1.02)}>
          <Button
            fullWidth
            size="large"
            variant="contained"
            component={RouterLink}
            href={paths.pricing}
            sx={{
              py: 2,
              fontSize: '1.2rem',
              fontWeight: 800,
              boxShadow: '0 8px 16px 0 rgba(0, 167, 111, 0.24)',
              background: 'linear-gradient(90deg, #00A76F 0%, #8E33FF 100%)',
              '&:hover': { 
                opacity: 0.9,
                boxShadow: '0 12px 24px 0 rgba(0, 167, 111, 0.32)',
              },
            }}
          >
            RESERVAR MEU PERFIL
          </Button>
          
          <Typography variant="caption" sx={{ mt: 2, display: 'block', color: 'grey.600' }}>
            ⚠️ Nomes de usuário curtos estão esgotando
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

// ----------------------------------------------------------------------

function TimeBlock({ label, value }: { label: string; value: string }) {
  return (
    <Stack spacing={1}>
      <Box
        sx={{
          width: 60,
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 1.5,
          bgcolor: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Typography variant="h4">{value}</Typography>
      </Box>

      <Typography
        variant="caption"
        sx={{ color: 'grey.600', fontWeight: 'bold', letterSpacing: 1 }}
      >
        {label}
      </Typography>
    </Stack>
  );
}