import React, { Component } from "react";
import { connect } from "react-redux";
import WishItem from "../components/WishItem";

class Wishlist extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    selectedIdMaps: {},
    selectedCoupon: null
  };

  componentWillMount() {
    this.setState({
      selectedIdMaps: this.props.wishlist.reduce((result, item) => {
        result[item.id] = true;
        return result;
      }, {})
    });
  }

  onSelect(id) {
    this.setState({
      selectedIdMaps: {
        ...this.state.selectedIdMaps,
        [id]: true
      }
    });
  }

  onUnselect(id) {
    this.setState({
      selectedIdMaps: {
        ...this.state.selectedIdMaps,
        [id]: false
      }
    });
  }

  get amount() {
    const { wishlist } = this.props;
    const { selectedIdMaps, selectedCoupon } = this.state;
    const selectedProducts = wishlist.filter(item => selectedIdMaps[item.id]);
    const discountableProducts = selectedProducts.filter(
      item => item.availableCoupon !== false
    );

    const total = selectedProducts.reduce(
      (result, item) => result + item.price,
      0
    );

    let discount = 0;

    if (selectedCoupon) {
      const totalAvailableCouponAmount = discountableProducts.reduce(
        (result, item) => result + item.price,
        0
      );

      if (selectedCoupon.type === "rate") {
        discount = Math.floor(
          totalAvailableCouponAmount * (selectedCoupon.discountRate / 100)
        );
      } else {
        discount =
          totalAvailableCouponAmount > 0 ? selectedCoupon.discountAmount : 0;
      }
    }

    return {
      total: total ? total : 0,
      discount: discount ? discount : 0,
      result: discount ? total - discount : total
    };
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">장바구니</h1>
          {this.props.wishlist.map(item => (
            <WishItem
              item={item}
              key={item.id}
              selected={this.state.selectedIdMaps[item.id]}
              onSelect={id => this.onSelect(id)}
              onUnselect={id => this.onUnselect(id)}
            />
          ))}
          <div className="card">
            <div className="card-content">
              <div className="is-3">쿠폰</div>
              <div className="select">
                <select
                  name=""
                  id=""
                  onChange={$event =>
                    this.setState({
                      selectedCoupon: this.props.coupons[$event.target.value]
                    })
                  }
                >
                  <option value={null}>사용 안함</option>
                  {this.props.coupons.map((coupon, i) => (
                    <option value={i} key={coupon.title}>
                      {coupon.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="is-3">총 금액</div>
              <strong>{this.amount.total.withCommas()}원</strong>
              <div className="is-3">할인 금액</div>
              <strong>{this.amount.discount.withCommas()}원</strong>
              <div className="is-3">결제할 금액</div>
              <strong>{this.amount.result.withCommas()}원</strong>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    productItems: state.productItems,
    wishlist: state.wishlist,
    coupons: state.coupons
  };
};

export default connect(mapStateToProps)(Wishlist);
