import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "../../shared/constants/action-type";
import { getById } from "../../services/Api";
import { toast } from 'react-toastify';
const ProducDetails = ({toggleModal}) => {
  const params = useParams();
  const id = params.id;
  const [productDetail, setProductDetail] = useState([
    {
      strCategory: "",
    }
  ]);
  useEffect(() => {
    getById(id, {}).then(({ data }) => {
      setProductDetail(data.meals)
    })
  }, [id])

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addToCart = (type) => {
    if (localStorage.getItem("userLogin")) {
      dispatch({
        type: ADD_TO_CART,
        payload: {
          idMeal: id,
          strMeal: productDetail[0].strMeal,
          strMealThumb: productDetail[0].strMealThumb,
          qty: 1,
          price: Math.ceil(Math.random() * 10 + 10),
        },
      });
      toast.success("Successfully added to cart");
      if (type === "buy-now") {
        return navigate('/cart');
      }
    }
    else {
      toggleModal()
    }

  }
  const youtubeURL = productDetail[0].strYoutube;
  return (
    <section className="barb" id="categories">
      <h2>{productDetail[0].strCategory}</h2>
      <div className="product-detail">
        <div className="product-img">
          <img src={productDetail[0].strMealThumb} alt='' />
        </div>
        <div className="product-infor">
          <p className="product-name">{productDetail[0].strMeal}</p>
          <p className="product-price">{Math.ceil(Math.random() * 10) + 10}$</p>
          <p className="product-category">{productDetail[0].strCategory}</p>
          <div className="product-img-small">
            <img src={productDetail[0].strMealThumb} alt='' />
          </div>
          <div className="star">
            <i className="fas fa-star fa-lg" />
            <i className="fas fa-star fa-lg" />
            <i className="fas fa-star fa-lg" />
            <i className="fas fa-star fa-lg" />
            <i className="fas fa-star-half-alt fa-lg" />
          </div>
          <div className="watch-video">
            <a href={productDetail[0].strYoutube} target="_blank" rel="noreferrer">Watch video</a>
          </div>
          <div className="btn-container">
            <button onClick={() => addToCart("buy-now")} className="recipe-btn">Buy now</button>
            <button onClick={addToCart} className="recipe-btn">Add to cart</button>
          </div>
        </div>
      </div>
      <div className="clear" />
      <div className="product-instruction">
        <p className="title">instruction:</p>
        <p className="description">
          {productDetail[0].strInstructions}
        </p>
      </div>
    </section>
  )
}
export default ProducDetails;