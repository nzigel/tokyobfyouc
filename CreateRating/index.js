var rp = require('request-promise-native');
const uuidv4 = require('uuid/v4');

module.exports = async function (context, req) {

    if (!req.body || req.body.userId===undefined || req.body.productId===undefined || req.body.locationName===undefined || req.body.rating===undefined || req.body.userNotes===undefined ) {
        // doing it this way avoids the issue with rating=0 returning false when req.body.rating is being checked
        context.res = {
            status: 422,
            body: "Please post a userId, productId, locationName, rating and userNotes in the request body"
        };
    }
   else {
        var statusCode = 200;
        var bodyStr = "";
        var validUser = false;
        var validProduct = false;
        var validNum = true;
        
        if (!Number.isInteger(req.body.rating) || req.body.rating<0 || req.body.rating>5) {
            validNum = false;
            statusCode = 422;
            bodyStr+='Please provide a numeric rating between 0 and 5\n';
        }

        try
        {
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
            user = await rp(usrOptions);
            validUser = true;
            console.log('User name', user.userName);
        }
        catch(err){
            statusCode = 422;
            bodyStr+='Invalid UserId : ' + req.body.userId+'\n'  ;   
        }

        try
        {
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
            product = await rp(productOptions);
            validProduct = true;
            console.log('productName', product.productName);
            console.log('productDescription', product.productDescription);
        }
        catch(err){
            statusCode = 422
            bodyStr+='Invalid ProductId : ' + req.body.productId+'\n'     
        }

        if (validNum && validUser && validProduct) {
            var docObj = {
                "id": uuidv4(),
                "userId": req.body.userId,
                "productId": req.body.productId,
                "timestamp": new Date().toISOString(),
                "locationName": req.body.locationName,
                "rating": req.body.rating,
                "userNotes": req.body.userNotes
            }

            context.bindings.ratingsDocument = docObj;
            statusCode = 200;
            bodyStr = context.bindings.ratingsDocument;
        }

        context.res = {
            status: statusCode,
            body: bodyStr
        };
    }

};