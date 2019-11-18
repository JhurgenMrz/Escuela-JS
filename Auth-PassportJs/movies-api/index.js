const express = require('express');
const app = express();
const morgan = require('morgan')
const cors = require('cors')

const { config } = require('./config/index');
const moviesApi = require('./routes/movies.js')
const userMoviesApi = require('./routes/userMovies')
const authApi = require('./routes/auth')

const {
    wrapError,
    logErrors,
    errorHandler
    
} = require('./utils/middleware/errorHandlers')

const notFoundHandler = require('./utils/middleware/notFoundHandler')

//Midleware
app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

//routes
authApi(app)
moviesApi(app)
userMoviesApi(app)

// Catch 404
app.use(notFoundHandler)

//Error middleware
app.use(logErrors)
app.use(wrapError)
app.use(errorHandler)

app.listen(config.port, function(){
    const debug = require('debug')('app:server')
    debug(`Listening http://localhost:${config.port}`); //eslint-disable-line
})