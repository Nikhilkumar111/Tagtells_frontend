import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  products: [],
  checked: [],
  radio: [],
  selectedBrand: null,
  brandCheckboxes: {},
  checkedBrands: [],
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    // Set categories
    setCategories: (state, action) => {
      state.categories = action.payload;
    },

    // Set products
    setProducts: (state, action) => {
      state.products = action.payload;
    },

    // Set checked filters (e.g., category IDs)
    setChecked: (state, action) => {
      state.checked = action.payload;
    },

    // Set radio filters (e.g., price range)
    setRadio: (state, action) => {
      state.radio = action.payload;
    },

    // Set selected brand
    setSelectedBrand: (state, action) => {
      state.selectedBrand = action.payload;
    },

    //  Reset all filters to initial state
    resetFilters: (state) => {
      state.checked = [];
      state.radio = [];
      state.selectedBrand = null;
    },

    // Optional: reset all shop state (if needed)
    resetShopState: (state) => {
      state.categories = [];
      state.products = [];
      state.checked = [];
      state.radio = [];
      state.selectedBrand = null;
      state.brandCheckboxes = {};
      state.checkedBrands = [];
    },
  },
});

// Export actions
export const {
  setCategories,
  setProducts,
  setChecked,
  setRadio,
  setSelectedBrand,
  resetFilters,
  resetShopState,
} = shopSlice.actions;

// Export reducer
export default shopSlice.reducer;
