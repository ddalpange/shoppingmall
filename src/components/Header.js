import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="Header navbar has-shadow is-spaced is-primary">
      <div className="container">
        <div className="navbar-brand" style={{ fontSize: "35px" }}>
          쇼핑몰
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link className="button is-white" to="/products">
                상품목록
              </Link>
              <Link className="button is-white" to="/wishlist">
                장바구니
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
