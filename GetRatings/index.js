function stripInternalProperties(res) {
    // strip off the internal documentDB properties
    if(res.hasOwnProperty('_rid')){
        delete res['_rid'];
    }
    if(res.hasOwnProperty('_self')){
        delete res['_self'];
    }
    if(res.hasOwnProperty('_etag')){
        delete res['_etag'];
    }
    if(res.hasOwnProperty('_attachments')){
        delete res['_attachments'];
    }
    if(res.hasOwnProperty('_ts')){
        delete res['_ts'];
    }
    return res;
}

module.exports = async function (context, req) {
    //var outputDocuments=[];
    var documents = context.bindings.documents;
    for (var i = 0; i < documents.length; i++) {
        //var document = documents[i];
        documents[i] = stripInternalProperties(documents[i]);
        //outputDocuments.push({
        //    "id": document.id,
        //    "userId": document.userId,
        //    "productId": document.productId,
        //    "timestamp": document.timestamp,
        //    "locationName": document.locationName,
        //    "rating": document.rating,
        //    "userNotes": document.userNotes
        //})
    }   

    //if (outputDocuments.length==0)
    if (documents && documents.length>0)
    {
        context.res = {
           // body: outputDocuments
           body: documents
        };
    }
    else {
        context.res = {
            status: 422,
            body: "No ratings found for user "+req.query.userId
        }
    }
};