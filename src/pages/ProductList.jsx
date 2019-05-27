import React, { Component, Fragment } from 'react';
import ReactDatatable from '@ashvin27/react-datatable';

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
      products:[]
    };
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
        <ReactDatatable config={this.config} records={this.state.records} columns={this.columns} />
      </div>
    );
  }
}
