import React, { useEffect } from "react";

import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../feautures/products/productSlice";
import CustomTable from "../ui/CustomTable";
import { selectFilteredProducts } from "../../feautures/selectors/selectors";

export default function ProductTable({ selected, setSelected }) {
  const products = useSelector(selectFilteredProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(products.map((p) => p.id));
    } else {
      setSelected([]);
    }
  };

  const isAllSelected =
    products.length > 0 && selected.length === products.length;

  const isIndeterminate =
    selected.length > 0 && selected.length < products.length;

  const columns = [
    {
      id: "checkbox",
      label: (
        <Checkbox
          indeterminate={isIndeterminate}
          checked={isAllSelected}
          onChange={handleSelectAll}
        />
      ),
      render: (_, row) => (
        <Checkbox
          checked={selected.includes(row.id)}
          onChange={() => handleSelect(row.id)}
        />
      ),
    },

    {
      id: "name",
      label: "Product Name",
      render: (_, row) => (
        <div className="flex gap-4">
          <div className="w-[70px] h-[70px] aspect-[16/10] overflow-hidden object-cover rounded-xl">
            <img src={row.imgSrc} className="w-full h-full block" alt="" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-semibold text-[16px]">{row.name}</span>
            <span className="text-[var(--text-primary)]">ID: {row.id}</span>
          </div>
        </div>
      ),
    },
    { id: "category", label: "Category" },
    {
      id: "desc",
      label: "Description",
      render: (value) => {
        if (!value) return "";
        return value.length > 30 ? value.substring(0, 30) + "..." : value;
      },
    },
    { id: "price", label: "Price", render: (value) => <span>${value}</span> },
    { id: "stock", label: "Stock" },
  ];

  return (
    <div className="p-4 rounded-xl bg-white">
      {products.length === 0 ? (
        <p className="text-xl text-center py-10">No products available.</p>
      ) : (
        <CustomTable columns={columns} rows={products} />
      )}
    </div>
  );
}
