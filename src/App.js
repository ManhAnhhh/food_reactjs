import { Provider } from "react-redux";
import store from "./redux-setup/store";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Header from "./shared/components/layout/Header";
import Footer from "./shared/components/layout/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Banner from "./shared/components/layout/Banner";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import ProducDetails from "./pages/ProductDetails";
import Login from "./pages/Login";

const App = () => {
  return (
    <Provider store = {store}>
      <BrowserRouter>
        
        <div>
          {/*Header*/}
          <Header />
          {/* Header ends*/}
          {/*Home section start*/}
          <section className="home" id="home-section">
            {/*Add*/}
            <Banner />
            {/*Add ends*/}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category-:c" element={<Products />} />
              <Route path="/search" element={<Search />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product-detail-:id" element={<ProducDetails />} />
            </Routes>
          </section>
          <div id="about" className="about">
            <a href="#" className="closebtn">×</a>
            <div className="about-overlay">
              <h1>About us</h1>
              <p>
                Launched in 2021, Our technology platform connects customers,<br />
                restaurant partners and delivery partners, serving their multiple
                needs. <br />
                Customers use our platform to search and discover restaurants, read
                and write customer generated reviews and view and upload photos,<br />
                order food delivery, book a table and make payments while dining-out
                at restaurants. On the other hand,<br />
                we provide restaurant partners with industry-specific marketing tools
                which enable them to engage and acquire customers<br />
                to grow their business while also providing a reliable <br />and
                efficient last mile delivery service. We also operate a one-stop
                procurement solution, <br />Hyperpure, which supplies high quality
                ingredients and kitchen products to restaurant partners.<br />
                We also provide our delivery partners with transparent and flexible
                earning opportunities.
              </p>
            </div>
          </div>

          {/*Footer Section*/}
          <Footer />
          {/*Home ends*/}
        </div>
      </BrowserRouter>
    </Provider>
  )
}
export default App;