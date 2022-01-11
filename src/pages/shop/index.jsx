import { Component } from "react";
import PreviewCollection from "../../components/preview-collection";
import SHOP_DATA from "./shop";

class Shop extends Component {
  constructor() {
    super();

    this.state = {
      collections: SHOP_DATA,
    };
  }

  render() {
    const { collections } = this.state;

    return (
      <div className="shop-page">
        {collections.map(({ id, ...collection }) => (
          <PreviewCollection key={id} {...collection} />
        ))}
      </div>
    );
  }
}

export default Shop;
