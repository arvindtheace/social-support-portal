import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const TopBar = ({ i18n, lngs }) => {
    return (
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
                        }}
                    >
                        {lngs[lng].nativeName}
                    </Button>
                ))}
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
