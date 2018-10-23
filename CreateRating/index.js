module.exports = async function (context, req) {

    if (req.body && req.body.userId && req.body.productId && req.body.locationName && req.body.rating && req.body.userNotes) {

        context.bindings.ratingsDocument = req.body;

        // Success.
        context.res = {
            status: 200
        };
    }
    else {
        context.res = {
            status: 400,
            body: "The query options 'name' and 'task' are required."
        };
    }
};