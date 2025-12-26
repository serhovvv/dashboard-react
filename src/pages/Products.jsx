import React, { useEffect, useState } from "react";
import ProductTable from "../components/Products/ProductTable";
import ProductsBar from "../components/Products/ProductsBar";
import ProductGrid from "../components/Products/ProductGrid";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteProducts } from "../feautures/products/productSlice";
import BasicModal from "../components/ui/BasicModal";

const Products = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [viewMode, setViewMode] = useState("table");
  const err = useSelector((state) => state.products.err);
  const dispatch = useDispatch();
  useEffect(() => {
    if (err) {
      toast.error(err, {
        position: "bottom-right",
      });
    }
  }, [err]);
  const deleteSelected = () => {
    dispatch(deleteProducts(selected));
    setSelected([]);
    setOpen(false);
    toast.success("Product Deleted", { position: "bottom-right" });
  };

  return (
    <>
      <div className="flex flex-col rounded-t-4xl bg-green-50 px-4 py-6 lg:px-8 lg:py-12 min-h-screen  w-full ">
        <div className="pb-6 flex items-center justify-between">
          <p className="font-semibold text-3xl">Products</p>
          {selected.length > 0 && (
            <button
              onClick={() => setOpen(true)}
              className="p-4 bg-red-500/80 cursor-pointer w-[150px] rounded-xl"
            >
              Delete
            </button>
          )}
        </div>

        <ProductsBar viewMode={viewMode} setViewMode={setViewMode} />

        {viewMode === "table" ? (
          <ProductTable
            selected={selected}
            setSelected={setSelected}
            checkboxSelection
            sx={{ border: 0 }}
          />
        ) : (
          <ProductGrid />
        )}
      </div>
      <BasicModal open={open} setOpen={setOpen} onClose={() => setOpen(false)}>
        <div className="bg-green-50 w-500px w-full gap-4  rounded-xl flex flex-col p-10">
          <p className="text-4xl font-semibold">Are you sure?</p>
          <p> Delete the selected products?</p>
          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 w-[70%] rounded-xl"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-green-600 hover:bg-green-700 w-[70%] text-white rounded-xl"
              onClick={deleteSelected}
            >
              Delete
            </button>
          </div>
        </div>
      </BasicModal>
    </>
  );
};

export default Products;
