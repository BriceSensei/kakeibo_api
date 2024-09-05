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
                url: 'http://localhost:8080',
               
            },
            {
                url: 'http:35.181.38.238:8080',
               
            }
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
                },
                userRoute:{
                    type: 'object',
                    required:['name', 'firstName', 'lastName', 'email', 'password'],
                    properties:{
                        name:{
                            type:'string',
                            description: 'user pseudo',
                        },
                        firstName:{
                            type:'string',
                            description: 'user firstName',
                        },
                        lastName:{
                            type:'string',
                            description: 'user lastName',
                        },
                        email:{
                            type:'string',
                            description: 'user email',
                        },
                        password:{
                            type:'string',
                            description: 'user password',
                        },
                        creattionDate:{
                            type:'string',
                            format:'date',
                            description:'date of the creation user',
                        },
                        updateDate:{
                            type:'string',
                            format:'date',
                            description:'The date when the user was last updated',
                        },
                        passwordUpdateDate:{
                            type:'string',
                            description: 'the date when the password was last updated',
                        },
                        lastLoginDate:{
                            type:'string',
                            format:'date',
                            description:'The date when the user was last login',
                        },
                        connectionAttempts:{
                            type:'integer',
                            description:'connection attempts',
                        },
                        isActive:{
                            type:'boolean',
                            description:"active account",
                        },
                        roleId:{
                            type:'integer',
                            description: "role id",
                        },
                        currencyId:{
                            type:'integer',
                            description: "currency id",
                        },
                       
                    },              
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
