import { Link } from "react-router-dom";
const ProductItem = ({ item }) => {
  return (
    <div className="meal-item">
      <div className="meal-img">
        <Link to={`/product-detail-${item.idMeal}`}><img src={item.strMealThumb} alt="food" /></Link>
      </div>
      <div className="meal-name">
        <div className="meal-infor">
          <Link to={`/product-detail-${item.idMeal}`}><h3 className="meal-name">{item.strMeal}</h3></Link>
          <p className="meal-price">Price: <span>{Math.ceil(Math.random() * 10) + 10}$</span></p>
        </div>
      </div>
    </div>
  )
}
export default ProductItem;