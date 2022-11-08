import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    products: [],
    error: '',
    category: "-select-",
    filteredProducts:[],
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', () => {
    return fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(results => results);
});

export const productsSlice = createSlice({
    name: 'products',
    initialState: initialState,
    extraReducers: builder => {
        builder.addCase(fetchProducts.pending, state => {
            state.loading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
            state.error = '';
            state.filteredProducts = state.products;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.products = [];
            state.error = action.error.message;
        });
    },
    reducers: {
        categoryFilter(state, action) {
            if (action.payload !== '-select-') {
                return {...state,
                    filteredProducts: [...state.products].filter(item => item.category === action.payload)
                }
            } else {
                return {...state,
                    filteredProducts: [...state.products]
                }
            }
        },
    }
});
export const {categoryFilter} = productsSlice.actions;
export default productsSlice.reducer;