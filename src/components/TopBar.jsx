import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";

const TopBar = ({ i18n, lngs }) => {
    const { t } = useTranslation();
    return (
        <AppBar position="fixed" color="default" elevation={1}>
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",    
                    alignItems: "center",
                }}
            >
                {/* App Title */}
                <Typography
                    sx={{
                        fontWeight: 600,
                        flexGrow: 1,
                        textAlign: "center",
                        color: "primary.main",
                        typography: { xs: "h6", sm: "h5", md: "h4" }
                    }}
                >
                    {t('Govt. Social Support Application')}
                </Typography>

                {/* Language Buttons */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    {Object.keys(lngs).map((lng) => (
                        <Button
                            key={lng}
                            variant={
                                i18n.resolvedLanguage === lng ? "contained" : "outlined"
                            }
                            color="primary"
                            size="small"
                            sx={{
                                mx: 1,
                                textTransform: "none",
                                borderRadius: 3,
                                fontWeight:
                                    i18n.resolvedLanguage === lng ? "bold" : "normal",
                            }}
                            onClick={() => {
                                i18n.changeLanguage(lng);
                            }}
                        >
                            {lngs[lng].nativeName}
                        </Button>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
