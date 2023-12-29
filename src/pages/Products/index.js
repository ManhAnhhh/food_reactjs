import { getByCategory } from "../../services/Api";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Pagination from "../../shared/components/Pagination";
import ProductItem from "../../shared/components/product-item";
const Products = () => {
  const params = useParams();
  const category = params.c;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getByCategory(category, {}).then(({ data }) => {
      const meals = data.meals;
      for (let i = 0; i < meals.length; i++) {
        meals[i] = { ...meals[i], price: Math.ceil(Math.random() * 10) + 10 }
      }
      setProducts(meals)
    });
  }, [category]);
  return (
    <>
      <section className="barb" id="categories">
        <h2 id="title">{category}</h2>
        {/* <hr class="line" /> */}
        <div className="box-container">
          <div id="meal">
            {/* meal item */}
            {
              products.map(item => {
                return (
                  // <div className="meal-item">
                  //   <div className="meal-img">
                  //     <Link to={`/product-detail-${item.idMeal}`}><img src={item.strMealThumb} alt="food" /></Link>
                  //   </div>
                  //   <div className="meal-infor">
                  //     <Link to={`/product-detail-${item.idMeal}`}><h3 className="meal-name">{item.strMeal}</h3></Link>
                  //     <p className="meal-price">Price: <span>{item.price}$</span></p>
                  //   </div>
                  // </div>
                  <ProductItem item={item}/>
                  
                )
              })
            }
            {/* end of meal item */}
          </div>
        </div>
        <Pagination />
      </section>

    </>



  )
}
export default Products;