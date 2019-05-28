## Ven10 Test ##
*https://ven10.herokuapp.com*

A simple Product inventory web app based on Node (server), data storage with MongoDb and React.js on the front end. 

Create a product by filling out a simple form, select one of the provided sample product images. Form data is sent across to the api endpoint, on submit and data is then persisted to a database.

App consists of
- Create product
- View products datatable with search and filter feature
- Product detail view

## To run ##

first install all depenencies with `npm install`

Provision the following environment variables
- PORT=3030
- DEV_MONGO_URL=SAMPLE_MONGO_URL_GOES_HERE
- NODE_ENV=development

run `npm run serve` to start the application 


## To Test ##

> GET https://ven10.herokuapp.com/api/v1/products - returns all products.

> POST https://ven10.herokuapp.com/api/v1/products - creates a product item.

> GET https://ven10.herokuapp.com/api/v1/product/:id - return a product.

test id - 5ced575a0a63a600046ca8db
