var helper = require('../helper');

module.exports = async function (context, req, ratingsDocument) {
    if (!ratingsDocument)
    {
        context.res = {
            status: 422,
            body: "No rating found with id "+req.params.id
        }
    }
    else
    {
        context.res = {
            body: helper.stripInternalProperties(ratingsDocument)
        };
    }
};