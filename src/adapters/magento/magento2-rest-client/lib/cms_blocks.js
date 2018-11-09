var util = require('util');

module.exports = function (restClient) {
    var module = {};

    module.getByBlockId = function (blockId) {
        const endpointUrl = util.format('/cmsBlock/%s', blockId);

        return restClient.get(endpointUrl);
    };

    module.getByBlockIdentifier = function (identifier, storeId = 1) {
        const endpointUrl = util.format('/cmsBlock?storeId=%s&identifier=' + storeId, identifier);

        return restClient.get(endpointUrl);
    };

    module.list = function (searchCriteria) {
        var query = 'searchCriteria=' + searchCriteria;
        const endpointUrl = util.format('/cmsBlock/search?%s', query);

        return restClient.get(endpointUrl);
    }

    return module;
}

