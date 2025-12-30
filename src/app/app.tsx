'use client';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as ThemeVarsProvider } from '@mui/material/styles';

import { useTranslate } from 'src/locales';
import { createTheme, Rtl } from 'src/theme';

import { Snackbar } from 'src/components/snackbar';
import { ProgressBar } from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import {
  SettingsDrawer,
  defaultSettings,
  useSettingsContext,
} from 'src/components/settings';

import { CheckoutProvider } from 'src/sections/checkout/context';

// ----------------------------------------------------------------------

export default function App({ children }: { children: React.ReactNode }) {
  const settings = useSettingsContext();

  const { currentLang } = useTranslate();

  const theme = createTheme({
    settingsState: settings.state,
    localeComponents: currentLang?.systemValue,
  });

  return (
    <ThemeVarsProvider theme={theme}>
      <CssBaseline />
      <Rtl direction={settings.state.direction}>
        <MotionLazy>
          <CheckoutProvider>
            <Snackbar />
            <ProgressBar />
            <SettingsDrawer defaultSettings={defaultSettings} />
            {children}
          </CheckoutProvider>
        </MotionLazy>
      </Rtl>
    </ThemeVarsProvider>
  );
}
