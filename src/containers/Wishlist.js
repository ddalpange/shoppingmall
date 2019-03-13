import React, { Component } from "react";
import { connect } from "react-redux";
import WishItem from "../components/WishItem";

class Wishlist extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    wishlist: [],
    selectedCoupon: null
  };

  componentWillMount() {
    this.setState({
      wishlist: this.props.wishlist.map(item => ({
        ...item,
        selected: true,
        count: 1
      }))
    });
  }

  onChangeSelected(index, value) {
    const wishlist = [...this.state.wishlist];
    console.log(index, value);
    wishlist[index].selected = value;
    this.setState({ wishlist });
  }

  onChangeCount(index, value) {
    const wishlist = [...this.state.wishlist];
    wishlist[index].count = value;
    this.setState({ wishlist });
  }

  get amount() {
    const { selectedCoupon, wishlist } = this.state;

    const selectedProducts = wishlist.filter(item => item.selected);

    const discountableProducts = selectedProducts.filter(
      item => item.availableCoupon !== false
    );

    const total = selectedProducts.reduce(
      (result, item) => result + item.price * item.count,
      0
    );

    let discount = 0;

    if (selectedCoupon) {
      const totalAvailableCouponAmount = discountableProducts.reduce(
        (result, item) => result + item.price * item.count,
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
          {this.state.wishlist.map((item, i) => (
            <WishItem
              item={item}
              key={item.id}
              index={i}
              onChangeSelected={(index, value) =>
                this.onChangeSelected(index, value)
              }
              onChangeCount={(index, value) => this.onChangeCount(index, value)}
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
