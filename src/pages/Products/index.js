import { getByCategory } from "../../services/Api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Pagination from "../../shared/components/Pagination";
import ProductItem from "../../shared/components/product-item";
const Products = () => {
  const params = useParams();
  const category = params.c;
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  useEffect(() => {
    getByCategory(category, {}).then(({ data }) => {
      const meals = data.meals;
      for (let i = 0; i < meals.length; i++) {
        meals[i] = { ...meals[i], price: Math.ceil(Math.random() * 10) + 10 }
      }
      setProducts(meals)
    });
  }, [category]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    return false;
  };
  return (
    <>
      <section className="barb" id="categories">
        <h2 id="title">{category}</h2>
        {/* <hr class="line" /> */}
        <div className="box-container">
          <div id="meal">
            {/* meal item */}
            {currentProducts.map((item) => (
              <ProductItem key={item.idMeal} item={item} />
            ))}
            {/* end of meal item */}
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      </section>

    </>



  )
}
export default Products;