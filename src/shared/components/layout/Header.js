import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';

const Header = ({ toggleModal, showIcon, setShowIconUser, setModalIsOpen }) => {
  const totalCart = useSelector(({ Cart }) => {
    return Cart.carts.reduce((total, item) => total + item.qty, 0)
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
  const logout = () => {
    setShowIconUser(false);
    localStorage.removeItem('userLogin');
    toast.success("Log out successfully");
    navigate("/");
  }

  // show modal login
  return (
    <>
      <header>
        <Link to="/" className="logo"><i className="fa fa-utensils" />Foodies.</Link>
        <div className="meal-search-box">
          <input onChange={onChangeText} onKeyDown={onKeyPress} type="text" value={keyWord} className="search-control" placeholder="Enter a meal" id="search-input" />
          <button onClick={onClickBtnSearch} type="submit" className="search-btn btn-s" id="search-btn">
            <i className="fas fa-search" />
          </button>
        </div>
        {
          (localStorage.getItem("userLogin")) ?
            <>
              <div className="user">Hello, {JSON.parse(localStorage.getItem("userLogin")).username}</div>
              <div className="icons">
                <span><i className="fa fa-user" aria-hidden="true" /></span>
                <Link to="/cart" className="fas fa-shopping-cart cart"><sup>{totalCart}</sup></Link>
                <span onClick={logout}><i className="fas fa-sign-in-alt"></i></span>
              </div>
            </> : false

        }
        {
          (!showIcon && !localStorage.getItem("userLogin")) ?
            <div id="form">
              <input onClick={toggleModal} id="sign-up" type="button" value="Log in" />
            </div> : true
        }
      </header>
      <nav className="navbar">
        <Link className="active" to="/">Home</Link>
        <span onClick={() => setModalIsOpen(true)}><Link to="#">About</Link></span>
        <a href="#categories">Orders</a>
      </nav>

    </>
  )
}
export default Header;