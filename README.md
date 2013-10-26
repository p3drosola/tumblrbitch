### Getting started

#### Tumblr API keys
To begin, you'll need to [register a tumblr application](http://www.tumblr.com/oauth/apps).

Copy your Oauth consumer key, and consumer secret, and export them as environment variables.

    export CONSUMER_KEY=Dasdasdasdasdp983f8uqner8fnqer8f
    export CONSUMER_SECRET=9j8g97hqe87fhq8er7hg87erhg87hqer87hgqerg

#### Database

The app uses a Mongodb database for persistence. So you can start the mongodb server with `mongod`

#### Running

run `node tumblrbitch`


### Deploying

The app is prepared to be deployed to heroku. You'll need the mongolab addon. And the same environment variables as above.
