import { Link } from "react-router-dom";

const Banner = () => {

  return (
    <div className="add">
      <div className="add-container">
        <img src="./Images/burger banner.jpg" alt />
        <div className="textimg">
          <h2>
            30% off on your<br />
            first order
          </h2>
          <Link to="/"><button className="ordr">Order Now</button></Link>
        </div>
      </div>
    </div>
  )
}
export default Banner;