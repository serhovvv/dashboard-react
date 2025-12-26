import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectSmall({
  children,
  value,
  onChange,
  label,
  styles,
}) {
  return (
    <FormControl size="small" sx={styles}>
      <InputLabel>{label}</InputLabel>

      <Select value={value ?? ""} label={label} onChange={onChange}>
        {children}
      </Select>
    </FormControl>
  );
}
