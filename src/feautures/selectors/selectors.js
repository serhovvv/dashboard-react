import { createSelector } from "@reduxjs/toolkit";

const getProducts = (state) => state.products.products;
const getSearch = (state) => state.products.searchTerm;
const getFilterCategories = (state) => state.categories.filterCategory;

export const selectFilteredProducts = createSelector(
  [getProducts, getSearch, getFilterCategories],
  (products, search, category) => {
    return products.filter(item => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        !category || item.category === category;

      return matchesSearch && matchesCategory;
    });
  }
);