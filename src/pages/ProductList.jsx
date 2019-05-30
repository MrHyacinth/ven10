import React, { Component, Fragment } from 'react';
import ReactDatatable from '@ashvin27/react-datatable';
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
    const {products} = this.state;
    console.log(products);
    return (
      <div>
        <a href="/create">
          <button className="btn btn-primary" style={{ margin: '10px 0px 20px 0px' }}>
            New Product
          </button>
        </a>

        <div className="container">
          <div className="row">

          {
            products.map( (product,index) => 
            <a href={`/detail/${product._id}`}>
              <div className="col-md-4 col-sm-4 col-xs-12" key={index}>
                  <div className="product-holder">
                  <div className="product-image">
                    </div>
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
