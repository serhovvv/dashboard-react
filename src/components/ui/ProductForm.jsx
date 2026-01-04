import { ArrowLeft, Check } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SelectSmall from "./Select";
import MenuItem from "@mui/material/MenuItem";
import ImageUpload from "../Products/ImageUpload";

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

function ProductForm({ onSubmit, initialData, title, categories, btnText }) {
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    price: "",
    discount: "",
    category: "",
    stock: "",
    imgSrc: null,
  });
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const validateAndSave = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name?.trim()) newErrors.name = "Field is Empty!";
    if (!formData.desc?.trim()) newErrors.desc = "Field is Empty!";
    if (!formData.price || isNaN(formData.price))
      newErrors.price = "Invalid price!";
    if (!formData.category) newErrors.category = "Select a category!";
    if (!formData.imgSrc) newErrors.imgSrc = "Image is required!";

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Link to="/products" className="bg-white shadow-md p-2 rounded-xl">
            <ArrowLeft />
          </Link>
          <p className="font-semibold text-2xl sm:text-3xl">{title}</p>
        </div>

        <button
          onClick={validateAndSave}
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
          Save Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <div className={card}>
            <p className="text-xl font-semibold mb-4">General Information</p>

            <div className="flex flex-col mb-6">
              <label htmlFor="name" className="mb-2">
                Name Product
              </label>
              <input
                value={formData.name}
                id="name"
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Enter the name..."
                className="bg-green-100 rounded-xl outline-none px-3 py-3"
              />
              {errors.name && (
                <p className="text-red-500 font-semibold mt-3">{errors.name}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="desc" className="mb-2">
                Description Product
              </label>
              <textarea
                id="desc"
                value={formData.desc}
                onChange={(e) => updateField("desc", e.target.value)}
                placeholder="Enter the description..."
                className="bg-green-100 h-40 resize-none rounded-xl outline-none px-3 py-3"
              />
              {errors.desc && (
                <p className="text-red-500 font-semibold mt-3">{errors.desc}</p>
              )}
            </div>
          </div>

          <div className={card}>
            <p className="text-xl font-semibold mb-4">Pricing And Discount</p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="flex flex-col w-full">
                <label htmlFor="price" className="mb-2">
                  Base Pricing $
                </label>
                <input
                  value={formData.price}
                  id="price"
                  onChange={(e) => updateField("price", e.target.value)}
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
                <label htmlFor="discount" className="mb-2">
                  Discount %
                </label>
                <input
                  id="discount"
                  value={formData.discount}
                  onChange={(e) => updateField("discount", e.target.value)}
                  placeholder="Discount..."
                  className="bg-green-100 rounded-xl outline-none px-3 py-3"
                />
              </div>
            </div>
          </div>

          <div className={card}>
            <p className="text-xl font-semibold mb-4">Category and Stock</p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="flex flex-col w-full">
                <label className="mb-2">Product Category</label>
                <SelectSmall
                  styles={selectStyles}
                  value={formData.category}
                  onChange={(e) => updateField("category", e.target.value)}
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
                <label htmlFor="stock" className="mb-2">
                  Product Stock
                </label>
                <input
                  id="stock"
                  value={formData.stock}
                  onChange={(e) => updateField("stock", e.target.value)}
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
        <div className="flex flex-col gap-6">
          <div className={card}>
            <p className="text-xl font-semibold mb-4">Product Image</p>
            <ImageUpload
              imgSrc={formData.imgSrc}
              setImgSrc={(val) => handleChange("imgSrc", val)}
            />
            {errors.imgSrc && (
              <p className="text-red-500 font-semibold mt-4">{errors.imgSrc}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
