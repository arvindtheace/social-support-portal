import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { saveUserData } from "../store/userSlice";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextInput from "./inputs/TextInput";
import SelectInput from "./inputs/SelectInput";

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

const Step2Form = () => {
    const dispatch = useDispatch();
    const defaultValues = useSelector((state) => state.user);

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues,
        mode: "onTouched",
        reValidateMode: "onChange",
    });

    const onSubmit = (data) => {
        dispatch(saveUserData(data));
        console.log("Saved:", data);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
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
                        required: field.required ? `${field.label} is required` : false,
                        pattern: field.pattern
                            ? { value: field.pattern, message: field.message }
                            : undefined,
                    };

                    if (field.type === "select") {
                        return (
                            <Grid  size={{ xs: 12, md: 5 }} key={field.name}>
                                <SelectInput
                                    {...field}
                                    control={control}
                                    rules={rules}
                                    errors={errors}
                                />
                            </Grid>
                        );
                    }

                    return (
                        <Grid  size={{ xs: 12, md: 5 }} key={field.name}>
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
};

export default Step2Form;
