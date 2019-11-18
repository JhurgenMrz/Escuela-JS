const express = require('express')
const MoviesService = require('../services/movies')
const { movieIdSchema, createMovieSchema, updateMovieSchema } = require('../utils/schemas/movies')
const validationHandler = require('../utils/middleware/validationHandler')
const cacheResponse = require('../utils/cacheResponse')
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../utils/time')
const passport = require('passport')
//JWT Strategy
require('../utils/auth/strategies/jwt')

function moviesApi(app) {
    const router = express.Router();
    app.use('/api/movies', router);

    const moviesService = new MoviesService()




    router.get('/', passport.authenticate('jwt', { session: false }), async function (req, res, next) {
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS)
        const { tag } = req.query

        try {
            const movies = await moviesService.getMovies({ tag })
            res.status(200).json({
                data: movies,
                message: "movies listed"
            })
        } catch (err) {
            next(err)
        }
    })
    router.get('/:movieId', passport.authenticate('jwt', { session: false }), validationHandler({ movieId: movieIdSchema }, 'params'), async function (req, res, next) {
        cacheResponse(res, SIXTY_MINUTES_IN_SECONDS)
        const { movieId } = req.params

        try {
            const movies = await moviesService.getMovie({ movieId })

            res.status(200).json({
                data: movies,
                message: "movies retrived"
            })
        } catch (err) {
            next(err)
        }
    })
    router.post('/', passport.authenticate('jwt', { session: false }), validationHandler(createMovieSchema), async function (req, res, next) {

        const { body: movie } = req
        try {
            const createMovieId = await moviesService.createMovie({ movie })

            res.status(200).json({
                data: createMovieId,
                message: "movies create"
            })
        } catch (err) {
            next(err)
        }
    })
    router.put('/:movieId', passport.authenticate('jwt', { session: false }), validationHandler({ modieId: movieIdSchema }, 'params'), validationHandler(updateMovieSchema), async function (req, res, next) {
        const { movieId } = req.params
        const { body: movie } = req
        try {
            const updatedMovieId = await moviesService.updateMovie({ movieId, movie })

            res.status(200).json({
                data: updatedMovieId,
                message: "movies updated"
            })
        } catch (err) {
            next(err)
        }
    })
    router.delete('/:movieId', passport.authenticate('jwt', { session: false }), validationHandler({ movieId: movieIdSchema }, 'params'), async function (req, res, next) {
        const { movieId } = req.params

        try {
            const deletedMovie = await moviesService.deleteMovie({ movieId })

            res.status(200).json({
                data: deletedMovie,
                message: "movies deleted"
            })
        } catch (err) {
            next(err)
        }
    })
}

module.exports = moviesApi