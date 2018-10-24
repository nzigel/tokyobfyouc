module.exports = async function (context, req, ratingsDocument) {
    if (!ratingsDocument)
    {
        context.res = {
            status: 422,
            body: "No rating found with id "+req.query.id
        }
    }
    else
    {
        outputDocument = {
            "id": ratingsDocument.id,
            "userId": ratingsDocument.userId,
            "productId": ratingsDocument.productId,
            "timestamp": ratingsDocument.timestamp,
            "locationName": ratingsDocument.locationName,
            "rating": ratingsDocument.rating,
            "userNotes": ratingsDocument.userNotes
        }
        context.res = {
            body: outputDocument
        };
    }
};