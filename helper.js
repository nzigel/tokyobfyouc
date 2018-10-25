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

module.exports = {
    stripInternalProperties: function (res) {
        return stripInternalProperties(res);
    }
};