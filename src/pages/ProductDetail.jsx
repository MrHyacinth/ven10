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
      <section className="section-wrap productsDetail pb-40">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="image-gallery">
                <div className="col-md-3">
                  <div className="mini-gallery-item" />
                  <div className="mini-gallery-item" />
                  <div className="mini-gallery-item" />
                </div>
                <div className="col-md-9 main-gallery-holder">
                  <div className="main-gallery-item" />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="product-description">
              <div className="id">{product.ID}</div>
                <h3> {product.name}</h3>

                <div>
                  <h2 className="price">N{product.price}</h2>
                </div>
                <div>
                  <h3 className="description">{product.description}</h3>
                </div>
                <div className="category">{product.category}</div>
                <div className="category">{product.image}</div>
                <div className="category">{product.color}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
// }
