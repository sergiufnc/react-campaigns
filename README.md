# Getting started
This project gives an overall feeling of how I start new projects and my way to materialise a single-page app. 


**/client** - built on React. The project consists of 2 pages, a list of campaigns and the page of a campaign that you can edit. 

In terms of design, I added to the webpack a sass library I used in the past: http://kube7.imperavi.com/

To run, go to the directory, and:
1. yarn install
2. npm run start
3. open in browser http://localhost:3000


**/server** - built on ExpressJs.
To run, go to the directory, and:
1. yarn install
2. npm run start
3. open in browser http://localhost:8000

It has an sqlite database by default, so there should be already some data by default.

# Full-Stack Test Task
Since we're an advertising company this task is about managing advertising campaigns (in a very simplified way).
Our goal is to see how you decide to implement the features, what design choices you made and why. Don't make it
complicated, but do be prepared to talk about what you did and how it might work in production. Consider things like
performance, resource usage, scalability and security. What could you improve upon (and how)?

But above all, first make it work. Then make it better.

# What you need to implement
There are 4 things you need to implement:

- A page to add new campaigns (with at least 1 unit test)
- A page to show the status of existing campaigns
- A /api/add-campaign endpoint (with at least 1 unit test) which your page above calls
- A /api/get-campaigns endpoint which your page above calls

So you need to do some front-end UI code, some back-end API code, and your API will in turn call our 
AdServer API as detailed below.

Implement it however you like. This is your chance to flex.

# AdServer API
The 3rd party AdServer API is available at the following URL endpoint:

    https://esobbc6302.execute-api.eu-west-1.amazonaws.com/default

You must authenticate by passing a unique API key which will have been given to you as part of the test.
To pass this to the API add a header *X-API-Key* with the value of the key you were given.

These are the API methods available:

### Add campaign
POST x-www-form-urlencoded data to /campaigns with the following fields:

- id = a unique id for the campaign (string)
- startDate = start date for the campaign as UTC milliseconds (int)
- endDate = end date for the campaign as UTC milliseconds (int)
- targetImpressions = total number of ad impressions you want delivered (int)

Returns the id of the campaign as JSON if created successfully.

### Get campaign
GET /campaigns/{id} where id is the id of campaign (string)

Returns the campaign details as JSON.

### Get all campaigns
GET /campaigns/*

Returns an array of campaign details as JSON.

# Questions
Feel free to ask any questions you like. Collaboration is good.