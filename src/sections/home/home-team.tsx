'use client';

// ----------------------------------------------------------------------
// Imports — tipos e react/motion
// ----------------------------------------------------------------------
import type { BoxProps } from '@mui/material/Box';
import { m } from 'framer-motion';

// ----------------------------------------------------------------------
// Imports — MUI
// ----------------------------------------------------------------------
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------
// Imports — app
// ----------------------------------------------------------------------
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { _socials, _carouselsMembers } from 'src/_mock';
import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';
import { Carousel, useCarousel, CarouselArrowFloatButtons } from 'src/components/carousel';

// ✅ REMOVIDO: HomeBackground não é mais necessário aqui, pois já está no HomeView

// ----------------------------------------------------------------------

export function HomeTeam({ sx, ...other }: BoxProps) {
  const carousel = useCarousel({
    align: 'start',
    slideSpacing: '24px',
    slidesToShow: { xs: 1, sm: 2, md: 3, lg: 4 },
  });

  return (
    <Box
      id="team"
      component="section"
      sx={[
        { 
          position: 'relative', 
          overflow: 'hidden',
          // ✅ GARANTINDO TRANSPARÊNCIA: Permite ver o fundo unificado através da seção
          bgcolor: 'transparent' 
        },
        ...(Array.isArray(sx) ? sx : [sx])
      ]}
      {...other}
    >
      {/* ✅ LINHA REMOVIDA: <HomeBackground section="team" /> */}

      <Container 
        component={MotionViewport} 
        sx={{ position: 'relative', zIndex: 1, textAlign: 'center', py: { xs: 10, md: 15 } }}
      >
        <m.div variants={varFade('inDown')}>
          <Typography variant="overline" sx={{ color: 'text.disabled' }}>
            Dream team
          </Typography>
        </m.div>

        <m.div variants={varFade('inUp')}>
          <Typography variant="h2" sx={{ my: 3 }}>
            Great team is the key
          </Typography>
        </m.div>

        <m.div variants={varFade('inUp')}>
          <Typography sx={{ mx: 'auto', maxWidth: 640, color: 'text.secondary' }}>
            A equipe ASPPIBRA-DAO combina expertise em agroecologia, tecnologia blockchain e governança para transformar o setor rural.
          </Typography>
        </m.div>

        <Box sx={{ position: 'relative' }}>
          <CarouselArrowFloatButtons {...carousel.arrows} options={carousel.options} />

          <Carousel carousel={carousel} sx={{ px: 0.5 }}>
            {_carouselsMembers.map((member) => (
              <Box
                key={member.id}
                component={m.div}
                variants={varFade('in')}
                sx={{ py: { xs: 8, md: 10 } }}
              >
                <MemberCard member={member} />
              </Box>
            ))}
          </Carousel>
        </Box>

        <m.div variants={varFade('inUp')}>
          <Button
            component={RouterLink}
            href={paths.about}
            size="large"
            color="inherit"
            variant="outlined"
            endIcon={<Iconify icon={"eva:arrow-ios-forward-fill" as any} width={24} />}
            sx={{ mx: 'auto' }}
          >
            All members
          </Button>
        </m.div>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

type MemberCardProps = {
  member: (typeof _carouselsMembers)[number];
};

function MemberCard({ member }: MemberCardProps) {
  return (
    <Card 
      sx={(theme) => ({ 
        // ✅ EFEITO VIDRO LÍQUIDO: Harmoniza com o Vortex galáctico do fundo
        bgcolor: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: 'blur(16px)', 
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${alpha(theme.palette.common.white, 0.08)}`,
        position: 'relative', 
        zIndex: 1 
      })}
    >
      <Typography variant="subtitle1" sx={{ mt: 2.5, mb: 0.5 }}>
        {member.name}
      </Typography>

      <Typography variant="body2" sx={{ mb: 2.5, color: 'text.secondary' }}>
        {member.role}
      </Typography>

      <Box sx={{ px: 1 }}>
        <Image alt={member.name} src={member.avatarUrl} ratio="1/1" sx={{ borderRadius: 2 }} />
      </Box>

      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {_socials.map((social) => (
          <IconButton key={social.label}>
            {social.value === 'twitter' && <Iconify icon={"socials:twitter" as any} />}
            {social.value === 'facebook' && <Iconify icon={"socials:facebook" as any} />}
            {social.value === 'instagram' && <Iconify icon={"socials:instagram" as any} />}
            {social.value === 'linkedin' && <Iconify icon={"socials:linkedin" as any} />}
          </IconButton>
        ))}
      </Box>
    </Card>
  );
}