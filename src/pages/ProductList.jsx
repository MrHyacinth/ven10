import React, { Component, Fragment } from 'react';
import ReactDatatable from '@ashvin27/react-datatable';
import axios from 'axios';

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        key: 'id',
        text: 'ID',
        className: 'id',
        align: 'left',
        sortable: true,
      },
      {
        key: 'name',
        text: 'Name',
        className: 'name',
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
                onClick={() => this.viewDetail(record)}
                style={{ marginRight: '5px' }}
              >
                View details
              </button>
            </Fragment>
          );
        },
      },
    ];
    this.config = {
      page_size: 10,
      length_menu: [10, 20, 50],
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
