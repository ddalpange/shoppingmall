import React from "react";

const WishItem = ({ item, selected, onSelect, onUnselect }) => {
  const { coverImage, title, price, id, availableCoupon } = item;
  return (
    <div className="card columns" style={{ marginBottom: "48px" }}>
      <div className="column is-paddingless">
        <img src={coverImage} className="image" alt="Placeholder Image" />
      </div>
      <div className="card-content column">
        <p className="title">{title}</p>
        <p className="subtitle has-text-primary is-3">
          {price ? price.withCommas() : 0}원{" "}
        </p>
        {availableCoupon === false && (
          <div className="has-text-danger">쿠폰 할인 불가</div>
        )}
        <label className="checkbox">
          <input
            type="checkbox"
            className="checkbox"
            checked={selected}
            value={selected}
            onChange={() => (selected ? onUnselect(id) : onSelect(id))}
          />
          &nbsp; 선택하기
        </label>
      </div>
    </div>
  );
};

export default WishItem;
