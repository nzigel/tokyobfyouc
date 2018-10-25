module.exports = async function (context, req) {
    var productId = context.bindingData.productId;

    if (productId) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "The product name for your product id " +productId+" is Starfruit Explosion"
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a productId on the query string or in the request body"
        };
    }
};