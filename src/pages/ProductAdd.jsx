import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';

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

  componentDidMount() {
    var colorList = [
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
    var picker = $('#color-picker');

    for (var i = 0; i < colorList.length; i++) {
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

    $('body').click(function() {
      picker.fadeOut();
    });

    $('.call-picker').click(function(event) {
      event.stopPropagation();
      picker.fadeIn();
      picker.children('li').hover(function() {
        var codeHex = $(this).data('hex');

        $('.color-holder').css('background-color', codeHex);
        $('#pickcolor').val(codeHex);
      });
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let serialNum;
    const name = event.currentTarget.name.value;
    const description = event.currentTarget.description.value;
    const price = event.currentTarget.price.value;
    const color = event.currentTarget.pickcolor.value;
    const category = event.currentTarget.category.value;
    const image = event.currentTarget.image.value;

    if (!image) {
      alert('Please select an image ');
      return;
    }

    var num = '';
    var possible = '0123456789';

    for (var i = 0; i < 4; i++) num += possible.charAt(Math.floor(Math.random() * possible.length));

    serialNum = num;

   

    const url = `${window.location.origin}/api/v1/products`;

    this.setState({ loading: true });

    axios
      .post(url, { serialNum, name, description, price, category, image, color })
      .then(result => {
        this.setState({ loading: false, success: 'Product Added' });

        setTimeout(() => {
          window.location.href = '/detail/' + result.data._id;
        }, 2000);
      })
      .catch(error => {
        this.setState({ loading: false, error: 'Error in creating product' });

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
              </select>
            </div>

            <div className="input-group">
              <div class="cc-selector">
                <input id="sneakers" type="radio" name="image" value="sneakers.jpg" />
                <label class="drinkcard-cc sneakers" for="sneakers" />
                <input id="sneakers1" type="radio" name="image" value="sneakers1.jpg" />
                <label class="drinkcard-cc sneakers1" for="sneakers1" />
                <input id="watch1" type="radio" name="image" value="wwatch1.jpg" />
                <label class="drinkcard-cc watch1" for="watch1" />
              </div>
            </div>

            <div className="color-wrapper">
              <p>Choose Color (# hex)</p>
              <input
                type="text"
                name="pickcolor"
                placeholder="#FFFFFF"
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

            <button disabled={loading} className="btn btn-primary" type="submit">
              {loading ? 'Creating product ...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    );
  }
}
