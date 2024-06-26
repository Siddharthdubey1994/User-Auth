const fastify = require('fastify')();
const { mongoConnection } = require('./database/MongoDb')
// const fastifyAuthMiddleware = require('fastify-auth-middleware');
const dotenv = require('dotenv');

dotenv.config();


// fastify.register(fastifyAuthMiddleware);
fastify.register(require('./routes/userRoutes'));

// const { MONGODB_URI, PORT } = process.env;

const start = async() => {
    try {
        await mongoConnection();
        
        fastify.listen(process.env.PORT, (err)=>
        {
            if (err) throw err;
            console.log(`Server is running on http://localhost:${process.env.PORT}`);
          
        });
    } catch (error) {
        fastify.log.error(error)
        
    }
}

start()