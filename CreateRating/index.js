var request = require('request');
var rp = require('request-promise-native');

var docObj = {
    "userId": "",
    "productId": "",
    "timestamp": new Date().toJSON().toString(),
    "locationName": "",
    "rating": 5,
    "userNotes": ""
}

module.exports = function (context, req) {

    if (!req.body || req.body.userId===undefined || req.body.productId===undefined || req.body.locationName===undefined || req.body.rating===undefined || req.body.userNotes===undefined ) {
        // doing it this way avoids the issue with rating=0 returning false when req.body.rating is being checked
        context.res = {
            status: 400,
            body: "Please post a userId, productId, locationName, rating and userNotes in the request body"
        };
        context.done();
    }
    else {
        var usrOptions = {
            uri: 'https://serverlessohlondonuser.azurewebsites.net/api/GetUser',
            qs: {
                userId: req.body.userId // -> uri + '?key=value'
            },
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true // Automatically parses the JSON string in the response
        };

        var productOptions = {
            uri: 'https://serverlessohlondonproduct.azurewebsites.net/api/GetProduct',
            qs: {
                productId: req.body.productId // -> uri + '?key=value'
            },
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true // Automatically parses the JSON string in the response
        };

        docObj.userId = req.body.userId;
        docObj.productId = req.body.productId;
        docObj.locationName = req.body.locationName;
        docObj.rating = req.body.rating;
        docObj.userNotes = req.body.userNotes;

        if (Number.isInteger(docObj.rating) && docObj.rating>=0 && docObj.rating<=5) {
            // rating is number between 0 and 5
            rp(usrOptions)
            .then(function (user) {
                if (docObj.userId==user.userId) {
                    // we have matched the user Id
                    console.log('User name', user.userName);
                    rp(productOptions)
                        .then(function (product) {
                            if (docObj.productId==product.productId) {
                                // we have matched the product Id
                                console.log('productName', product.productName);
                                console.log('productDescription', product.productDescription);
                                context.bindings.ratingsDocument = docObj;
                                context.res = {
                                    status: 200,
                                    body: JSON.stringify(docObj)
                                };
                                context.done();
                            }
                            else {
                                context.res = {
                                    status: 400,
                                    body: "productId "+docObj.productId+" not found"
                                };
                                context.done();
                            }
                        });
                }
                else {
                    context.res = {
                        status: 400,
                        body: "userId "+docObj.userId+" not found"
                    };
                    context.done();
                }
            });
        }
        else {
            context.res = {
                status: 400,
                body: "Please ensure rating is a number between 0 and 5"
            };
            context.done();
        }
    }
};