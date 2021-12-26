const appConfig = require("../config/app.config");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const logger = require('../logger')

async function getEventDetails(url, access_token) {
    try {
        const resp = await axios.get(url, {
            headers: {
              'Authorization': "Bearer " + access_token
            }
        });
        logger.info(`Event Details: ${JSON.stringify(resp.data)}`);
        console.log(resp.data);
        return resp.data;
    } catch (err) {
        // Handle Error Here
        logger.error(`Error accessing token from appdirect: ${JSON.stringify(err)}`);
        console.error(err);
    }
};

async function getAccessTokenForEventDetails() {
    try {
        let url = appConfig.MARKETPLACE_TOKEN_ENDPOINT + "?grant_type=client_credentials&scope=ROLE_APPLICATION"
        const resp = await axios.post(url, {}, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            auth: {
                username: appConfig.REMAX_IN_OUT_BOUND_CLIENT_ID,
                password: appConfig.REMAX_IN_OUT_BOUND_CLIENT_SECRET
            }
        });
        // console.log(resp.data.access_token);
        logger.info(`Access token from appdirect: ${JSON.stringify(resp.data.access_token)}`);
        return resp.data.access_token
    } catch (err) {
        // Handle Error Here
        logger.error(`Error accessing token from appdirect: ${JSON.stringify(err)}`);
        console.error(err);
    }
};

async function createHireAivaAccount(
    email, full_name, company, phone, city, state, street1
) {
    
    var d = new Date();
    var n = d.getMinutes();
    const tempemail = "TestUser" + n + "@test.net"
    var data ={
        name: full_name,
        mailing_address: { city: city, state: state, line1: street1 },
        company: company,
        phone: phone,
        timezone: "America/New_York",
        email: tempemail,
    }

    logger.info(
        `aiva data: ${JSON.stringify(data)}`
    );

    let url = "https://aiva.hireaiva.com/api/v1/accounts/",
    headers = {
        "Authorization": "Token ZHkCSsSZ9FP5pYcKBuLAQ8uXwQZ9FS2F",
        "Content-Type": "application/json",
    }

    try {
        const response = await axios.post(url, data, {
            headers: headers
        })
        
        logger.info(`Response from hireaiva: ${JSON.stringify(response.data)}`)
        

        return response;
    } catch (err) {
        logger.error(`Error from hireaiva: ${JSON.stringify(err.response.data)}`)
        return err;
    }

    
}

function loginAiva(sid) {
    timestamp = new Date().getTime();
    console.log('login:', sid)
    const token = generateAccessToken({
        iat: timestamp,
        jti: Math.random().toString(),
        user_id: sid,
    });

    var url = `https://leads.browsinghomes.com/auth/jwt/callback/?jwt=${token}&provider=${appConfig.PROVIDER_KEY}`;
    return url;
    window.location.replace(url)
}

function generateAccessToken(username) {
    return jwt.sign(username, appConfig.SECRET_KEY);
}

module.exports = {
    getEventDetails, getAccessTokenForEventDetails, createHireAivaAccount, loginAiva
}