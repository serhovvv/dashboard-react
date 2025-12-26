import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import SelectSmall from "../../ui/Select";

export default function BasicSelect({ sortDate, setSortDate }) {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <SelectSmall
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={sortDate}
        label="Sort by date"
        setSortDate={setSortDate}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem onClick={() => setSortDate("oldToNew")} value={10}>
          older to newer
        </MenuItem>
        <MenuItem onClick={() => setSortDate("newToOld")} value={20}>
          newer to older
        </MenuItem>
      </SelectSmall>
    </FormControl>
  );
}
