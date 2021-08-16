import { CfnOutput } from "@aws-cdk/core";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as sst from "@serverless-stack/resources";

export default class DynamoDBStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const app = this.node.root;

    const table = new dynamodb.Table(this, "Table", {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST, // Use on-demand billing mode
      sortKey: { name: "noteId", type: dynamodb.AttributeType.STRING },
      partitionKey: { name: "userId", type: dynamodb.AttributeType.STRING },
    });

    /*
    https://serverless-stack.com/chapters/configure-dynamodb-in-cdk.html
        We need to use the table name in our API.
        Also, we’ll use the table ARN to ensure that our Lambda functions have access to this table.
        We don’t want to hardcode these values. So we’ll use a CloudFormation export, using the CfnOutput method with the exportName option.
        We’ll later import these values in our API using cross-stack references.
        The output names need to be unique per stack.
        While the exportName needs to be unique for a given region in the AWS account.
        To ensure that it’ll be unique when we deploy to multiple environments, we’ll use the app.logicalPrefixedName method.
        It’s a convenience method in sst.App that prefixes a given name with the name of the stage (environment) and the name of the app.
        We’ll use this method whenever we need to ensure uniqueness across environments.
    */
    // Output values
    new CfnOutput(this, "TableName", {
      value: table.tableName,
      exportName: app.logicalPrefixedName("TableName"),
    });
    new CfnOutput(this, "TableArn", {
      value: table.tableArn,
      exportName: app.logicalPrefixedName("TableArn"),
    });
  }
}