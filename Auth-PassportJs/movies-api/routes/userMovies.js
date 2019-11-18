const express = require('express');
const UserMovieService = require('../services/userMovies');
const validationHandler = require('../utils/middleware/validationHandler');

const { movieIdScheam } = require('../utils/schemas/movies');
const { userIdSchema } = require('../utils/schemas/users');
const { createUserMovieSchema } = require('../utils/schemas/userMovies');

function userMoviesApi(app) {
    const router = express.Router();

    app.use('/api/user-movies', router);

    const userMoviesService = new UserMovieService();

    router.get('/', validationHandler({ userId: userIdSchema }, 'query'), async function (req, res, next) {
        const { userId } = req.query;
        try {
            const userMovies = await userMoviesService.getUserMovies({ userId });
            res.status(200).json({
                data: userMovies,
                message: 'user movies listed'
            })
        } catch (error) {
            next(error)
        }
    })

    router.post('/', validationHandler(createUserMovieSchema), async function(req, res,next){
        const { body: userMovie } = req;

        try{
            const createdUserMovieId = await userMoviesService.createUserMovie({
                userMovie
            })

            res.status(201).json({
                data: createdUserMovieId,
                message: 'user movie created'
            })
        }catch(err){
            next(err)
        }

    })


    router.delete('/:userMovieId', validationHandler({ userMovieId: movieIdScheam}, 'params'), async function(req, res, next){
        const { userMovieId } = req.params;

        try{
            const deletedUserMovieId = await userMoviesService.deleteUserMovie({
                userMovieId
            }) 

            res.status(200).json({
                data: deletedUserMovieId,
                message: 'user movie deleted'
            })
        }catch(err){
            next(err)
        }
    })


}


module.exports = userMoviesApi