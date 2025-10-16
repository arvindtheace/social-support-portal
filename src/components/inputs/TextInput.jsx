import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

const TextInput = ({ name, control, label, rules, type = "text", errors }) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field }) => (
      <TextField
        {...field}
        fullWidth
        label={label}
        type={type}
        error={!!errors[name]}
        helperText={errors[name]?.message}
      />
    )}
  />
);

export default TextInput;
