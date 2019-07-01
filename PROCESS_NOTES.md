# Process Notes

## Twitter API Deets:

Using the IndiaElectionBot account

Premium pricing (essentially free for sandbox): https://developer.twitter.com/en/pricing/search-30day Free tier:

- 100 tweets/request
- 10 requests/second
- 30 requests/minute
- 250 requests/month

    Instructions here: https://developer.twitter.com/en/docs/tweets/search/api-reference/premium-search

Search operators by tier: https://developer.twitter.com/en/docs/tweets/rules-and-filtering/overview/operators-by-product

Developer docs page: https://developer.twitter.com/en/docs

## Tweets in Google Sheets

- Turned on an IFTTT recipe to put any #txlege tweet into a spreadsheet
- Got 13 spreadsheets with 2000 rows each (includes retweets)
- Wrote `gsheet_tweets.js` to turn original tweets (no retweets) into a big text corpus called `tweet_corpus.txt`
- Uses Tabletop.js so the process is:
    - Use "Publish to web ..." in Google sheets
    - Leave settings as is and click Publish
    - IGNORE THE PUBLISH URL and close the publish box
    - Click on "Sharing"
    - Use link sharing URL
    - Type `node gsheet_tweets.js [url]`
    - IE: `node gsheet_tweets.js https://docs.google.com/spreadsheets/d/1Z4RLOarLV2WIS9TckGgTodrdLwo0uiLQiCL9a48cDvo/edit?usp=sharing`
    
    