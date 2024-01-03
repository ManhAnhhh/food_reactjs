import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { useState } from "react";
import {
  UPDATE_CART,
  DELETE_CART,
  DELETE_CART_ALL,
} from "../../shared/constants/action-type";
const Cart = () => {
  const [confirmOrder, setConfirmOrder] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const itemMeal = useSelector(({ Cart }) => {
    return Cart.carts;
  });
  const totalPrice = useSelector(({ Cart }) => {
    return Cart.carts.reduce((total, item) => total + item.price * item.qty, 0);
  });
  const totalItem = useSelector(({ Cart }) => {
    return Cart.carts.length;
  });
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
          },
        });
      } else {
        dispatch({
          type: UPDATE_CART,
          payload: {
            idMeal: id,
            qty: 1,
          },
        });
      }
    } else {
      dispatch({
        type: UPDATE_CART,
        payload: {
          idMeal: id,
          qty: value,
        },
      });
    }
  };
  const deleteItem = (e, id) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    const isConfirm = confirm("Do you delete item from cart?");
    if (isConfirm) {
      dispatch({
        type: DELETE_CART,
        payload: {
          idMeal: id,
        },
      });
    } else return false;
  };
  const handleBuyNow = () => {
    const emptyFieldList = [];

    if (!name) {
      emptyFieldList.push("name");
    }
    if (!phoneNumber) {
      emptyFieldList.push("phone number");
    }
    if (!email) {
      emptyFieldList.push("email");
    }
    if (!address) {
      emptyFieldList.push("address");
    }

    if (emptyFieldList.length > 0) {
      setEmptyFields(emptyFieldList);
      alert(`Please enter ${emptyFieldList.join(" and ")} before payment!`);
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to order items in checkout with ${totalPrice} $?`
    );
    const users = JSON.parse(localStorage.getItem("users"));
    const userLogin = JSON.parse(localStorage.getItem("userLogin"));
    const cart_items = JSON.parse(localStorage.getItem("cart_items"));
    if (confirmed) {
      toast.success("Order Success");
      confirmOrderHandler(true);
      const newUsers = users.map(item => {
        if (item.email === userLogin.email) {
          if (item.purchasedProduct)
            item.purchasedProduct = item.purchasedProduct.concat(cart_items).reverse();
          else {
            item.purchasedProduct = cart_items;
          }
        }
        return item;
      })
      localStorage.setItem('users', JSON.stringify(newUsers));
    }
  };

  const confirmOrderHandler = (confirm) => {
    if (confirm) {
      // Perform actions upon confirming the order (e.g., clearing cart)
      dispatch({
        type: DELETE_CART_ALL, // Replace with your action type to clear all items
      });
    }
    setConfirmOrder(false);
  };
  return (
    <section className="barb" id="categories">
      <h2>Cart</h2>
      <div className="cart">
        {(totalItem === 1 || totalItem === 0) ? (
          <p>{`You have ${totalItem} item in your cart`}</p>
        ) : (
          <p>{`You have ${totalItem} items in your cart`}</p>
        )}

        <hr className="line" />
        <div id="items">
          {itemMeal.map((item) => {
            return (
              <div className="item">
                <div className="img-item">
                  <img src={item.strMealThumb} alt="" />
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
                <button
                  className="remove"
                  onClick={(e) => deleteItem(e, item.idMeal)}
                >
                  <i className="fa-solid fa-trash-can fa-2xl" />
                </button>
              </div>
            );
          })}
          <div className="total">
            <div>
              <b>Total:</b>
            </div>
            <div className="total-money">{totalPrice} $</div>
          </div>
        </div>
        <p>Ordering information form</p>
        <hr className="line" />
        <form className="infor">
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="infor-item">
            <input
              type="text"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <input
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </form>
        <div className="buyButton">
          {!confirmOrder ? (
            <button
              className="buy"
              onClick={handleBuyNow}
              disabled={totalItem === 0}
            >
              Order now
            </button>
          ) : (
            <>
              <p>Are you sure you want to place the order?</p>
              <button
                className="confirm"
                onClick={() => confirmOrderHandler(false)}
              >
                Cancel
              </button>
              <button
                className="confirm"
                onClick={() => confirmOrderHandler(true)}
              >
                Confirm
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
export default Cart;
