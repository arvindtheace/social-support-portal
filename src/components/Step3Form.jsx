import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';



const Step3Form = ({ onValidityChange, onDataChange, direction }) => {
    const { t } = useTranslation();
    const situationInfo = useSelector((state) => state.situationInfo);
    const [form, setForm] = useState({
        financial: situationInfo.financial || '',
        employment: situationInfo.employment || '',
        reason: situationInfo.reason || '',
    });
    const [loading, setLoading] = useState(false);
    const [activeField, setActiveField] = useState('');

    useEffect(() => {
        const allFieldsFilled = Object.values(form).every(
            (value) => value.trim() !== ''
        );
        if (allFieldsFilled) {
            onValidityChange(true);
        } else {
            onValidityChange(false);
        }
    }, [onValidityChange, form]);

    useEffect(() => {
        const allFieldsFilled = Object.values(form).every(
            (value) => value.trim() !== ''
        );
        if (allFieldsFilled) {
            onDataChange(form);
        }
    }, [onDataChange, form]);

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleHelp = async (field) => {
        setLoading(true);
        setActiveField(field);
        const currentText = form[field].trim();

        // Define context-specific prompts
        const promptTemplates = {
            financial: `
You are assisting a user filling out a financial aid or loan application.
    They are describing their current financial situation.

    TASK:
    Expand and enhance the following text so that it becomes a clear, detailed, and professional paragraph.
    The tone should remain factual and empathetic, suitable for an official financial form.
    If the text is too short or vague, infer realistic supporting details (e.g., expenses, dependents, income challenges),
    but avoid exaggeration or fictional specifics.
    Keep it in first person ("I...") and around 4–6 sentences.

    IMPORTANT:
    Respond entirely in ${direction === 'rtl' ? 'Arabic' : 'English'}.
    Maintain a professional and empathetic tone.

      Text: "${currentText}"
    `,
    employment: `
    You are assisting a user who is describing their current employment situation as part of their application for financial assistance.

    TASK:
    Expand and polish the text below into a clear, professional, and sincere paragraph.
    Highlight the user's current employment status, any financial or job-related challenges, and their motivation to improve their situation.
    If the input is too short, infer realistic and grounded details while keeping the tone authentic and respectful.
    Keep it in first person and limit to 4–6 sentences.

    IMPORTANT:
    Respond entirely in ${direction === 'rtl' ? 'Arabic' : 'English'}.
    Maintain a professional and empathetic tone.

      Text: "${currentText}"
    `,
            reason: `
    You are assisting a user who is writing their reason for applying for financial assistance.

    TASK:
    Expand and polish the text below into a heartfelt but professional paragraph.
    Emphasize the user's motivation, sincerity, and need for support without being overly emotional.
    If the input is too short, infer natural, realistic reasons while keeping it authentic and grounded.
    Keep it in first person and limit to 4–6 sentences.

    IMPORTANT:
    Respond entirely in ${direction === 'rtl' ? 'Arabic' : 'English'}.
    Maintain a professional and empathetic tone.

      Text: "${currentText}"
    `,
        };

        const inputPrompt =
            promptTemplates[field] ||
            `Improve this paragraph while keeping the original intent:\n"${currentText}"`;

        try {
            const res = await fetch("http://localhost:5000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ input: inputPrompt }),
            });
            const data = await res.json();

            handleChange(field, data.output || "No response received.");
        } catch (err) {
            console.error(err);
            handleChange(field, "Error connecting to AI service.");
        } finally {
            setLoading(false);
        }
    };



    return (
        <Box
            sx={{
                maxWidth: '100%',
                mx: 'auto',
                my: 2,
                p: 3,
                maxHeight: '60vh',
                overflowY: 'auto',
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 1,
            }}
        >
            <Typography variant="h6" mb={2}>
                {t('Situation Descriptions')}
            </Typography>

            <Stack spacing={3}>
                {/* Section 1 */}
                <Box>
                    <Typography variant="subtitle1" mb={1}>
                        {t('Current Financial Situation')}
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        minRows={3}
                        value={form.financial}
                        onChange={(e) => handleChange('financial', e.target.value)}
                    />
                    <Button
                        variant="outlined"
                        onClick={() => handleHelp('financial')}
                        disabled={loading}
                        sx={{ mt: 1 }}
                    >
                        {loading && activeField === 'financial' ? (
                            <CircularProgress size={20} />
                        ) : (
                            t('Help me to write')
                        )}
                    </Button>
                </Box>

                {/* Section 2 */}
                <Box>
                    <Typography variant="subtitle1" mb={1}>
                        {t('Employment Circumstances')}
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        minRows={3}
                        value={form.employment}
                        onChange={(e) => handleChange('employment', e.target.value)}
                    />
                    <Button
                        variant="outlined"
                        onClick={() => handleHelp('employment')}
                        disabled={loading}
                        sx={{ mt: 1 }}
                    >
                        {loading && activeField === 'employment' ? (
                            <CircularProgress size={20} />
                        ) : (
                            t('Help me to write')
                        )}
                    </Button>
                </Box>

                {/* Section 3 */}
                <Box>
                    <Typography variant="subtitle1" mb={1}>
                        {t('Reason for Applying')}
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        minRows={3}
                        value={form.reason}
                        onChange={(e) => handleChange('reason', e.target.value)}
                    />
                    <Button
                        variant="outlined"
                        onClick={() => handleHelp('reason')}
                        disabled={loading}
                        sx={{ mt: 1 }}
                    >
                        {loading && activeField === 'reason' ? (
                            <CircularProgress size={20} />
                        ) : (
                            t('Help me to write')
                        )}
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
};

export default Step3Form;