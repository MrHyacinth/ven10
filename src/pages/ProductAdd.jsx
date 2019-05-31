import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';

const CONFIG = {
  cloudName: 'divk5nutg',
  uploadPreset: 'urnzshuz',
};

export default class ProductAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      loading: false,
      success: '',
      cloudinaryWidget: '',
      productImage: '',
    };

    this.openCloudinaryWidget = this.openCloudinaryWidget.bind(this);
    this.initCloudinary = this.initCloudinary.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.initCloudinary();

    const colorList = [
      '000000',
      '993300',
      '333300',
      '003300',
      '003366',
      '000066',
      '333399',
      '333333',
      '660000',
      'FF6633',
      '666633',
      '336633',
      '336666',
      '0066FF',
      '666699',
      '666666',
      'CC3333',
      'FF9933',
      '99CC33',
      '669966',
      '66CCCC',
      '3366FF',
      '663366',
      '999999',
      'CC66FF',
      'FFCC33',
      'FFFF66',
      '99FF66',
      '99CCCC',
      '66CCFF',
      '993366',
      'CCCCCC',
      'FF99CC',
      'FFCC99',
      'FFFF99',
      'CCffCC',
      'CCFFff',
      '99CCFF',
      'CC99FF',
      'FFFFFF',
    ];

    const picker = $('#color-picker');

    for (let i = 0; i < colorList.length; i++) {
      picker.append(
        '<li class="color-item" data-hex="' +
        '#' +
        colorList[i] +
        '" style="background-color:' +
        '#' +
        colorList[i] +
        ';"></li>',
      );
    }

    $('body').click(function () {
      picker.fadeOut();
    });

    $('.call-picker').click(function (event) {
      event.stopPropagation();
      picker.fadeIn();
      picker.children('li').hover(function () {
        var codeHex = $(this).data('hex');

        $('.color-holder').css('background-color', codeHex);
        $('#pickcolor').val(codeHex);
      });
    });
  }

  initCloudinary() {
    try {
      const cloudinaryWidget = window.cloudinary.createUploadWidget(CONFIG, (err, res) => {
        if (!err && res && res.event === 'success') {
          const { url } = res.info;

          this.setState({ productImage: url });
        } else {
          this.setState({ error: err });
        }
      });

      this.setState({ cloudinaryWidget });
    } catch (ex) {
      console.log(ex.message);
    }
  }

  openCloudinaryWidget(event) {
    event.preventDefault();

    try {
      const { cloudinaryWidget } = this.state;

      cloudinaryWidget.open();
    } catch (ex) {
      console.log(ex.message);
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const name = event.currentTarget.name.value;
    const description = event.currentTarget.description.value;
    const price = event.currentTarget.price.value;
    const color = event.currentTarget.pickcolor.value;
    const category = event.currentTarget.category.value;
    const { productImage } = this.state;

    if (!productImage) {
      this.setState({ error: 'Please upload a product image' });
      return;
    }

    let num = '';
    const possible = '0123456789';

    for (let i = 0; i < 4; i++) num += possible.charAt(Math.floor(Math.random() * possible.length));

    const serialNum = num;

    const url = `${window.location.origin}/api/v1/products`;

    this.setState({ loading: true });

    axios
      .post(url, { serialNum, name, description, price, category, image: productImage, color })
      .then(result => {
        this.setState({ loading: false, success: 'Product Added' });

        setTimeout(() => {
          window.location.href = `/detail/${result.data._id}`;
        }, 2000);
      })
      .catch(error => {
        this.setState({ loading: false, error: 'Error in creating product' });

        console.log(error.response);
      });
  }

  render() {
    const { loading, error, success, productImage } = this.state;

    return (
      <div className="container parent">
        <div>
          {error ? (
            <div className="alert alert-danger">
              <strong style={{ paddingRight: '5px' }}>Error!</strong>
              {error}
            </div>
          ) : ''}

          {success ? (
            <div className="alert alert-success">
              <strong style={{ paddingRight: '5px' }}>Success!</strong>
              Product addedd successfully
            </div>
          ) : ''}

          <form onSubmit={this.handleSubmit}>

            <h4> Add A New Product</h4>

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
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="color-wrapper">
              {/* <p>Choose Color (# hex)</p> */}
              <input
                type="text"
                name="pickcolor"
                placeholder="Color"
                id="pickcolor"
                className="call-picker"
                required
              />
              <div className="color-holder call-picker" />
              <div className="color-picker" id="color-picker" style={{ display: 'none' }} />
            </div>

            <div className="input-group">
              <textarea
                name="description"
                type="text"
                rows="5"
                cols="30"
                className="form-control"
                placeholder="Description"
                required
                aria-describedby="basic-addon2"
              />
            </div>

            <div>
              {productImage ? <img src={productImage} alt="product" style={{ height: '100px', paddingBottom: '10px' }} /> : ''}
            </div>

            <div className="input-group">
              <button
                type="button"
                accept="image/png, image/jpg"
                className="form-control btn btn-primary"
                placeholder="Upload Image"
                required
                aria-describedby="basic-addon1"
                onClick={this.openCloudinaryWidget}
              >
                Upload Image
              </button>
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
