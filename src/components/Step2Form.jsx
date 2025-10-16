import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextInput from "./inputs/TextInput";
import SelectInput from "./inputs/SelectInput";
import { useTranslation } from 'react-i18next';

const maritalStatuses = ["Single", "Married", "Divorced", "Widowed"];
const employmentStatuses = ["Employed", "Unemployed", "Self-Employed", "Student"];
const housingStatuses = ["Owned", "Rented", "Living with Family", "Other"];

const fields = [
    {
        name: "maritalStatus",
        label: "Marital Status",
        type: "select",
        options: maritalStatuses,
        required: true,
    },
    {
        name: "dependents",
        label: "Dependents",
        required: true,
        pattern: /^[0-9]+$/,
        message: "Must be a number",
    },
    {
        name: "employmentStatus",
        label: "Employment Status",
        type: "select",
        options: employmentStatuses,
        required: true,
    },
    {
        name: "monthlyIncome",
        label: "Monthly Income",
        required: true,
        pattern: /^[0-9]+$/,
        message: "Enter a valid amount",
    },
    {
        name: "housingStatus",
        label: "Housing Status",
        type: "select",
        options: housingStatuses,
        required: true,
    },
];

const Step2Form = ({ onValidityChange, onDataChange }) => {
    const { t } = useTranslation();
    const defaultValues = useSelector((state) => state.financialInfo);

    const {
        handleSubmit,
        control,
        watch,
        formState: { errors, isValid },
    } = useForm({
        defaultValues,
        mode: "onTouched",
        reValidateMode: "onChange",
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
            onSubmit={handleSubmit(() => { })}
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
                Employment & Financial Details
            </Typography>

            <Grid container spacing={2}>
                {fields.map((field) => {
                    const rules = {
                        required: field.required ? `${t(field.label)} ${t('is required')}` : false,
                        pattern: field.pattern
                            ? { value: field.pattern, message: t(field.message) }
                            : undefined,
                    };

                    if (field.type === "select") {
                        return (
                            <Grid size={{ xs: 12, md: 5 }} key={field.name}>
                                <SelectInput
                                    {...field}
                                    label={t(field.label)}
                                    options={field.options.map((value) => t(value))}
                                    control={control}
                                    rules={rules}
                                    errors={errors}
                                />
                            </Grid>
                        );
                    }

                    return (
                        <Grid size={{ xs: 12, md: 5 }} key={field.name}>
                            <TextInput
                                {...field}
                                label={t(field.label)}
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

export default Step2Form;
