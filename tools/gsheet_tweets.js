// usage:
//   node gsheet_tweets.js <gsheet url> <optional sheet name>

// where <gsheet url> is the shared url described in the Tabletop docs
// here: https://github.com/jsoma/tabletop#1-publishing-your-google-sheet

//// note! The resulting file needs to be made csv-compliant
// - replace " with ""
// - wrap every line with "line"
// - add 'tweet_text' at top as title

const Tabletop = require('tabletop')
const fs = require('fs') 

let spreadsheet_published_url = process.argv[2]
let sheet_name = process.argv[3] || 'Sheet1'


getSpreadsheetData(spreadsheet_published_url, sheet_name)
    .then((sheet_data) => {
        
        // Example item:
        // sheet_data[0] =>
        // [ 'June 14, 2019 at 07:29AM', '@mariohune', 'RT @GregAbbott_TX: Today I signed a law that creates a fund to assist our communities after natural disasters and to match federal aid for future storms. \nThe law includes $1.6 billion in state aid for Harvey Harvey plus funding for flood projects.\n#txlege\n https://t.co/2DLipds1wR via @houstonchron', 'http://twitter.com/mariohune/status/1139495102806708224' ]
        
        console.log(`Got ${sheet_data.length} rows ...`)
        
        let text_block = ""
        
        for (var i = 0; i < sheet_data.length; i++) {
            
            let row = sheet_data[i];
            
            // skip retweets
            if (row[2].match(/^RT /)) {continue}
            
            // replace mid-tweet carriage returns with spaces
            let cleaned = row[2].replace(/\n/g, " ")
            
            // store one tweet per line
            text_block += cleaned + '\n'
            
        }
            
        fs.appendFile('tweet_corpus.txt', text_block, (err) => {
            if (err) throw err;
            console.log('The data was appended to file!');
        });
            
    })


function getSpreadsheetData(document_URL, sheet_name) {
    return new Promise((resolve, reject) => {
        
        var options = {
            key: document_URL,
            callback: onLoad, 
            simpleSheet: false
        };
        
        function onLoad(data, tabletop) {
            
            // if (data == "" || data == null || data == undefined) {
            //     reject("Error loading data");
            //     return;
            // }
            
            // resolve(tabletop.sheets(sheet_name).all());
            resolve(tabletop.sheets(sheet_name).toArray());
        }
        
        Tabletop.init(options);
        
    });
}


