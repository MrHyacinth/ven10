import React from 'react';

export default function ProductAdd() {
  return (
    <form>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Product name"
          aria-describedby="basic-addon1"
        />
      </div>

      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Description"
          aria-describedby="basic-addon2"
        />
      </div>

      <div className="input-group">
        <input 
        type="text" 
        className="form-control" 
        placeholder="Price"
        aria-label="Amount (to the nearest dollar)" />
      </div>

       <div className="input-group">
        <input 
        type="text" 
        className="form-control" 
        placeholder="Category"
        aria-label="Amount (to the nearest dollar)" />
      </div>

        <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Image"
          aria-describedby="basic-addon2"
        />
      </div>

       <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Color"
          aria-describedby="basic-addon2"
        />
      </div>

    </form>
  );
}
