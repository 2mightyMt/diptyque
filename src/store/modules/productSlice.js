import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    
};
export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
});
export const productActions = productSlice.actions;
export default productSlice.reducer;