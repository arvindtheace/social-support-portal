import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { useTranslation, Trans } from 'react-i18next';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { arSA } from '@mui/material/locale';

const lngs = {
  en: { nativeName: 'English' },
  ar: { nativeName: 'العربية' }
};


function App() {
  const { t, i18n } = useTranslation();
  const [count, setCounter] = useState(0);
  const [dir, setDir] = useState('ltr');

  const cacheRtl = createCache({
    key: i18n.resolvedLanguage === 'ar' ? 'mui-rtl' : 'mui-ltr',
    stylisPlugins: i18n.resolvedLanguage === 'ar' ? [prefixer, rtlPlugin] : [],
  });

  const theme = createTheme({
    direction: i18n.resolvedLanguage === 'ar' ? 'rtl' : 'ltr',
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
          <AppBar position="fixed" color="default">
            <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {Object.keys(lngs).map((lng) => (
                <Button
                  key={lng}
                  variant={i18n.resolvedLanguage === lng ? 'contained' : 'outlined'}
                  color="primary"
                  size="small"
                  sx={{
                    mx: 1,
                    textTransform: 'none',
                    borderRadius: 3,
                    fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal',
                  }}
                  onClick={() => {
                    i18n.changeLanguage(lng);
                    setCounter(count + 1);
                  }}
                >
                  {lngs[lng].nativeName}
                </Button>
              ))}
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      </CacheProvider>
    </div>
  );
}

export default App;