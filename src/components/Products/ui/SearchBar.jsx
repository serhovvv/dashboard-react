import React, { useEffect } from "react";
import { Search } from "lucide-react";
import { setSearchTerm } from "../../../feautures/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
function SearchBar() {
  const [value, setValue] = React.useState("");
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.products.searchTerm);
  useEffect(() => {
    const id = setTimeout(() => {
      dispatch(setSearchTerm(value));
    }, 300);

    return () => clearTimeout(id);
  }, [value, dispatch]);

  return (
    <div className="w-[70%] relative shadow-sm  bg-white rounded-xl">
      <input
        type="text"
        className="w-[100%] outline-none  pl-10 p-4 pr-3 "
        placeholder="Search..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <Search className="absolute left-3 top-1/2  -translate-y-1/2 w-5 h-5 text-gray-500" />
    </div>
  );
}

export default SearchBar;
