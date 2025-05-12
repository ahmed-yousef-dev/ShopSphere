import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            const { id, quantity } = action.payload;
            const existingItem = state.find(item => item.id === id);

            if (existingItem) {
                if (existingItem.quantity !== quantity) {
                    existingItem.quantity = quantity;
                }
            } else {
                state.push({ ...action.payload, quantity });
            }
        },
        removeFromCart: (state, action) => {
            return state.filter(item => item.id !== action.payload);
        },
        incrementQuantity: (state, action) => {
            const item = state.find(item => item.id === action.payload);
            item.quantity += 1;
        },
        decrementQuantity: (state, action) => {
            const item = state.find(item => item.id === action.payload);
            if (item.quantity === 1) {
                return state.filter(i => i.id !== action.payload);
            } else {
                item.quantity -= 1;
            }
        },
    },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;