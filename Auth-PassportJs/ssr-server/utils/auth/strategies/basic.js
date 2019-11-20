const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const axios = require('axios');
const { config } = require('../../../config');

passport.use(
    new BasicStrategy(async function(email, password, cb){
        try {
            const { data, status } = await axios({
                url: `${config.apiUrl}/api/auth/sign-in`,
                method: 'post',
                auth: {
                    password,
                    username: email
                },
                data: {
                    apiKeyToken: '1f99f4ebbb22bb77eeb46a3112042636239cd50f78585f029f826646244f2088'
                }
            })

            if(!data || status !== 200){
                return cb(boom.unauthorized(), false);
            }

            cb(null, data)

        } catch (error) {
            cb(error)
        }
    })
)