import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    cart: [],
    amount: 0
}
const cartSystem = createSlice({
    name: "user",
    initialState,
    reducers: {
        AddCart: (state, action) => {
            // const find = state.cart.findIndex(item => item.id === action.payload.id)
            // if(find >= 0 ) {
            //     state.cart[find].amount++;
            // }
            // else {
                const tempvar = { ...action.payload, amount: 1 }
                state.cart.push(tempvar)
            
        },
        //State: trạng thái hiện tại của slice, action: đối tg thông tin đang được thực hiện (Xóa sản phẩm)
        RemoveCart: (state, action) => {
            const index = state.cart.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.cart.splice(index, 1);
            }
        }
    }
})

export const {AddCart} = cartSystem.actions;
export default cartSystem.reducer;
export const {RemoveCart} = cartSystem.actions;