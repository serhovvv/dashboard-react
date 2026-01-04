import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../components/ui/ProductForm";
import { updateProduct } from "../feautures/products/productSlice";
import { toast } from "react-toastify";

export default function EditProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector((state) => state.categories.categories);
  const existingProduct = useSelector((state) =>
    state.products.products.find((p) => p.id === id)
  );
  const handleUpdate = (data) => {
    dispatch(updateProduct({ ...data, id }));
    toast.success("Product Updated!");
    navigate("/products");
  };

  return (
    <ProductForm
      title="Edit Product"
      initialData={existingProduct}
      categories={categories}
      onSubmit={handleUpdate}
    />
  );
}
