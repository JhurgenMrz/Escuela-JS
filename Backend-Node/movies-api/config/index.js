require('dotenv').config()

const config  = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 3000,
    cors: process.env.env.CORS,
    dbUser: process.env.env.DB_USER,
    dbPassword: process.env.env.DB_PASSWORD,
    dbHost: process.env.env.DB_HOST,
    dbName: process.env.env.DB_NAME
}

module.exports = { config }