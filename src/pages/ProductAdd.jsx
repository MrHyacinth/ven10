import React, { Component } from 'react';
import axios from 'axios';

export default class ProductAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      loading: false,
      success: '',
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

    if (!image) {
      alert('Please select an image ');
      return;
    }

    const url = `${window.location.origin}/api/v1/products`;

    this.setState({ loading: true });

    axios
      .post(url, { serialNum, name, description, price, category, image, color })
      .then(result => {
        this.setState({ loading: false, success: 'product added' });

        setTimeout(() => {
          window.location.href = '/detail/' + result.data._id;
        }, 2000);
      })
      .catch(error => {
        this.setState({ loading: false, error: 'error in creating product' });

        console.log(error.response);
      });
  }

  render() {
    const { loading, error, success } = this.state;
    return (
      <div className="container parent">
        <div>
          {error ? error : ''}
          {success ? success : ''}

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
              <select name="category" type="text" className="form-control" required>
                <option value="" selected>
                  Select A Category
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>

            <div className="input-group">
              <div class="cc-selector">
                <input id="sneakers" type="radio" name="image" value="sneakers.jpg" />
                <label class="drinkcard-cc sneakers" for="sneakers" />
                <input id="sneakers1" type="radio" name="image" value="sneakers1.jpg" />
                <label class="drinkcard-cc sneakers1" for="sneakers1" />
                <input id="watch1" type="radio" name="image" value="watch1.jpg" />
                <label class="drinkcard-cc watch1" for="watch1" />
              </div>
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

            <button disabled={loading} className="btn btn-primary" type="submit">
              {loading ? 'Creating product ...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    );
  }
}
