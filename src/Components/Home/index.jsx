import { Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

import "./index.css";

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-heading">
          Your One-Stop Shop for Everything You Love.
        </h1>
        <img
          src="https://plus.unsplash.com/premium_photo-1672883551901-caa4758abba7?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="clothes that get you noticed"
          className="home-mobile-img"
        />
        <p className="home-description">
          Discover the latest trends in fashion, tech, and lifestyle. Shop top
          brands at unbeatable prices every day. Fast delivery, easy returns,
          and secure checkout. From essentials to exclusive finds – we’ve got it
          all. Enjoy exciting deals and everyday low prices. Your perfect
          shopping experience starts here. Fresh finds drop daily — ready when
          you are. Shopping made simple, fun, and totally worth it!
        </p>
        <Link to="/products">
          <button type="button" className="shop-now-button">
            Shop Now
          </button>
        </Link>
      </div>
      <img
        src="https://plus.unsplash.com/premium_photo-1672883551901-caa4758abba7?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="clothes that get you noticed"
        className="home-desktop-img"
      />
    </div>
    <Footer />
  </>
);

export default Home;
