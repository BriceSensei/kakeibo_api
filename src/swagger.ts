import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.ts'], // Point to your route files
};

export const specs = swaggerJsdoc(options);
// test('should first', () => { second })