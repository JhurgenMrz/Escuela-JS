const passport = require('passport');
const { Strategy: FacebookStrategy } = require('passport-facebook')
const axios = require('axios');
const boom = require('@hapi/boom')
const {get} = require('lodash')

const { config } = require('../../../config');

passport.use( new FacebookStrategy({
    clientID: config.facebookClientId,
    clientSecret: config.facebookClientSecret,
    callbackURL: "/auth/facebook/callback",
    profileFields: ["id","email","displayName"]
    },
    async function(accessToken, refeshToken, profile, done){

        
        console.log(profile);
        const { data, status } = await axios({
            url: `${config.apiUrl}/api/auth/sign-provider`,
            method: 'post',
            data: {
                name: profile.displayName,
                email: get(profile, 'emails.0.value', `${profile.id}@facebook.com`),
                password: profile.id,
                apiKeyToken: config.apiKeyToken,
            }
        })

        if(!data || status !== 200){
            return done(boom.unauthorized(),false)
        }

        return done(null, data)


    }

))