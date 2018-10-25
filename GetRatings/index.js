var helper = require('../helper');

module.exports = async function (context, req) {
    let documents = context.bindings.documents;
    for (let document of documents) {
        document = helper.stripInternalProperties(document);
    }   
    if (documents && documents.length>0)
    {
        context.res = {
           body: documents
        };
    }
    else {
        context.res = {
            status: 422,
            body: "No ratings found for user "+req.params.userId
        }
    }
};