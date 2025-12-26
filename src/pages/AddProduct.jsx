import { ArrowLeft, Check } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ImageUpload from "../components/Products/ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../feautures/products/productSlice";
import { toast } from "react-toastify";
import SelectSmall from "../components/ui/Select";
import MenuItem from "@mui/material/MenuItem";

function AddProduct() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [imgSrc, setImgSrc] = useState(null);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.products.err);
  const categories = useSelector((state) => state.categories.categories);

  const productObj = { name, desc, price, discount, category, stock, imgSrc };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!name.trim()) newErrors.name = "Field is Empty!";
    if (!desc.trim()) newErrors.desc = "Field is Empty!";
    if (!price.toString().trim()) newErrors.price = "Field is Empty!";
    if (isNaN(price)) newErrors.price = "Must be a number!";
    if (!category.trim()) newErrors.category = "Field is Empty!";
    if (!stock.toString().trim()) newErrors.stock = "Field is Empty!";
    if (isNaN(stock)) newErrors.stock = "Must be a number!";
    if (!imgSrc) newErrors.imgSrc = "Field is Empty!";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fill required fields", { position: "bottom-right" });
      return;
    }

    dispatch(addProducts(productObj));
    navigate("/products");

    if (!error) {
      toast.success("Product Added", { position: "bottom-right" });
    }
  };

  const selectStyles = {
    width: "100%",
    backgroundColor: "#DCFCE7",
    borderRadius: "0.75rem",
    padding: "0.2rem 0.5rem",
    minHeight: "3rem",
    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
    "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },
  };

  const card = "w-full bg-white rounded-xl shadow-md p-4 sm:p-6 lg:p-8";

  return (
    <div
      className="
      flex flex-col gap-6
      bg-green-50
      px-4 py-6
      sm:px-6
      md:px-8 md:py-12
      min-h-screen w-full
    "
    >
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Link to="/products" className="bg-white shadow-md p-2 rounded-xl">
            <ArrowLeft />
          </Link>
          <p className="font-semibold text-2xl sm:text-3xl">Add Product</p>
        </div>

        <button
          onClick={handleSubmit}
          type="submit"
          className="
            flex items-center justify-center gap-2
            bg-green-300 rounded-xl
            w-full md:w-auto
            px-6 py-4
            shadow-sm
          "
        >
          <Check />
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          {/* general */}
          <div className={card}>
            <p className="text-xl font-semibold mb-4">General Information</p>

            <div className="flex flex-col mb-6">
              <label className="mb-2">Name Product</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter the name..."
                className="bg-green-100 rounded-xl outline-none px-3 py-3"
              />
              {errors.name && (
                <p className="text-red-500 font-semibold mt-3">{errors.name}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="mb-2">Description Product</label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Enter the description..."
                className="bg-green-100 h-40 resize-none rounded-xl outline-none px-3 py-3"
              />
              {errors.desc && (
                <p className="text-red-500 font-semibold mt-3">{errors.desc}</p>
              )}
            </div>
          </div>

          {/* pricing */}
          <div className={card}>
            <p className="text-xl font-semibold mb-4">Pricing And Discount</p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="flex flex-col w-full">
                <label className="mb-2">Base Pricing $</label>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter the price..."
                  className="bg-green-100 rounded-xl outline-none px-3 py-3"
                />
                {errors.price && (
                  <p className="text-red-500 font-semibold mt-3">
                    {errors.price}
                  </p>
                )}
              </div>

              <div className="flex flex-col w-full">
                <label className="mb-2">Discount %</label>
                <input
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder="Discount..."
                  className="bg-green-100 rounded-xl outline-none px-3 py-3"
                />
              </div>
            </div>
          </div>

          {/* category */}
          <div className={card}>
            <p className="text-xl font-semibold mb-4">Category and Stock</p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="flex flex-col w-full">
                <label className="mb-2">Product Category</label>
                <SelectSmall
                  styles={selectStyles}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.category}>
                      {cat.category}
                    </MenuItem>
                  ))}
                </SelectSmall>
                {errors.category && (
                  <p className="text-red-500 font-semibold mt-3">
                    {errors.category}
                  </p>
                )}
              </div>

              <div className="flex flex-col w-full">
                <label className="mb-2">Product Stock</label>
                <input
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="Enter a stock..."
                  className="bg-green-100 rounded-xl outline-none px-3 py-3"
                />
                {errors.stock && (
                  <p className="text-red-500 font-semibold mt-3">
                    {errors.stock}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* image */}
        <div className="flex flex-col gap-6">
          <div className={card}>
            <p className="text-xl font-semibold mb-4">Product Image</p>
            <ImageUpload imgSrc={imgSrc} setImgSrc={setImgSrc} />
            {errors.imgSrc && (
              <p className="text-red-500 font-semibold mt-4">{errors.imgSrc}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
