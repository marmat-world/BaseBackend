export default () => ({
    database: { 
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        db_name: process.env.DB_DATABASE 
    },
    jwt_secret: process.env.JWT_SECRET,
    redis: {
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
        port: process.env.REDIS_PORT,
        db: process.env.MYREDIS
    }
});