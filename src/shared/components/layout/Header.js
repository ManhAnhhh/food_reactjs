import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  

  const totalCart = useSelector(({Cart})=> {
    return Cart.carts.reduce((total, item)=> total + item.qty, 0)
  })
  const navigate = useNavigate();

  const [keyWord, setKeyWord] = useState("");
  const onChangeText = (e) => {
    setKeyWord(e.target.value);
  }
  const onKeyPress = (e) => {
    if (e.key === "Enter")
      return navigate(`/search?keyword=${keyWord}`);
  }
  const onClickBtnSearch = () => {
    return navigate(`/search?keyword=${keyWord}`);
  }
  return (
    <>
      <header>
        <Link to="/" className="logo"><i className="fa fa-utensils" />Foodies.</Link>
        <div className="meal-search-box">
          <input onChange={onChangeText} onKeyDown={onKeyPress} type="text" value={keyWord} className="search-control" placeholder="Enter a meal" id="search-input" />
          <button onClick={onClickBtnSearch} type="submit" className="search-btn btn" id="search-btn">
            <i className="fas fa-search" />
          </button>
        </div>
        <div className="icons">
          <i className="fas fa-bars" id="menu-bars" />
          <a href="#" className="fas fa-heart heart" />
          <Link to="/cart" className="fas fa-shopping-cart cart"><sup>{totalCart}</sup></Link>
          <i className="fa fa-user" aria-hidden="true" />
          <a href="login.html" className="fas fa-sign-in-alt" />
        </div>
      </header>
      <nav className="navbar">
        <Link className="active" to="/">Home</Link>
        <Link to="/">Dishes</Link>
        <Link to="#">About</Link>
        <Link to="./contact.html">Contact Us</Link>
        <Link className="feed" id="feedback">Feedback</Link>
        <Link to="#">Orders</Link>
      </nav>
    </>
  )
}
export default Header;