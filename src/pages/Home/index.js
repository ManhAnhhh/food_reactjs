import { getCategories } from "../../services/Api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductItem from "../../shared/components/product-item";
import Pagination from "../../shared/components/Pagination";
const Home = () => {
  const [categorys, setCategorys] = useState([]);
  useEffect(() => {
    getCategories().then(({ data }) => setCategorys(data.categories));
  }, []);

  return (
    <section className="barb" id="categories">
      <h2>Categories</h2>
      {/* <hr class="line" /> */}
      <div className="box-container">
        {
          categorys.map(item =>
            // <ProductItem item={item} />
            <div className="box">
              <Link to={`/category-${item.strCategory}`}>
                <img src={item.strCategoryThumb} alt="" />
              </Link>

              <h3>{item.strCategory}</h3>
              <Link to={`/category-${item.strCategory}`} className="more-btn">See more</Link>
            </div>
          )
        }
      </div>
      <Pagination/>
    </section>

  )
}
export default Home;