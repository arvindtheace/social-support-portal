import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { saveUserData } from "../store/userSlice";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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

const UserForm = () => {
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
                User Information
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
                            <Grid  size={{ xs: 12, md: 5 }} key={field.name}>
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
                            <Grid  size={{ xs: 12, md: 5 }} key={field.name}>
                                <DateInput
                                    {...field}
                                    control={control}
                                    rules={rules}
                                    errors={errors}
                                />
                            </Grid>
                        );

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
                <Button type="button" variant="outlined" onClick={() => reset(defaultValues)}>
                    Reset
                </Button>
            </Box>
        </Box>
    );
};

export default UserForm;
