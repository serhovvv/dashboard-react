import { Grid2X2, Plus, Search, StretchHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import SelectSmall from "../ui/Select";
import SearchBar from "./ui/SearchBar";
import AddCategory from "./AddCategory";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import { useTheme, useMediaQuery } from "@mui/material";
import { setFilterCategory } from "../../feautures/categories/categoriesSlice";

export default function ProductsBar({ viewMode, setViewMode, rows }) {
  const [category, setCategory] = React.useState("");
  const [filtered, setFiltered] = useState("");
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();
  const styles = {
    width: "70%",
    "@media (min-width: 1024px)": {
      width: "15%",
    },

    "& .MuiOutlinedInput-root": {
      display: "flex",
      minWidth: "150px",
      background: "white",
      borderRadius: "12px",
      padding: "8px",
      backgroundColor: "green-50",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      color: "var(--text-primary)",
    },

    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },

    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },

    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },

    "& .MuiInputLabel-root": {
      color: "var(--text-primary)",
      fontWeight: 500,
    },
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  useEffect(() => {
    if (isMobile) {
      setViewMode("grid");
    }
  }, [isMobile, setViewMode]);
  useEffect(() => {
    dispatch(setFilterCategory(category));
  }, [category, dispatch]);
  return (
    <div className="flex flex-col mb-6 items-center w-full lg:flex-row gap-4">
      <SearchBar rows={rows} filtered={filtered} setFiltered={setFiltered} />

      <div className="gap-4 hidden lg:flex">
        <div
          onClick={() => setViewMode("table")}
          className="bg-white cursor-pointer hover:text-green-600 rounded-xl p-4 shadow-sm  text-[var(--text-primary)]"
        >
          <StretchHorizontal />
        </div>
        <div
          onClick={() => setViewMode("grid")}
          className="bg-white hover:text-green-600 cursor-pointer rounded-xl p-4 shadow-sm  text-[var(--text-primary)]"
        >
          <Grid2X2 />
        </div>
      </div>

      <div className="flex w-auto">
        <SelectSmall
          styles={styles}
          value={category}
          label="Category"
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="">All products</MenuItem>
          {categories.map((cat) => (
            <MenuItem value={cat.category} key={cat.id}>
              <span>{cat.category}</span>
            </MenuItem>
          ))}
        </SelectSmall>
      </div>
      <div className="hidden lg:flex gap-4">
        <AddCategory />
        <Link
          className=" flex bg-green-300 hover:bg-green-300/70 rounded-xl min-w-[155px] p-4 shadow-sm  text-[var(--text-primary)]"
          to="/addproduct"
        >
          <Plus /> Add Product
        </Link>
      </div>
    </div>
  );
}
