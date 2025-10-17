import { Controller } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";

const DateInput = ({ name, control, label, rules, errors }) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <DatePicker
          label={label}
          disableFuture
          value={field.value ? dayjs(field.value) : null}
          onChange={(date) => field.onChange(date ? date.toISOString() : "")}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              error={!!errors[name]}
              helperText={errors[name]?.message}
            />
          )}
        />
      )}
    />
  </LocalizationProvider>
);

export default DateInput;
