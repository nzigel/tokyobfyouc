module.exports = async function (context, req) {
    var outputDocuments=[];
    var documents = context.bindings.documents;
    for (var i = 0; i < documents.length; i++) {
        var document = documents[i];
        outputDocuments.push({
            "id": document.id,
            "userId": document.userId,
            "productId": document.productId,
            "timestamp": document.timestamp,
            "locationName": document.locationName,
            "rating": document.rating,
            "userNotes": document.userNotes
        })
    }   

    if (outputDocuments.length==0)
    {
        context.res = {
            status: 422,
            body: "No ratings found for user "+req.query.userId
        }
    }
    else
    {
        context.res = {
            body: outputDocuments
        };
    }
};