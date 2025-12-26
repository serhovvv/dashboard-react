import * as React from "react";
import BasicModal from "../ui/BasicModal";
import { useDispatch, useSelector } from "react-redux";
import { Calendar } from "lucide-react";
import {
  addCategories,
  deleteCategories,
  fetchCategories,
} from "../../feautures/categories/categoriesSlice";
import { toast } from "react-toastify";

export default function AddCategory() {
  const [category, setCategory] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const date = new Date();

  const handleSubmit = (e) => {
    e.preventDefault();
    const categoryObj = { category, creationDate: formatDate(new Date()) };
    if (!category.trim()) {
      toast.error("Category field is empty", { position: "bottom-right" });
      return;
    }
    formatDate(date);
    dispatch(addCategories(categoryObj));
    setCategory("");
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      day: "numeric",
      month: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categories = useSelector((state) => state.categories.categories);

  return (
    <div>
      <button
        className="cursor-pointer p-4 border-3 min-w-[155px] rounded-xl hover:border-green-300/80 border-green-300/50 "
        onClick={() => setOpen(true)}
      >
        Add Category
      </button>
      <BasicModal open={open} setOpen={setOpen} onClose={() => setOpen(false)}>
        <div
          className="
          min-w-[600px]
          max-h-[700px]
          overflow-y-auto
          scrollbar-hide
          p-8 "
        >
          <div className="flex justify-center mb-10">
            <p className="text-3xl font-semibold">Categories</p>
          </div>
          <div className="bg-white mb-5 rounded-xl min-w-[250px] shadow-md py-6 px-4 flex flex-col  text-center gap-3">
            <label className="text-xl" htmlFor="cat">
              Enter a Category Name
            </label>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex justify-center">
                <input
                  className="outline-0 w-[70%] p-4 pr-2 shadow-md rounded-xl border-2 border-black/30"
                  type="text"
                  id="cat"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Category Name"
                />
              </div>
              <div className="grid justify-center">
                <button className="bg-green-300 w-[150px] p-4 rounded-xl shadow-md">
                  Add Category
                </button>
              </div>
            </form>
          </div>
          <div className="flex flex-col gap-8  justify-center">
            <div className=" bg-white rounded-xl shadow-md py-6 px-4 flex flex-col  text-center gap-3">
              <div className="flex justify-center ">
                <p className="text-xl">Category and Item Quantity</p>
              </div>
              <ul className="flex flex-col gap-4 ">
                {categories.map((cat) => (
                  <li
                    className="shadow-lg p-4 rounded-xl justify-between flex"
                    key={cat.id}
                  >
                    <div className="flex flex-col items-start gap-2">
                      <span className="font-semibold text-lg">
                        {cat.category}
                      </span>
                      <div className="flex items-center gap-2 text-[var(--text-primary)] ">
                        <Calendar />
                        <span>{cat.creationDate}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => dispatch(deleteCategories(cat.id))}
                      className="p-2 bg-red-400 cursor-pointer rounded-xl"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </BasicModal>
    </div>
  );
}
