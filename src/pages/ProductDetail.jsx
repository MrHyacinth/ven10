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
        console.log(res.data);
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
        <div className="row mt-60">
          <div className="col-md-5">
            <div className="product-description">
              <div className="image">
                <img className="productImage" src={`/img/${product.image}`} />
              </div>
            </div>
          </div>

          <div className="col-md-7">
            <div className="p30">
              <div>
                <label for="id">Product ID:</label>
                <p className="id">{product.serialNum}</p>
              </div>

              <div>
                <label for="id">Product Name:</label>
                <p> {product.name}</p>
              </div>

              <div>
                <label for="price">Price:</label>
                <p className="price">N{product.price}</p>
              </div>

              <div>
                <label for="description">Product Description:</label>
                <p className="description">{product.description}</p>
              </div>

              <div>
                <label for="category">Product Category:</label>
                <p className="category">{product.category}</p>
              </div>

              <div>
                <label for="color">Color:</label>
                <p className="category">{product.color}</p>
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
// }
