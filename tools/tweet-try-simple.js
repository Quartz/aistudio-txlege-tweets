const Twit = require('twit');

// const screen_names = ['narendramodi', 'RahulGandhi', 'BJP4India', 'INCIndia', 'arunjaitley', 'AmitShah', 'priyankagandhi']

var bot_consumer_key = process.env.CONSUMER_KEY
var bot_consumer_secret = process.env.CONSUMER_SECRET
var bot_access_token = process.env.ACCESS_TOKEN
var bot_access_token_secret = process.env.ACCESS_TOKEN_SECRET

// var bot = {}
// bot.data = {}
// bot.data['theBigSandbox'] ={
//     likes: 0,
//     likes_array: [],
//     friends: 0,
//     friends_array: [],
//     followers_count: 41
// }
// 
// bot.actions = {
//     twitter: [],
//     slack:[]
// }

var T = new Twit({
    consumer_key: bot_consumer_key,
    consumer_secret: bot_consumer_secret,
    access_token: bot_access_token,
    access_token_secret: bot_access_token_secret,
    timeout_ms: 60*1000,  // optional HTTP request timeout to apply to all requests.
});

T.get('tweets/search/30day/dev.json', { q: '#txlege AND -is:retweet', count: 100 }, function(err, data, response) {
    console.log(data)
})

// const screen_names = Object.keys(bot.data)

//// Deets: https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-favorites-list
// T.get('favorites/list', { screen_name: screen_names },  function (err, data, response) {
//     console.log(data)
// })

// T.get('followers/ids', { screen_name: screen_names },  function (err, data, response) {
//     console.log(data)
// })

// // https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friends-ids
// T.get('friends/ids', { screen_name: screen_names },  function (err, data, response) {
//     console.log(data)
// })


// // https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friends-ids
// T.get('users/lookup', { user_id: [ "2943657457","2273523122","176101985","116356889" ] },  function (err, data, response) {
//     if (err) {
//         console.log(err)
//     }
//     console.log(data)
// })

// var lookupthese = ["theBigSandbox","narendramodi","RahulGandhi","OmarAbdullahxbxbxb","Swamy39","Mayawati"]
// 
// T.get('users/lookup', { screen_name: lookupthese },  function (err, data, response) {
//     if (err) {
//         console.log(err)
//     }
//     console.log(data)
// })

// 
/// Deets: https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-users-lookup



function checkUsers(screen_names) {
    return new Promise ((resolve, reject) => {
        T.get('users/lookup', { screen_name: screen_names },  function (err, data, response) {
            if (err) { reject(err) }
            if (response.statusCode != 200) { reject(response.statusCode) }
            resolve(data)
        })
    })
}

function checkUsersById(ids) {
    return new Promise ((resolve, reject) => {
        T.get('users/lookup', { user_id: ids },  function (err, data, response) {
            if (err) { reject(err) }
            if (response.statusCode != 200) { reject(response.statusCode) }
            resolve(data)
        })
    })
}

function checkFavorites(name) {
    return new Promise ((resolve, reject) => {
        T.get('favorites/list', { screen_name: name, count: 50 },  function (err, data, response) {
            if (err) { reject(err) }
            if (response.statusCode != 200) { reject(response.statusCode) }
            resolve(data);
        })
    })
}

function checkFriends(name) {
    return new Promise ((resolve, reject) => {
        T.get('friends/ids', { screen_name: name },  function (err, data, response) {
            if (err) { reject(err) }
            if (response.statusCode != 200) { reject(response.statusCode) }
            resolve(data);
        })
    })
}

function IdsToUsers(ids) {
    return new Promise ((resolve, reject) => {
        
        if (!ids || ids.length < 1) {
            console.log("Called IdsToUsers but passed no ids to check.")
            resolve(response_string)
        }
        
        
        var response_string = ""
        
        console.log(`Checking user info for ids: ${ids}`)
        
        if (ids.length > 50) {
            console.log("Too many user ids. Stopping.")
            reject()
        }   
            
        T.get('users/lookup', { user_id: ids },  function (err, data, response) {
            if (err) { 
                console.log(err)
                resolve(` ${ids.length} deleted user(s)`)
            }
            
            if (response.statusCode != 200) { reject(response.statusCode) }
            
            for (var m in data) {
                response_string += ` @${data[m].screen_name}`
            }
            
            resolve(response_string)
        })
    })
}
