import React from "react";

const ProductItem = ({
  item,
  includedWishlist,
  onPushWishlist,
  onPopWishlist
}) => {
  const { coverImage, title, price } = item;
  return (
    <div className="card columns" style={{ marginBottom: "48px" }}>
      <div className="column is-paddingless">
        <img src={coverImage} className="image" alt="Placeholder Image" />
      </div>
      <div className="card-content column">
        <p className="title">{title}</p>
        <p className="subtitle has-text-primary is-3">
          {price ? price.withCommas() : 0}원
        </p>
        {includedWishlist ? (
          <button
            className="button is-medium"
            onClick={() => onPopWishlist(item)}
          >
            장바구니에서 빼기
          </button>
        ) : (
          <button
            className="button is-primary is-medium"
            onClick={() => onPushWishlist(item)}
          >
            장바구니에 담기
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
