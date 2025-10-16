import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const SelectInput = ({ name, control, label, options, rules, errors }) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field }) => (
      <TextField
        {...field}
        select
        fullWidth
        label={label}
        error={!!errors[name]}
        helperText={errors[name]?.message}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    )}
  />
);

export default SelectInput;
