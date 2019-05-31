import React, { Component } from 'react';
import axios from 'axios';

export default class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {
        id: '',
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
        color: '',
      },
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const thisProduct = `${window.location.origin}/api/v1/product/${id}`;

    axios
      .get(thisProduct)
      .then(res => {
        this.setState({ product: res.data });
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  render() {
    const { product } = this.state;

    return (
      <div className="container">
        <h3 className="ptitle mt-30">Produce Detail</h3>
        <div className="row mt-50">

          <div className="col-md-5">
            <div className="product-description">
              <div className="image">
                <img className="productImage" src={product.image} alt="productImage" />
              </div>
            </div>
          </div>

          <div className="col-md-7">
            <div className="p30">
              <div>
                <label htmlFor="id">Product ID:</label>
                <p className="id">{product.serialNum}</p>
              </div>

              <div>
                <label htmlFor="id">Product Name:</label>
                <p> {product.name}</p>
              </div>

              <div>
                <label htmlFor="price">Price:</label>
                <p className="price">N{product.price}</p>
              </div>

              <div>
                <label htmlFor="description">Product Description:</label>
                <p className="description">{product.description}</p>
              </div>

              <div>
                <label htmlFor="category">Product Category:</label>
                <p className="category">{product.category}</p>
              </div>

              <div>
                <label htmlFor="color">Color:</label>
                <div className="color-holder2" style={{ backgroundColor: product.color }} />
              </div>
            </div>
            {/* back button */}
            <a href="/">Go To Product List</a>
          </div>
        </div>
      </div>
    );
  }
}
