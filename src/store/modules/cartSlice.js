import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    
};
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
});
export const cartActions = cartSlice.actions;
export default cartSlice.reducer;