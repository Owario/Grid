import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    encoding: 'utf-8',
    failOnErrors: false,
    format: '',
    swaggerDefinition: {},
    definition: {
        swagger: '2.0',
    },
    apis: ['./routes.js'],
    servers: [{ url: '/api' }],
    info: {
        title: 'API',
        version: '1.0.0',
    },
};

const docs = swaggerJSDoc(options);

export default docs;