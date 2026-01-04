import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../feautures/products/productSlice";
import { toast } from "react-toastify";
import ProductForm from "../components/ui/ProductForm";

export default function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories.categories);

  const handleAdd = (data) => {
    dispatch(addProducts(data));
    toast.success("Product Added!");
    navigate("/products");
  };

  return (
    <ProductForm
      title="Add Product"
      categories={categories}
      onSubmit={handleAdd}
    />
  );
}
