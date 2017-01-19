module.exports = function() {
    var Crawler = require("crawler");
    var url = require('url');
    var sendmail = require('sendmail')();
    var sinchSms = require('sinch-sms')({
        key: '93c2416c-5537-4b17-abbd-ae25763541be', 
        secret: 'zsrmRY43VkmWeTl6koeBxQ=='
    });
    
    var c = new Crawler({
        maxConnections : 10,
        // This will be called for each crawled page 
        callback : function (error, res, done) {
            if(error){
                console.log(error);
            }else{
                var $ = res.$;
                console.log($("title").text());
            }
            done();
        }
    });

    const uri = 'https://www.privatbo.dk/?id=95';
    const message = "privatbo klar til tilmeldinger: https://www.privatbo.dk/?id=95"
    
    c.queue([{
        uri,
        jQuery: false,
        callback: function (error, res, done) {
            if(error) {
                console.log(error);
            } else {
                // for production
                const notOpenString = "STATUS:&nbsp;Det er i&nbsp;&oslash;jeblikket&nbsp;ikke&nbsp;muligt at blive opnoteret."
                // for testing
                const tester = "DERRRRRRRB"
                const htmlCode = res.body.indexOf(tester);

                // no match send message
                if(htmlCode === -1){
                    sinchSms.send('004531605317', message).then(function(response) {
                        console.log(response);
                    }).fail(function(error) {
                        console.log(error);
                    });
                }
            }
            done();
        }
    }]);
}
