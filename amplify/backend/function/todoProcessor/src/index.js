const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const { typeName, fieldName, arguments: args, identity } = event;

    switch (typeName) {
        case 'Query':
            switch (fieldName) {
                case 'processTodos':
                    return await processTodos(args, identity);
                default:
                    throw new Error(`Unknown field ${fieldName} on type ${typeName}`);
            }
        case 'Mutation':
            switch (fieldName) {
                case 'completeTodo':
                    return await completeTodo(args, identity);
                default:
                    throw new Error(`Unknown field ${fieldName} on type ${typeName}`);
            }
        default:
            throw new Error(`Unknown type ${typeName}`);
    }
};

async function processTodos(args, identity) {
    // Логика обработки todos
    return {
        message: "Todos processed successfully",
        count: args.limit || 10
    };
}

async function completeTodo(args, identity) {
    // Логика завершения todo
    return {
        id: args.id,
        completed: true,
        message: "Todo completed successfully"
    };
}
