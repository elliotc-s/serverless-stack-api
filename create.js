import * as uuid from "uuid";
import handler from "./libs/handler-lib";       // It’s important to note that the handler-lib.js needs to be imported before we import anything else. This is because we’ll be adding some error handling to it later that needs to be initialized when our Lambda function is first invoked.
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => { // wrapped by the handler(..) function
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      // The attributes of the item to be created
      userId: "123", // The id of the author
      noteId: uuid.v1(), // A unique uuid
      content: data.content, // Parsed from request body
      attachment: data.attachment, // Parsed from request body
      createdAt: Date.now(), // Current Unix timestamp
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});