const passport = require('passport');
const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth');
const axios = require('axios');
const boom = require('@hapi/boom');

const { config } = require('../../../config');

passport.use(
    new GoogleStrategy({
        clientID: config.googleClientId,
        clientSecret: config.googleClientSecret,
        callbackURL: "/auth/google/callback"
    }),
    async function (accessToken, refreshToken, {_json: profile}, cb){
        const { data, status } = await axios({
            url: `${config.apiUrl}/api/auth/sign-provider`,
            method: 'post',
            data: {
                name: profile.name,
                emial: profile.email,
                password: profile.sub,
                apiKeyToken: config.apiKeyToken
            }
        })

        if(!data || status !== 200){
            return cb(boom.unauthorized(), false)
        }
            
        return cb(null, data)

    }
)