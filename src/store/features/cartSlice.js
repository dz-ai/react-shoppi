import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const saveCart = createAsyncThunk('cart/saveCart', initCart => {
    return fetch('http://localhost:3300/carts/save-cart', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'auth': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(initCart),
    })
        .then(res => res.json())
        .then(results => results);
});

export const fetchSavedCart = createAsyncThunk('cart/fetchSavedCart', () => {
    return fetch('http://localhost:3300/carts/saved-Cart', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'auth': `Bearer ${localStorage.getItem('token')}`,
        },
    })
        .then(res => res.json())
        .then(results => results);
});

export const clearSavedCart = createAsyncThunk('cart/clearSavedCart', cartToClear => {
    return fetch('http://localhost:3300/carts/saved-Cart', {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'auth': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({cartId: cartToClear}),
    })
        .then(res => res.json())
        .then(results => results);
});

export const submitOrder = createAsyncThunk('cart/submitOrder', (initOrder ,{ rejectWithValue })=> {
    return fetch('http://localhost:3300/order/submit-order', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'auth': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(initOrder),
    })
        .then(res => res.json())
        .then(results => results)
});

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        showCart: false,
        itemsCount: 0,
        total: 0,
        message: '',
        orderId: 0,
        savedCarts: []
    },
    extraReducers(builder) {
        builder.addCase(saveCart.fulfilled, (state, action) => {
            state.cart = action.payload.cart;
            state.savedCarts = action.payload.carts;
            //console.log(state.savedCarts.length)
        });
        builder.addCase(fetchSavedCart.fulfilled, (state, action) => {
            state.savedCarts = action.payload.carts;
            //console.log(state.savedCarts)
        });
        builder.addCase(clearSavedCart.fulfilled, (state, action) => {
            state.savedCarts = action.payload.carts;
            //console.log(state.savedCarts);
        });
        builder.addCase(submitOrder.fulfilled, (state, action) => {
                state.message = action.payload.message;
                state.orderId = action.payload.orderId;
                state.cart = [];
                console.log(state.message, state.orderId);
        });
        builder.addCase(submitOrder.rejected, (state, action) => {
            state.message = 'credit card rejected pleas contact the credit company';
        })
    },
    reducers: {
        addToCart(state, action) {
            const item = state.cart.find(item => item.id === action.payload.id);
            if (item === undefined) {
                state.cart.push(action.payload);
            } else {
                item.quantity++;
                item.itemsTotal = item.quantity * item.price;
            }
        },
        removeFromCart(state, action) {
            if (action.payload.acTy === 'all') {
                state.cart = state.cart.filter(item => item.id !== action.payload.id);
                if (state.cart.length === 0) state.showCart = false;
            } else {
                const item = state.cart.find(item => item.id === action.payload.id);
                item.quantity--;
                item.itemsTotal = item.quantity * item.price;
            }
        },
        setTotalPrice(state) {
            state.total = state.cart.reduce((p, c) => {
                p = p + c.itemsTotal;
                return p
            }, 0)
        },
        showCart(state) {
            state.showCart = !state.showCart;
        },
        cartCounter(state) {
            state.itemsCount = state.cart.reduce((p, c) => {
                p = p + c.quantity;
                return p;
            }, 0)
        },
        orderZero(state, action) {
            if (action.payload === 'all') {
                state.cart = [];
                state.itemsCount = 0;
                state.total = 0;
                state.message = '';
                state.orderId = 0;
            } else {
                state.savedCarts = [];
            }
        },
        getSavedCart(state, action) {
            state.cart = state.savedCarts.find(cart => cart._id === action.payload).cart;
        },
    }
});

export const {
    addToCart,
    removeFromCart,
    setTotalPrice,
    showCart,
    cartCounter,
    orderZero,
    getSavedCart
} = cartSlice.actions;
export default cartSlice.reducer;