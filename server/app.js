require('dotenv').config()

const express = require('express')
const knexfile = require('./knexfile')
const knex = require('knex')(knexfile)
const request = require('request-promise')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const moment = require('moment')
const uniqid = require('uniqid');

const app = express()

const API_KEY = 'cvR6HzKV6pp8vvIYNAbE3ZagbE9h9Fo4mygV0Yy3'

app.use(cookieParser());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/api/test', async (req, res) => {
    var result = await request({
        headers: {
            'x-api-key': API_KEY,
        },
        uri: 'https://esobbc6302.execute-api.eu-west-1.amazonaws.com/default/campaigns/5d726ac54dab6921b69addcc',
        method: 'GET'
    });

    //console.log(result)

    return res.json(result)
});

app.post('/api/save-campaign', async (req, res) => {
    var campaign = req.body.campaign

    if (
        !campaign.startDate || campaign.startDate === 'Invalid date' ||
        !campaign.endDate || campaign.endDate === 'Invalid date' ||
        !campaign.targetImpressions
    ) {
        return res.status(400).json('Please fill our all the required fields.')
    }

    var result = await request({
        headers: {
            'x-api-key': API_KEY,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            id: uniqid(),
            startDate: moment(campaign.startDate, 'DD/MM/YYYY').valueOf(),
            endDate: moment(campaign.endDate, 'DD/MM/YYYY').valueOf(),
            targetImpressions: campaign.targetImpressions
        },
        uri: 'https://esobbc6302.execute-api.eu-west-1.amazonaws.com/default/campaigns',
        method: 'POST',
        json: true
    });

    return res.json(result)
});

app.get('/api/get-campaigns', async (req, res) => {
    var results = await request({
        headers: {
            'x-api-key': API_KEY,
        },
        uri: 'https://esobbc6302.execute-api.eu-west-1.amazonaws.com/default/campaigns/*',
        method: 'GET',
        json: true
    });

    results.sort((a, b) => {
        return b.endDate - a.endDate
    })

    return res.json({
        campaigns: results
    })
});

app.get('/api/get-campaign/:id', async (req, res) => {
    var result = await request({
        headers: {
            'x-api-key': API_KEY,
        },
        uri: 'https://esobbc6302.execute-api.eu-west-1.amazonaws.com/default/campaigns/' + req.params.id,
        method: 'GET',
        json: true
    });

    return res.json({
        campaign: result
    })
});


app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
});

app.listen(8000);
