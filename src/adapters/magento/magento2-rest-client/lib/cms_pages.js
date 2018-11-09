var util = require('util');

module.exports = function (restClient) {
    var module = {};

    module.getByPageId = function (pageId) {
        const endpointUrl = util.format('/cmsPage/%s', pageId);

        return restClient.get(endpointUrl);
    };

    module.getByPageIdentifier = function (identifier, storeId = 1) {
        const endpointUrl = util.format('/cmsPage?storeId=%s&identifier=' + storeId, identifier);

        return restClient.get(endpointUrl);
    };

    module.list = function (searchCriteria) {
        var query = 'searchCriteria=' + searchCriteria;
        const endpointUrl = util.format('/cmsPage/search?%s', query);

        return restClient.get(endpointUrl);
    }

    return module;
}

