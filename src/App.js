import React, { Component } from "react";
import Header from "./generic/Header";
import Footer from './generic/Footer'
class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default App;
