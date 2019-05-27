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

    const name = event.currentTarget.name.value;
    const description = event.currentTarget.description.value;
    const price = event.currentTarget.price.value;
    const color = event.currentTarget.color.value;
    const category = event.currentTarget.category.value;
    const image = event.currentTarget.image.value;

    const url = `${window.location.origin}/api/v1/products`;
    // const data = this.state;

    axios
      .post(url, { name, description, price, color, category, image })
      .then(result => {
        console.log(result);
        window.location.href="/";
        //this.setState({ data: result });
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  render() {
    return (
      <div className="container">
        <p> Add A Product</p>
        <form onSubmit={this.handleSubmit}>
          <div className="input-group">
            <input
              name="name"
              required
              type="text"
              className="form-control"
              placeholder="Product name"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group">
            <input
              name="description"
              required
              type="text"
              className="form-control"
              placeholder="Description"
              aria-describedby="basic-addon2"
            />
          </div>

          <div className="input-group">
            <input
              name="price"
              required
              type="number"
              className="form-control"
              placeholder="Price"
              aria-label="Amount (to the nearest dollar)"
            />
          </div>

          <div className="input-group">
            <input
              required
              name="category"
              type="text"
              className="form-control"
              placeholder="Category"
              aria-label="Amount (to the nearest dollar)"
            />
          </div>

          <div className="input-group">
            <input
              name="image"
              required
              type="text"
              className="form-control"
              placeholder="Image"
              aria-describedby="basic-addon2"
            />
          </div>

          <div className="input-group">
            <input
              name="color"
              required
              type="text"
              className="form-control"
              placeholder="Color"
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
