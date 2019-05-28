import React, { Component } from 'react';
import axios from 'axios';

export default class ProductAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const serialNum = event.currentTarget.serialNum.value;
    const name = event.currentTarget.name.value;
    const description = event.currentTarget.description.value;
    const price = event.currentTarget.price.value;
    const color = event.currentTarget.color.value;
    const category = event.currentTarget.category.value;
    const image = event.currentTarget.image.value;

    const url = `${window.location.origin}/api/v1/products`;

    axios
      .post(url, { serialNum, name, description, price, category, image, color })
      .then(result => {
        console.log(result);
        window.location.href="/";
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  render() {
    return (
      <div className="container parent">
        
        <form onSubmit={this.handleSubmit}>
        <h4> Add A New Product</h4>
        
        <div className="input-group">
            <input
              name="serialNum"
              type="number"
              className="form-control"
              placeholder="Product ID"
              required
              // aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group">
            <input
              name="name"
              type="text"
              className="form-control"
              placeholder="Product name"
              required
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group">
            <input
              name="description"
              type="text"
              className="form-control"
              placeholder="Description"
              required
              aria-describedby="basic-addon2"
            />
          </div>

          <div className="input-group">
            <input
              name="price"
              type="number"
              className="form-control"
              placeholder="Price"
              required
              aria-label="Amount (to the nearest dollar)"
            />
          </div>

          <div className="input-group">
            <input
              name="category"
              type="text"
              className="form-control"
              placeholder="Category"
              required
              aria-label="Amount (to the nearest dollar)"
            />
          </div>

          <div className="input-group">
            <input
              name="image"
              type="text"
              className="form-control"
              placeholder="Image"
              required
              aria-describedby="basic-addon2"
            />
          </div>

          <div className="input-group">
            <input
              name="color"
              type="text"
              className="form-control"
              placeholder="Color"
              required
              aria-describedby="basic-addon2"
            />
          </div>

          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>

  
    );
  }
}
