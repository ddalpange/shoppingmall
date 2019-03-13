import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Products from "./containers/Products";
import Wishlist from "./containers/Wishlist";
import store from "./redux";
import { Provider } from "react-redux";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Switch>
              <Route exact path="/" redirectTo="products" />
              <Route path="/products" component={Products} />
              <Route path="/wishlist" component={Wishlist} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
