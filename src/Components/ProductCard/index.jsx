import { Link } from "react-router-dom";
import "./index.css";

const ProductCard = (props) => {
  const { productData } = props;
  const { title, image, rating, price, id } = productData;

  const ratingValue = typeof rating === "object" ? rating.rate : rating;

  return (
    <li className="product-item">
      <Link to={`/products/${id}`} className="link-item">
        <img src={image} alt="product" className="thumbnail" />
        <h1 className="title">{title}</h1>
        <div className="product-details">
          <p className="price">Rs {price}/-</p>
          <div className="rating-container">
            <p className="rating">{ratingValue}</p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="star"
            />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ProductCard;
