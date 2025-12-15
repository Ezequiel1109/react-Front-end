import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { findAll, create, update, remove } from "../services/ProductService";


// --- THUNK PARA OBTENER TODOS LOS PRODUCTOS ---
export const fetchProducts = createAsyncThunk(
  "api/products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const products = await findAll();
      //extrae el array de productos del objeto paginado
      if( products && typeof products === 'object' && Array.isArray(products.content)) {
        return {
          content: products.content,
          pageNumber: products.pageNumber ?? 0,
          pageSize: products.pageSize ?? 10,
          totalElements: products.totalElements ?? products.content.length
        };
      }
      //si no es paginado, lo retorna como esta
      if(Array.isArray(products)){
        return {content: products, pageNumber: 0, pageSize: products.length, totalElements: products.length};
      }
      return { content: [], pageNumber: 0, pageSize: 0, totalElements: 0 };
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message ||
        error?.response?.data ||
        error?.message ||
        "Error desconocido";
      console.error("Error en fetchProducts:", errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

export const addProduct = createAsyncThunk(
  "api/products/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const products = await create(productData);
      return products;
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message ||
        error?.response?.data ||
        error?.message ||
        "Error desconocido";
      console.error("Error en addProduct:", errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "api/products/updateProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await update(productData);
      return response;
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message ||
        error?.response?.data ||
        error?.message ||
        "Error desconocido";
      console.error("Error en updateProduct:", errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "api/products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await remove(id);
      return id;
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message ||
        error?.response?.data ||
        error?.message ||
        "Error desconocido";
      console.error("Error en deleteProduct:", errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: null,
    status: "idle",
    error: null,
    pageInfo: {
      pageNumber: 0,
      pageSize: 10,
      totalElements: 0,
    },
  },
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearProducts: (state) => {
      state.products = [];
      state.error = null;
      state.status = "idle";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        //extrae el array de content
        if(action.payload && action.payload.content){
          state.products = action.payload.content;
          state.pageInfo = {
            pageNumber: action.payload.pageNumber,
            pageSize: action.payload.pageSize,
            totalElements: action.payload.totalElements,
          };
          console.log('✅ [productsSlice] Products stored:', state.products.length);
        }else{
          state.products = [];
          console.warn('⚠️ [productsSlice] No content in response');
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.error('❌ [productsSlice] fetchProducts failed:', action.payload);
      })
      // ADD PRODUCT
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products.push(action.payload);
        state.pageInfo.totalElements += 1;
        console.log('✅ [productsSlice] Product added to state');
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      
      // UPDATE PRODUCT
      .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.products.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
          console.log('✅ [productsSlice] Product updated in state');
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      
      // DELETE PRODUCT
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = state.products.filter((p) => p.id !== action.payload);
        state.pageInfo.totalElements -= 1;
        console.log('✅ [productsSlice] Product removed from state');
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { setSelectedProduct, clearProducts } = productsSlice.actions;
export default productsSlice.reducer;
