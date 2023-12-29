import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { UPDATE_CART, DELETE_CART } from "../../shared/constants/action-type";
const Cart = () => {
  const itemMeal = useSelector(({ Cart }) => {
    return Cart.carts;
  })
  console.log(itemMeal);
  const totalPrice = useSelector(({ Cart }) => {
    return Cart.carts.reduce((total, item) => total + item.price * item.qty, 0)
  })
  const totalItem = useSelector(({ Cart }) => {
    return Cart.carts.length;
  })
  const dispatch = useDispatch();
  const onChangeQty = (e, id) => {
    const value = parseInt(e.target.value);
    if (value <= 0) {
      // eslint-disable-next-line no-restricted-globals
      let isConfirm = confirm("Do you delete item from cart?");

      if (isConfirm) {
        dispatch({
          type: DELETE_CART,
          payload: {
            idMeal: id,
          }
        })
      }
      else {
        dispatch({
          type: UPDATE_CART,
          payload: {
            idMeal: id,
            qty: 1,
          }
        })
      }
    }
    else {
      dispatch({
        type: UPDATE_CART,
        payload: {
          idMeal: id,
          qty: value,
        }
      })
    }
  }
  const deleteItem = (e, id) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    const isConfirm = confirm("Do you delete item from cart?");
    if (isConfirm) {
      dispatch({
        type: DELETE_CART,
        payload: {
          idMeal: id,
        }
      })
    }
    else return false;
  }
  return (
    <section className="barb" id="categories">
      <h2>Cart</h2>
      <div className="cart">
        <p>{`You have ${totalItem} items in your cart`}</p>
        <hr className="line" />
        <div id="items">
          {
            itemMeal.map(item => {
              return (
                <div className="item">
                  <div className="img-item">
                    <img src={item.strMealThumb} alt='' />
                  </div>
                  <div className="name-item">{item.strMeal}</div>
                  <div className="cost-fake">{item.price} $</div>
                  <div className="quantity">
                    <input
                      onChange={(e) => onChangeQty(e, item.idMeal)}
                      type="number"
                      id="quantity"
                      className="form-control form-blue quantity"
                      value={item.qty}
                    />
                  </div>
                  <div className="cost">{item.price * item.qty} $</div>
                  <button className="remove" onClick={e => deleteItem(e, item.idMeal)}>
                    <i className="fa-solid fa-trash-can fa-2xl" />
                  </button>
                </div>
              )
            })
          }
          {/* <div className="item">
            <div className="img-item">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp" alt ='' />
            </div>
            <div className="name-item">Iphone 11 pro</div>
            <div className="quantity">
              <button className="increase">+</button>
              <input type="text" name id="text" defaultValue={10} />
              <button className="decrease">−</button>
            </div>
            <div className="cost">19$</div>
            <button className="remove">
              <i className="fa-solid fa-trash-can fa-2xl" />
            </button>
          </div> */}
          <div className="total">
            <div><b>Total:</b></div>
            <div className="total-money">{totalPrice} $</div>
          </div>
        </div>
        <p>Buy now</p>
        <hr className="line" />
        <form className="infor">
          <input type="text" placeholder="Enter name" />
          <div className="infor-item">
            <input type="text" placeholder="Enter phone number" />
            <input type="email" placeholder="Enter email" />
          </div>
          <input type="text" placeholder="Enter address" />
          <button>Buy now</button>
        </form>
      </div>
    </section>
  )
}
export default Cart;