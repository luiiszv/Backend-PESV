import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'PESV API',
            version: '1.0.0',
            description: 'API for PESV with multiple modules',
            contact: {
                name: 'Luis Martinez',
            },
        },
        tags: [
            {
                name: 'Auth',
                description: 'Endpoints related to authentication',
            },
            {
                name: 'PESV',
                description: 'Endpoints related to PESV operations',
            },
        ],
        servers: [
            {
                url: 'https://backend-pesv.vercel.app',
                description: 'Production server',
            },
            {
                url: 'http://localhost:4000',
                description: 'Local development server',
            },
        ],
    },
    apis: ['./src/Auth/routes/*.js', './src/PESV/routes/*.js'], // Rutas de los módulos
};

const specs = swaggerJsdoc(options);
export default specs;
