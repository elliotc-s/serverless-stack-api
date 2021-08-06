import AWS from "aws-sdk";

const client = new AWS.DynamoDB.DocumentClient();

// https://serverless-stack.com/chapters/add-a-create-note-api.html:
// Here we are creating a convenience object that exposes the DynamoDB client methods that we are going to need in this guide.

export default {
  get: (params) => client.get(params).promise(),
  put: (params) => client.put(params).promise(),
  query: (params) => client.query(params).promise(),
  update: (params) => client.update(params).promise(),
  delete: (params) => client.delete(params).promise(),
};