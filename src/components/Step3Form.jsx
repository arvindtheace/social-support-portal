import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import OpenAI from 'openai';

const Step3Form = () => {
  const [form, setForm] = useState({
    financial: '',
    employment: '',
    reason: '',
  });
  const [loading, setLoading] = useState(false);
  const [activeField, setActiveField] = useState('');

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleHelp = async (field) => {
    const currentText = form[field].trim();
    setActiveField(field);
    setLoading(true);

    try {
      const client = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true, // ⚠️ dev only
      });

      const prompts = {
        financial: `Improve and expand this paragraph about someone's current financial situation, keeping it professional, clear, and around 100 words: "${currentText || 'The person is facing some financial challenges.'}"`,
        employment: `Improve and expand this paragraph about someone's employment circumstances for a financial application, keeping it factual, professional, and concise: "${currentText || 'The person is currently employed and working hard to support their family.'}"`,
        reason: `Improve and expand this paragraph explaining why someone is applying for financial assistance, making it sound genuine, respectful, and goal-oriented: "${currentText || 'The person is applying for financial assistance to ease their current burden.'}"`,
      };

      const result = await client.responses.create({
        model: 'gpt-4o-mini', // or "gpt-5" if available
        input: prompts[field],
      });

      handleChange(field, result.output_text || 'No AI response found.');
    } catch (err) {
      console.error(err);
      handleChange(field, '❌ Error fetching AI response.');
    } finally {
      setLoading(false);
      setActiveField('');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 700,
        mx: 'auto',
        my: 3,
        p: 3,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 2,
        maxHeight: '70vh',
        overflowY: 'auto',
      }}
    >
      <Typography variant="h6" mb={2}>
        Application Details
      </Typography>

      <Stack spacing={3}>
        {/* Section 1 */}
        <Box>
          <Typography variant="subtitle1" mb={1}>
            Current Financial Situation
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
              'Help me to write'
            )}
          </Button>
        </Box>

        {/* Section 2 */}
        <Box>
          <Typography variant="subtitle1" mb={1}>
            Employment Circumstances
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
              'Help me to write'
            )}
          </Button>
        </Box>

        {/* Section 3 */}
        <Box>
          <Typography variant="subtitle1" mb={1}>
            Reason for Applying
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
              'Help me to write'
            )}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default Step3Form;