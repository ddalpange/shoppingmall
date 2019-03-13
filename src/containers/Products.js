import React, { Component } from "react";
import ProductItem from "../components/ProductItem";
import Paginator from "../components/Paginator";
import { connect } from "react-redux";
import { pushWishlist, popWishlist } from "../redux/actions";

class Products extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  state = {
    pageIndex: 0,
    countPerPage: 5
  };

  paginate(pageIndex) {
    this.setState({
      pageIndex: pageIndex
    });
  }

  get sortedItems() {
    return this.props.productItems.sort((prev, next) => {
      return parseInt(next.score) - parseInt(prev.score);
    });
  }

  get slicedItems() {
    return this.sortedItems.slice(
      this.state.pageIndex * this.state.countPerPage,
      (this.state.pageIndex + 1) * this.state.countPerPage
    );
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">상품 목록</h1>
          {this.slicedItems.map(item => (
            <ProductItem
              item={item}
              key={item.id}
              includedWishlist={this.props.wishlist
                .map(wish => wish.id)
                .includes(item.id)}
              onPushWishlist={this.props.onPushWishlist}
              onPopWishlist={this.props.onPopWishlist}
            />
          ))}
          <Paginator
            totalItemLength={this.props.productItems.length}
            pageIndex={this.state.pageIndex}
            countPerPage={this.state.countPerPage}
            paginate={pageIndex => this.paginate(pageIndex)}
          />
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPushWishlist: product => dispatch(pushWishlist(product)),
    onPopWishlist: product => dispatch(popWishlist(product))
  };
};

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    productItems: state.productItems,
    wishlist: state.wishlist
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
