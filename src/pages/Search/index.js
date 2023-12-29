import { useSearchParams, Link } from "react-router-dom";
import { getIngredient } from "../../services/Api";
import { useState, useEffect } from "react";
import Pagination from "../../shared/components/Pagination";
import ProductItem from "../../shared/components/product-item";
const Search = () => {
  const [searchParams] = useSearchParams();
  const keyWord = searchParams.get('keyword');
  const [ingredient, setIngredient] = useState([]);
  useEffect(() => {
    getIngredient(keyWord, {}).then(({ data }) => setIngredient(data.meals));
  }, [keyWord]);
  if (Array.isArray(ingredient)) {
    return (
      <>
        <section className="barb" id="categories">
          <h2 id="title">{`Meal: ${keyWord}`}</h2>
          {/* <hr class="line" /> */}
          <div className="box-container">
            <div id="meal">
              {/* meal item */}
              {
                ingredient.map(item => {
                  return (
                    // <div className="meal-item">
                    //   <div className="meal-img">
                    //     <Link to={`/product-detail-${item.idMeal}`}><img src={item.strMealThumb} alt="food" /></Link>
                    //   </div>
                    //   <div className="meal-name">
                    //     <div className="meal-infor">
                    //       <Link to={`/product-detail-${item.idMeal}`}><h3 className="meal-name">{item.strMeal}</h3></Link>
                    //       <p className="meal-price">Price: <span>{Math.ceil(Math.random() * 10) + 10}$</span></p>
                    //     </div>
                    //   </div>
                    // </div>
                    <ProductItem item={item}/>
                  )
                })
              }
              {/* end of meal item */}
            </div>
          </div>
        </section>
        <Pagination />
      </>
    )
  }
  else {
    return (
      <section className="barb" id="categories">
        <h2 id="title">{`Meal: ${keyWord}`}</h2>
        {/* <hr class="line" /> */}
        {/* meal item */}
        <div class='notFound'>
          Sorry, we didn't find any meal!
        </div>

        {/* end of meal item */}

      </section>

    )
  }

}
export default Search;