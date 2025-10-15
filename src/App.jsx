import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { useTranslation, Trans } from 'react-i18next';
import { useState, useEffect } from 'react';
import { arSA } from '@mui/material/locale';
import TopBar from './components/TopBar';
import CssBaseline from '@mui/material/CssBaseline';
import FormContainer from './components/FormContainer';

const lngs = {
  en: { nativeName: 'English' },
  ar: { nativeName: 'العربية' }
};


function App() {
  const { i18n } = useTranslation();
  const [dir, setDir] = useState('ltr');

  const cacheRtl = createCache({
    key: i18n.resolvedLanguage === 'ar' ? 'mui-rtl' : 'mui-ltr',
    stylisPlugins: i18n.resolvedLanguage === 'ar' ? [prefixer, rtlPlugin] : [],
  });

  const theme = createTheme({
    direction: i18n.resolvedLanguage === 'ar' ? 'rtl' : 'ltr',
    palette: {
      mode: 'light', // 👈 ensures light mode
      primary: {
        main: '#1976d2',
      },
      background: {
        default: '#fafafa',
        paper: '#ffffff',
      },
    },
  },
    arSA,
  );

  useEffect(() => {
    if (i18n.resolvedLanguage === 'ar') {
      setDir('rtl');
    } else {
      setDir('ltr');
    }
  }, [i18n.resolvedLanguage]);

  return (
    <div>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <TopBar lngs={lngs} i18n={i18n} />
          <FormContainer theme={theme} />
        </ThemeProvider>
      </CacheProvider>
    </div>
  );
}

export default App;