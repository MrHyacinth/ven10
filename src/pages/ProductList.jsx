import React, { Component } from 'react';
import axios from 'axios';

export default class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    const endpoint = `${window.location.origin}/api/v1/products`;

    axios
      .get(endpoint)
      .then(result => {
        this.setState({ products: result.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  viewDetail(record) {
    window.location.href = '/detail/' + record._id;
  }

  render() {
    const { products } = this.state;

    return (
      <div>
        <div>
          <div className="container">
            <div className="row header-and-button">
              <div className="mleft">
                <h3>Product List </h3>
              </div>
              <div className="mright">
                <a href="/create">
                  <button className="btn btn-primary" style={{ margin: '10px 0px 20px 0px' }}>
                    + New Product
          </button>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">

            {
              products.map((product, index) =>
                <a href={`/detail/${product._id}`}>
                  <div className="col-md-4 col-sm-4 col-xs-12" key={index}>
                    <div className="product-holder">
                      <div className="product-image" style={{ backgroundImage: `url(${product.image})` }} />
                      <p>ID: <span>{product.serialNum}</span></p>
                      <p>Name: <span>{product.name}</span></p>
                      <p>Price: <span>{product.price}</span></p>
                    </div>
                  </div>
                </a>
              )
            }
          </div>
        </div>
      </div>

    );
  }
}
