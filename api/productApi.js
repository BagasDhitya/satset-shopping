const { Product } = require("../models");

exports.handler = async (event, context) => {
  const { httpMethod, queryStringParameters } = event;

  if (httpMethod === "GET") {
    if (queryStringParameters.id) {
      try {
        const product = await Product.findByPk(queryStringParameters.id);
        if (!product) {
          return {
            statusCode: 404,
            body: JSON.stringify({ error: "Product not found" }),
          };
        }
        return {
          statusCode: 200,
          body: JSON.stringify(product),
        };
      } catch (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: "Failed to retrieve product" }),
        };
      }
    } else {
      try {
        const products = await Product.findAll();
        return {
          statusCode: 200,
          body: JSON.stringify(products),
        };
      } catch (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: "Failed to retrieve products" }),
        };
      }
    }
  } else if (httpMethod === "POST") {
    const { name, price, description } = JSON.parse(event.body);
    try {
      const product = await Product.create({ name, price, description });
      return {
        statusCode: 200,
        body: JSON.stringify(product),
      };
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Failed to create product" }),
      };
    }
  } else if (httpMethod === "PUT") {
    const { id } = queryStringParameters;
    const { name, price, description } = JSON.parse(event.body);
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: "Product not found" }),
        };
      }
      await product.update({ name, price, description });
      return {
        statusCode: 200,
        body: JSON.stringify(product),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to update product" }),
      };
    }
  } else if (httpMethod === "DELETE") {
    const { id } = queryStringParameters;
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: "Product not found" }),
        };
      }
      await product.destroy();
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Product deleted successfully" }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to delete product" }),
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: "Method not allowed" }),
  };
};
