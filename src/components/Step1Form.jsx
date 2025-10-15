// src/components/UserForm.jsx
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { saveUserData } from '../store/userSlice';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

const genders = ['Male', 'Female', 'Other'];

const fields = [
    { name: 'name', label: 'Name', required: true },
    { name: 'nationalId', label: 'National ID', required: true },
    { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
    { name: 'gender', label: 'Gender', type: 'select', required: true },
    { name: 'address', label: 'Address' },
    { name: 'city', label: 'City' },
    { name: 'state', label: 'State' },
    { name: 'country', label: 'Country' },
    { name: 'phone', label: 'Phone', required: true, pattern: /^[0-9]{10}$/, message: 'Phone must be 10 digits' },
    { name: 'email', label: 'Email', required: true, pattern: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
];

const Step1Form = () => {
    const dispatch = useDispatch();
    const defaultValues = useSelector((state) => state.user);

    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues,
        mode: 'onTouched',
        reValidateMode: 'onChange',
    });

    const onSubmit = (data) => {
        dispatch(saveUserData(data));
        console.log('Saved:', data);
    };

    console.log('errors', errors);

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            //   sx={{ maxWidth: 600, mx: 'auto', p: 3 }}
            sx={{
                maxWidth: '100%',
                mx: 'auto',
                my: 2,
                p: 3,
                maxHeight: '60vh',        // limit form height
                overflowY: 'auto',        // enable scrolling
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 1,
            }}
        >
            <Typography variant="h5" mb={2}>
                User Information
            </Typography>

            <Grid container spacing={2}>
                {fields.map((field) => {
                    const validationRules = {
                        required: field.required ? `${field.label} is required` : false,
                        pattern: field.pattern
                            ? { value: field.pattern, message: field.message }
                            : undefined,
                    };
                    return (
                        <Grid size={8} key={field.name}>
                            <Controller
                                name={field.name}
                                control={control}
                                rules={validationRules}
                                render={({ field: ctrl }) =>
                                    field.type === 'select' ? (
                                        <TextField
                                            {...ctrl}
                                            select
                                            fullWidth
                                            label={field.label}
                                            error={!!errors[field.name]}
                                            helperText={errors[field.name]?.message}
                                        >
                                            {genders.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    ) : (
                                        <TextField
                                            {...ctrl}
                                            fullWidth
                                            label={field.label}
                                            type={field.type || 'text'}
                                            error={!!errors[field.name]}
                                            helperText={errors[field.name]?.message}
                                            InputLabelProps={field.type === 'date' ? { shrink: true } : undefined}
                                        />
                                    )
                                }
                            />
                        </Grid>
                    );
                })}
            </Grid>

            <Box mt={3} display="flex" gap={2}>
                <Button type="submit" variant="contained">
                    Save
                </Button>
                <Button
                    type="button"
                    variant="outlined"
                    onClick={() => reset(defaultValues)}
                >
                    Reset
                </Button>
            </Box>
        </Box>
    );
}

export default Step1Form;