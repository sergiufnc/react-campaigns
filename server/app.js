require('dotenv').config()

const express = require('express')
const knexfile = require('./knexfile')
const knex = require('knex')(knexfile)
const request = require('request-promise')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const moment = require('moment')

const app = express()

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

app.get('/api', async (req, res) => {
    var result = await request({
        headers: {
            'Authorization': 'cvR6HzKV6pp8vvIYNAbE3ZagbE9h9Fo4mygV0Yy3',
            'API-Key': 'cvR6HzKV6pp8vvIYNAbE3ZagbE9h9Fo4mygV0Yy3',
            'X-API-Key': 'cvR6HzKV6pp8vvIYNAbE3ZagbE9h9Fo4mygV0Yy3'
        },
        uri: 'https://esobbc6302.execute-api.eu-west-1.amazonaws.com/default',
        method: 'GET'
    });

    console.log(result)

    return res.json({
        ok: true
    })
});

app.all('/api/add-campaign', async (req, res) => {
    var campaign = req.body.campaign

    var campaignInsert = await knex('campaigns').insert({
        name: campaign.name,
        startDate: moment(campaign.startDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        endDate: moment(campaign.endDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        targetImpressions: campaign.targetImpressions
    })

    return res.json({
        id: campaignInsert[0]
    })
});

app.get('/api/get-campaigns', async (req, res) => {
    var campaigns = await knex('campaigns').orderBy('id', 'desc')

    return res.json({
        campaigns: campaigns
    })
});

app.get('/api/get-campaign/{id}', async (req, res) => {
    var campaign = await knex('campaigns').where('id', req.params.id).first()

    return res.json({
        campaign: campaign
    })
});


app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
});

app.listen(8000);