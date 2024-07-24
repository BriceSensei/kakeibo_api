import budgetLineRoute from '@routeBudgetLineRoute';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Kakeibo API',
            version: '1.0.0',
            description: 'API documentation for Kakeibo',
        },
        servers:[
            {
                url: 'http://localhost:3000',
               
            }, 
        ],
        
        components: {
            securitySchemes: {
                bearerAuth: {
                  type: 'http',
                  scheme: 'bearer',
                  bearerFormat: 'JWT',
                },
            },
            parameters: {
                limit: {
                    name: 'limit',
                    in: 'query',
                    required: false,
                    schema: {
                        type: 'integer',
                        description: 'Limit the number of budget lines to display',
                    },
                },
                order: {
                    name: 'order',
                    in: 'query',
                    required: false,
                    schema: {
                        type: 'string',
                        enum: ['asc', 'desc'],
                        description: 'Sort order (asc or desc)',
                    },
                },
                begin: {
                    name: 'begin',
                    in: 'query',
                    required: false,
                    schema: {
                        type: 'string', // Date-time should be a string in ISO 8601 format
                        format: 'date',
                        description: 'Filter budget lines from this start date',
                    },
                },
            },
            schemas:{
                budgetLineRoute: {
                    type: 'object',
                    required:['userId', 'value', 'title', 'date', 'type', 'categoryId'],
                    properties:{
                        userId:{
                            type: 'integer',
                            description: "user id",
                        },
                        value:{
                            type:'number',
                            format: 'float',
                            description: 'the value of the expense',
                        },
                        title:{
                            type:'string',
                            description: 'the title of the expense',
                        },
                        description:{
                                type:'string',
                                description:'the description of the expense',
                        },
                        date:{
                            type:'string',
                            format: 'date',
                            description:'date of the expense',
                        },
                        type:{
                            type:'string',
                            description:'type of the expense (expense or income)',
                        },
                        frequencyId:{
                            type:'integer',
                            description:'The frequency of the expense',
                        },
                        categoryId:{
                            type:'integer',
                            description:'The category of the expense',
                        },
                        subCategoryId:{
                            type:'integer',
                            description:'the subCategory of the expense',
                        },
                        updateDate:{
                            type:'string',
                            format:'date',
                            description:'The date when the expense was last updated',
                        },
                        creationDate:{
                            type:'string',
                            format:'date-time',
                            description:'The date when the expense was created',
                        }
                    },
                    example: {
                        userId: 62,
                        value: 20,
                        title:"Test",
                        type:"outcome",
                        categoryId: 41
                    }
                }
            },
            responses:{
                400: {
                    description: 'Bad Request - Invalid input data',
                    content: {
                      'application/json': {
                        schema: {
                          type: 'object',
                          properties: {
                            message: {
                              type: 'string',
                            },
                          },
                        },
                      },
                    },
                  },        
                  401: {
                    description: 'Unauthorized - Authentication failed or token expired',
                    content: {
                      'application/json': {
                        schema: {
                          type: 'object',
                          properties: {
                            message: {
                              type: 'string',
                            },
                          },
                        },
                      },
                    },
                  },            
                404: {
                    description: 'Not Found - The resource was not found',
                    content: {
                      'application/json': {
                        schema: {
                          type: 'object',
                          properties: {
                            message: {
                              type: 'string',
                            },
                          },
                        },
                      },
                    },
                  },
            }
        },
        security:[
            {
                bearerAuth:[],
            },
        ],
       
    },
    apis: ['./src/routes/*.ts'], // Point to your route files
};

export const specs = swaggerJsdoc(options);