//Demonstrates making a POST request to Twitter Search.
//A headless script that makes a single request, and does not paginate with API supplied tokens.
//Has hardcoded search query. A more useful script would have this passed in ;)
//Write API response to console (system out).

var request = require("request")

//Twitter OAuth --- Application only, user context not required. 
var search_auth = {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET //,
    //token: process.env.ACCESS_TOKEN,
    //token_secret: process.env.ACCESS_TOKEN_SECRET
}

//Product details
var search_config = {
    url: "https://api.twitter.com/1.1/tweets/search/30day/",
    env: "dev"
}

// build request <-- input
var query = {
    "query": "#txleg -RT",
    "fromDate": 201905200000
}

// request options
var request_options = {
    //POST form with "body: query" below
    url: search_config['url'] + search_config['env'] + '.json',

    oauth: search_auth,
    json: true,
    headers: {
        'content-type': 'application/json'
    },
    body: query 
}

main()

async function main() {
    
    var response = await getTweets(request_options)
    var tweets = response.results
    
    await saveTweets(tweets)
    await pause(2)
    
    
    
    

    console.log(response)
    console.log(response.next||"no next");
    
}


function pause(seconds) {
    return new Promise((resolve) => {
        console.log(`Pausing ${seconds} seconds`)
        setTimeout( () => resolve(), 1000 * seconds)
    })
}

function saveTweets(tweets) {
    return new Promise ((resolve, reject) => {
        tweets.forEach( (tweet) => {
        
            var the_text
        
            if (tweet.truncated == true) {
                the_text = tweet.extended_tweet.full_text
            } else {
                the_text = tweet.text
            }
        
            console.log(the_text)
        
        })
        
        resolve(true)
        
    })
}


function getTweets(options) {
    return new Promise ((resolve, reject) => {
        
        // POST request
        request.post(options, function (error, response, body) {

            if (error) {
                console.log('Error making search request.')
                console.log(error)
                reject(error)
                return
            }
            
            resolve(body)

        })
        
    })
}

