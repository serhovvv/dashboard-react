import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../feautures/products/productSlice";
import { selectFilteredProducts } from "../../feautures/selectors/selectors";
function ProductGrid() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const products = useSelector(selectFilteredProducts);

  return (
    <div className="flex flex-wrap justify-center gap-12">
      {products.length === 0 ? (
        <p className="text-xl text-center py-10">No products available.</p>
      ) : (
        products.map((prod) => (
          <div
            key={prod.id}
            className="rounded-2xl max-w-[340px]  bg-white shadow-md hover:shadow-lg transition p-4 flex flex-col"
          >
            <div className="w-[300px] aspect-[16/10] overflow-hidden object-cover rounded-xl">
              <img
                src={prod.imgSrc}
                alt="Product"
                className="w-full h-full block hover:scale-105 transition"
              />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-gray-800">
              {prod.name}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {prod.desc.substring(0, 75)}..
            </p>

            <div className="flex items-center justify-between mt-4">
              <span className="text-xl font-bold text-green-600">
                ${prod.price}
              </span>

              <button className="bg-green-300 text-[var(--text-primary)] px-4 py-2 rounded-xl hover:bg-green-700 transition">
                Add to cart
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ProductGrid;
