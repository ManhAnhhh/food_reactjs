import { ADD_TO_CART, DELETE_CART, UPDATE_CART } from "../../shared/constants/action-type";
const initState = {
  carts: [],
}
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
  switch (action.type) {
    case ADD_TO_CART: return addToCart(state, action.payload);
    case UPDATE_CART: return updateCart(state, action.payload);
    case DELETE_CART:
      const newCarts = state.carts.filter(
        (item) => item.idMeal !== action.payload.idMeal
      );
      return { ...state, carts: newCarts }
    default: return state;
  }
}

const addToCart = (state, payload) => {
  const carts = state.carts;
  let isMealExist = false;
  carts.map(item => {
    if (item.idMeal === payload.idMeal) {
      item.qty += payload.qty;
      isMealExist = true;
    }
    return item;
  })
  const newCarts = isMealExist ? carts : [...carts, payload];
  localStorage.setItem("cart_items", JSON.stringify(newCarts));
  return { ...state, carts: newCarts }
}

const updateCart = (state, payload) => {
  const carts = state.carts;
  const newCarts = carts.map((item) => {
    if (item.idMeal === payload.idMeal) {
      item.qty = payload.qty
    }
    return item;
  }); return { ...state, carts: newCarts };
}