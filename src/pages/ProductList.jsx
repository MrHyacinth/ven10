import React, { Component, Fragment } from 'react';
import ReactDatatable from '@ashvin27/react-datatable';
import axios from 'axios';

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        key: 'name',
        text: 'Name',
        className: 'name',
        align: 'left',
        sortable: true,
      },
      {
        key: 'description',
        text: 'Description',
        className: 'address',
        align: 'left',
        sortable: true,
      },
      {
        key: 'price',
        text: 'Price',
        className: 'postcode',
        sortable: true,
      },
      {
        key: 'category',
        text: 'Category',
        className: 'rating',
        align: 'left',
        sortable: true,
      },
      {
        key: 'image',
        text: 'Image',
        className: 'type_of_food',
        sortable: true,
        align: 'left',
      },
      {
        key: 'color',
        text: 'Color',
        className: 'type_of_food',
        sortable: true,
        align: 'left',
      },
      {
        key: 'action',
        text: 'Action',
        className: 'action',
        width: 100,
        align: 'left',
        sortable: false,
        cell: record => {
          return (
            <Fragment>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => this.editRecord(record)}
                style={{ marginRight: '5px' }}
              >
                <i className="fa fa-edit" />
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => this.deleteRecord(record)}>
                <i className="fa fa-trash" />
              </button>
            </Fragment>
          );
        },
      },
    ];
    this.config = {
      page_size: 10,
      length_menu: [10, 20, 50],
      button: {
        excel: true,
        print: true,
      },
    };

    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    const endpoint = `${window.location.origin}/api/v1/products`;

    axios
      .get(endpoint)
      .then(result => {
        console.log(result.data);
        this.setState({ products: result.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  editRecord(record) {
    console.log('Edit Record', record);
  }

  deleteRecord(record) {
    console.log('Delete Record', record);
  }

  render() {
    return (
      <div>
        <a href="/create">
          <button className="btn btn-primary" style={{ margin: '10px 0px 20px 0px' }}>
            New Product
          </button>
        </a>

        <ReactDatatable config={this.config} records={this.state.products} columns={this.columns} />
      </div>
    );
  }
}