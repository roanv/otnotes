import { Autocomplete, TextField } from "@mui/material";

export default function DropDown({ options, label }) {
  return (
    <Autocomplete
      id="combo-box-demo"
      // multiple
      // filterSelectedOptions
      // freeSolo
      autoHighlight
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}
