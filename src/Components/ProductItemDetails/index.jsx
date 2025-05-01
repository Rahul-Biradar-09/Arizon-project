import { Component } from "react";
import { OrbitProgress } from "react-loading-indicators";
import { BsPlusSquare, BsDashSquare } from "react-icons/bs";
import CartContext from "../../context/CartContext";
import Header from "../Header";
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class ProductItemDetails extends Component {
  state = {
    productData: {},
    apiStatus: apiStatusConstants.initial,
    quantity: 1,
  };

  componentDidMount() {
    this.getProductData();
  }

  getFormattedData = (data) => ({
    category: data.category,
    description: data.description,
    id: data.id,
    image: data.image,
    price: data.price,
    rating: data.rating?.rate ?? 0,
    title: data.title,
    totalReviews: data.rating?.count ?? 0,
  });

  getProductData = async () => {
    const { productId } = this.props;
    this.setState({ apiStatus: apiStatusConstants.inProgress });

    const apiUrl = `https://fakestoreapi.com/products/${productId}`;

    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const fetchedData = await response.json();
        const updatedData = this.getFormattedData(fetchedData);
        this.setState({
          productData: updatedData,
          apiStatus: apiStatusConstants.success,
        });
      } else {
        throw new Error("Failed to fetch");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      this.setState({ apiStatus: apiStatusConstants.failure });
    }
  };

  onDecrementQuantity = () => {
    this.setState((prevState) => ({
      quantity: prevState.quantity > 1 ? prevState.quantity - 1 : 1,
    }));
  };

  onIncrementQuantity = () => {
    this.setState((prevState) => ({ quantity: prevState.quantity + 1 }));
  };

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <OrbitProgress color="#0080ff" size="small" />
    </div>
  );

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <button type="button" className="button" onClick={this.getProductData}>
        Retry
      </button>
    </div>
  );

  renderProductDetailsView = () => (
    <CartContext.Consumer>
      {({ addCartItem }) => {
        const { productData, quantity } = this.state;
        const {
          description,
          image,
          price,
          rating,
          title,
          totalReviews,
        } = productData;

        const onClickAddToCart = () => {
          addCartItem({ ...productData, quantity });
        };

        return (
          <div className="product-details-success-view">
            <div className="product-details-container">
              <img src={image} alt="product" className="product-image" />
              <div className="product">
                <h1 className="product-name">{title}</h1>
                <p className="price-details">Rs {price}/-</p>
                <div className="rating-and-reviews-count">
                  <div className="rating-container">
                    <p className="rating">{rating}</p>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                      alt="star"
                      className="star"
                    />
                  </div>
                  <p className="reviews-count">{totalReviews} Reviews</p>
                </div>
                <p className="product-description">{description}</p>
                <hr className="horizontal-line" />
                <div className="quantity-container">
                  <button
                    type="button"
                    className="quantity-controller-button"
                    onClick={this.onDecrementQuantity}
                    data-testid="minus"
                  >
                    <BsDashSquare className="quantity-controller-icon" />
                  </button>
                  <p className="quantity">{quantity}</p>
                  <button
                    type="button"
                    className="quantity-controller-button"
                    onClick={this.onIncrementQuantity}
                    data-testid="plus"
                  >
                    <BsPlusSquare className="quantity-controller-icon" />
                  </button>
                </div>
                <button
                  type="button"
                  className="button add-to-cart-btn"
                  onClick={onClickAddToCart}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        );
      }}
    </CartContext.Consumer>
  );

  renderProductDetails = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      case apiStatusConstants.inProgress:
        return this.renderLoadingView();
      default:
        return null;
    }
  };

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderProductDetails()}
        </div>
      </>
    );
  }
}

export default ProductItemDetails;
