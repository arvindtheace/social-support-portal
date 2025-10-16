import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextInput from "./inputs/TextInput";
import SelectInput from "./inputs/SelectInput";
import DateInput from "./inputs/DateInput";

const genders = ["Male", "Female", "Other"];

const fields = [
    { name: "name", label: "Name", required: true },
    { name: "nationalId", label: "National ID", required: true },
    { name: "dob", label: "Date of Birth", type: "date", required: true },
    { name: "gender", label: "Gender", type: "select", required: true },
    { name: "address", label: "Address" },
    { name: "city", label: "City" },
    { name: "state", label: "State" },
    { name: "country", label: "Country" },
    {
        name: "phone",
        label: "Phone",
        required: true,
        pattern: /^[0-9]{10}$/,
        message: "Phone must be 10 digits",
    },
    {
        name: "email",
        label: "Email",
        required: true,
        pattern: /^\S+@\S+\.\S+$/,
        message: "Enter a valid email",
    },
];

const UserForm = ({ onValidityChange, onDataChange }) => {
    const defaultValues = useSelector((state) => state.personalInfo);

    const {
        handleSubmit,
        control,
        watch,
        formState: { errors, isValid },
    } = useForm({
        defaultValues,
        mode: "onTouched",
    });

    useEffect(() => {
        if (onValidityChange) onValidityChange(isValid);
    }, [isValid, onValidityChange]);

    useEffect(() => {
        if (isValid) {
            const watchedData = watch();
            onDataChange(watchedData);
        }
    }, [isValid, watch, onDataChange])


    return (
        <Box
            component="form"
            onSubmit={handleSubmit(() => {})}
            sx={{
                maxWidth: "100%",
                mx: "auto",
                my: 2,
                p: 3,
                maxHeight: "60vh",
                overflowY: "auto",
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 1,
            }}
        >
            <Typography variant="h5" mb={2}>
                Personal Information
            </Typography>

            <Grid container spacing={2}>
                {fields.map((field) => {
                    const rules = {
                        required: field.required ? `${field.label} is required` : false,
                        pattern: field.pattern
                            ? { value: field.pattern, message: field.message }
                            : undefined,
                    };

                    if (field.type === "select")
                        return (
                            <Grid size={{ xs: 12, md: 5 }} key={field.name}>
                                <SelectInput
                                    {...field}
                                    control={control}
                                    rules={rules}
                                    errors={errors}
                                    options={genders}
                                />
                            </Grid>
                        );

                    if (field.type === "date")
                        return (
                            <Grid size={{ xs: 12, md: 5 }} key={field.name}>
                                <DateInput
                                    {...field}
                                    control={control}
                                    rules={rules}
                                    errors={errors}
                                />
                            </Grid>
                        );

                    return (
                        <Grid size={{ xs: 12, md: 5 }} key={field.name}>
                            <TextInput
                                {...field}
                                control={control}
                                rules={rules}
                                errors={errors}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default UserForm;
