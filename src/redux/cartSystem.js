import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    carts: JSON.parse(localStorage.getItem('cart')) || [],
    amount: 0
}
const cartSystem = createSlice({
    name: "user",
    initialState,
    reducers: {
        AddCart: (state, action) => {
            const find = state.carts.findIndex(item => item.id === action.payload.id)
            if(find >= 0 ) {
                state.carts[find].amount++;
                localStorage.setItem('cart', JSON.stringify(state.carts))
            }
            else {
                const tempvar = { ...action.payload, amount: 1 }
                state.carts.push(tempvar)
                localStorage.setItem('cart', JSON.stringify(state.carts))
            }
        },
        //State: trạng thái hiện tại của slice, action: đối tg thông tin đang được thực hiện (Xóa sản phẩm)
        RemoveCart: (state, action) => {
            const index = state.carts.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.carts.splice(index , 1);
                localStorage.setItem('cart', JSON.stringify(state.carts))
            }
        }
    }
})

export const {AddCart} = cartSystem.actions;
export default cartSystem.reducer;
export const {RemoveCart} = cartSystem.actions;