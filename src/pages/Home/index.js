import { getCategories } from "../../services/Api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductItem from "../../shared/components/product-item";
import Pagination from "../../shared/components/Pagination";
const Home = () => {
  const [categorys, setCategorys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 6;
  useEffect(() => {
    getCategories().then(({ data }) => setCategorys(data.categories));
  }, []);

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categorys.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );
  const totalPages = Math.ceil(categorys.length / categoriesPerPage);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="barb" id="categories">
      <h2>Categories</h2>
      {/* <hr class="line" /> */}
      <div className="box-container">
        {currentCategories.map((item) => (
          <div className="box" key={item.idCategory}>
            <Link to={`/category-${item.strCategory}`}>
              <img src={item.strCategoryThumb} alt="" />
            </Link>
            <h3>{item.strCategory}</h3>
            <Link to={`/category-${item.strCategory}`} className="more-btn">
              See more
            </Link>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </section>

  )
}
export default Home;