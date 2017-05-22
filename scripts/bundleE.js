(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":111}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/is-iterable"), __esModule: true };
},{"core-js/library/fn/is-iterable":112}],3:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/json/stringify"), __esModule: true };
},{"core-js/library/fn/json/stringify":113}],4:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/freeze"), __esModule: true };
},{"core-js/library/fn/object/freeze":114}],5:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/promise"), __esModule: true };
},{"core-js/library/fn/promise":115}],6:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":116}],7:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _isIterable2 = require("../core-js/is-iterable");

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = require("../core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
})();
},{"../core-js/get-iterator":1,"../core-js/is-iterable":2}],8:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _symbol = require("../core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof _Symbol !== "undefined" && obj.constructor === _Symbol ? "symbol" : typeof obj; }

exports.default = function (obj) {
  return obj && typeof _symbol2.default !== "undefined" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
},{"../core-js/symbol":6}],9:[function(require,module,exports){
// To understand why axios is vendored, check SETUP.md
var axios = require('contentful-sdk-core/vendor-browser/axios')
var contentfulManagement = require('./dist/contentful-management').default
module.exports = {
  createClient: function (params) {
    return contentfulManagement(axios, params)
  }
}

},{"./dist/contentful-management":10,"contentful-sdk-core/vendor-browser/axios":109}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createClient;

var _defaults = require('lodash/defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _assign = require('lodash/assign');

var _assign2 = _interopRequireDefault(_assign);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _createHttpClient = require('contentful-sdk-core/create-http-client');

var _createHttpClient2 = _interopRequireDefault(_createHttpClient);

var _wrapHttpClient = require('contentful-sdk-core/wrap-http-client');

var _wrapHttpClient2 = _interopRequireDefault(_wrapHttpClient);

var _version = require('../version');

var _version2 = _interopRequireDefault(_version);

var _createContentfulApi = require('./create-contentful-api');

var _createContentfulApi2 = _interopRequireDefault(_createContentfulApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {ContentfulManagement} ContentfulManagement
 * @property {function(params: {accessToken: string, insecure?: boolean, host?: string, agent?: Object, headers?: Object, concurrency?: number, delay?: number, maxRetries?: number, retryOnTooManyRequests?: boolean}): ClientAPI} createClient - Create a client instance, this is the entry point to the library
 *
 * @example
 * // require contentful-management
 * var contentfulManagement = require('contentful-management')
 * var client = contentfulManagement.createClient({
 * // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
 * accessToken: 'YOUR_ACCESS_TOKEN'
 * })
*/
function createClient(axios, params) {
  params = (0, _defaults2.default)((0, _cloneDeep2.default)(params), {
    rateLimit: 6,
    rateLimitPeriod: 1000,
    maxRetries: 5,
    retryOnTooManyRequests: true
  });

  if (!params.accessToken) {
    throw new TypeError('Expected parameter accessToken');
  }

  params.defaultHostname = 'api.contentful.com';
  params.headers = (0, _assign2.default)(params.headers, {
    'Content-Type': 'application/vnd.contentful.management.v1+json',
    'X-Contentful-User-Agent': 'contentful-management.js/' + _version2.default
  });

  var http = (0, _wrapHttpClient2.default)((0, _createHttpClient2.default)(axios, params), {
    concurrency: params.rateLimit,
    delay: params.rateLimitPeriod,
    maxRetries: params.maxRetries,
    retryOnTooManyRequests: params.retryOnTooManyRequests
  });
  var api = (0, _createContentfulApi2.default)({
    http: http
  });

  return api;
} /**
   * Contentful Management API SDK. Allows you to create instances of a client
   * with access to the Contentful Content Management API.
   * @namespace contentfulManagement
   * @see ContentfulClientAPI
   */
},{"../version":101,"./create-contentful-api":11,"contentful-sdk-core/create-http-client":103,"contentful-sdk-core/wrap-http-client":110,"lodash/assign":293,"lodash/cloneDeep":295,"lodash/defaults":296}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createSpaceApi;

var _errorHandler = require('./error-handler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _entities = require('./entities');

var _entities2 = _interopRequireDefault(_entities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {ClientAPI} ClientAPI
 * @property {function(id: string): Promise<Space>} getSpace - Gets a space with the spcified id
 * @property {function(): Promise<SpaceCollection>} getSpaces - Gets a collection of spaces
 * @property {function(data: {name: string}): Promise<Space>} createSpace - Creates a space
 */

/**
 * Creates API object with methods to access functionality from Contentful's
 * Management API
 * @private
 * @param {Object} params - API initialization params
 * @prop {Object} http - HTTP client instance
 * @prop {Function} shouldLinksResolve - Link resolver preconfigured with global setting
 * @return {ClientAPI}
 */
function createSpaceApi(_ref) {
  var http = _ref.http;
  var _entities$space = _entities2.default.space,
      wrapSpace = _entities$space.wrapSpace,
      wrapSpaceCollection = _entities$space.wrapSpaceCollection;

  /**
   * Gets all spaces
   * @memberof ClientAPI   * @return {Promise<Space.SpaceCollection>} Promise for a collection of Spaces
   * @example
   * client.getSpaces()
   * .then(spaces => console.log(spaces.items))
   */

  function getSpaces() {
    return http.get('').then(function (response) {
      return wrapSpaceCollection(http, response.data);
    }, _errorHandler2.default);
  }

  /**
   * Gets a space
   * @memberof ClientAPI
   * @param {string} id - Space ID
   * @return {Promise<Space.Space>} Promise for a Space
   * @example
   * client.getSpace('spaceid')
   * .then(space => console.log(space))
   */
  function getSpace(id) {
    return http.get(id).then(function (response) {
      return wrapSpace(http, response.data);
    }, _errorHandler2.default);
  }

  /**
   * Creates a space
   * @memberof ClientAPI
   * @see {Space.Space}
   * @param {object} data - Object representation of the Space to be created
   * @param {string=} organizationId - Organization ID, if the associated token can manage more than one organization.
   * @return {Promise<Space.Space>} Promise for the newly created Space
   * @example
   * client.createSpace({name: 'Space Name'})
   * .then(space => console.log(space))
   */
  function createSpace(data, organizationId) {
    return http.post('', data, {
      headers: organizationId ? { 'X-Contentful-Organization': organizationId } : {}
    }).then(function (response) {
      return wrapSpace(http, response.data);
    }, _errorHandler2.default);
  }

  return {
    getSpaces: getSpaces,
    getSpace: getSpace,
    createSpace: createSpace
  };
}
},{"./entities":19,"./error-handler":25}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createSpaceApi;

var _createRequestConfig = require('contentful-sdk-core/create-request-config');

var _createRequestConfig2 = _interopRequireDefault(_createRequestConfig);

var _errorHandler = require('./error-handler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _entities = require('./entities');

var _entities2 = _interopRequireDefault(_entities);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {Space} Space
 * @property {Object} sys - System metadata
 * @property {string} sys.id - Space id
 * @property {string} sys.type - Entity type
 * @property {string} name - Space name
 * @property {function(): Promise} delete - Deletes the space
 * @property {function(): Promise<Space>} update - Updates the space
 * @property {function(id: string): Promise<ContentType>} getContentType - Get a contentType by id
 * @property {function(): Promise<ContentTypeCollection>} getContentTypes - Gets a collection of contentTypes
 * @property {function(data:{name: string, fields: Array}): Promise<ContentType>} createContentType - creates a ContentType
 * @property {function(id: string, data: {name: string, fields: Array}): Promise<ContentType>} createContentTypeWithId - creates a ContentType with a specified id
 * @property {function(id: string): Promise<Entry>} getEntry - Gets an Entry with a custom id
 * @property {function(query:Object): Promise<EntryCollection>} getEntries - Gets a collection of entries
 * @property {function(contentTypeId: string, data: {fields: Object}): Promise<Entry>} createEntry - Creates an Entry
 * @property {function(contentTypeId: string, id: string, data: {fields: Object}): Promise<Entry>} createEntryWithId - Creates an Entry with a specified id
 * @property {function(id: string, query: Object): Promise<Asset>} getAsset - Gets an asset by id
 * @property {function(query: Object): Promise<AssetCollection>} getAssets - Gets a collection of assets
 * @property {function(data: {fields: Object}): Promise<Asset>} createAsset - Creates an asset
 * @property {function(id: string, data: {fields: Object}):Promise<Asset>} createAssetWithId - Creates an asset with the custom id
 * @property {function(): Promise<Locale>} getLocale - Gets a locale
 * @property {function(): Promise<LocaleCollection>} getLocales - Gets a collection of locales
 * @property {function(data:{name: string, code: string}): Promise<Locale>} createLocale - Creates a Locale
 * @property {function(id:string): Promise<webhook>} getWebhook - Gets a webhook
 * @property {function(): Promise<WebhookCollection>} getWebhooks - Gets a collection of webhooks
 * @property {function(data: Object): Promise<Webhook>} createWebhook - Creates a webhook
 * @property {function(id: string, data: Object)} createWebhookWithId - Creates a webhook with a custom id
 * @property {function(id: string): Promise<Role>} getRole - Gets a Role
 * @property {function(): Promise<RoleCollection>} getRoles - Gets a collection of roles
 * @property {function(data: Object): Promise<Role>} createRole - Creates a role
 * @property {function(id: string, data: Object): Promise<Role>} createRoleWithId - Creates a Role with a custom id
 * @property {function(id: string): Promise<SpaceMembership>} getSpaceMembership - Gets a space membership
 * @property {function(): Promise<SpaceMembershipCollection>} getSpaceMemberships - Gets a space memnerships collection
 * @property {function(data: Object): Promise<SpaceMembership>} createSpaceMembership - Creates a space membership
 * @property {function(id: string, data: Object): Promise<SpaceMembership>} createSpaceMembershipWithId - Creates a space membership with a custom id
 * @property {function(id: string): Promise<ApiKey>} getApiKey - Gets an api key
 * @property {function(): Promise<ApiKeyCollection>} getApiKeys - Gets a collection of api keys
 * @property {function(data: Object): Promise<ApiKey>} createApiKey - Creates an api key
 * @property {function(id: string, data: Object): Promise<ApiKey>} createSpaceApi.createApiKeyWithId - Creates an api key with a custom id
 * @property {function(): Object} toPlainObject - Returns this Space as a plain JS object
 * @example
 * // require contentful-management
 * var contentfulManagement = require('contentful-management')
 * var client = contentfulManagement.createClient({
 * // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
 * accessToken: 'YOUR_ACCESS_TOKEN'
 * })
 *
 * //================================================================================================
 * // To get a space object you have two options:
 * //
 * // 1. by creating a new space
 * //
 * // var space = await client.createSpace({name: "My new space"})
 * //
 * // OR
 * //
 * // 2. Get an existing one by id
 * //
 * // var space = await client.getSpace('SPACE_ID')
 * //================================================================================================
 *
 * // We'll pick option 2.
 * //
 * // A space object will be like so
 * // {
 * //   "sys": {
 * //     "type": "Space",
 * //     "id": "cfexampleapi",
 * //     "version": 3,
 * //     "createdAt": "2015-05-18T11:29:46.809Z",
 * //     "createdBy": {
 * //       "sys": {
 * //         "type": "Link",
 * //         "linkType": "User",
 * //         "id": "4FLrUHftHW3v2BLi9fzfjU"
 * //       }
 * //     },
 * //     "updatedAt": "2015-05-18T11:29:46.809Z",
 * //     "updatedBy": {
 * //       "sys": {
 * //         "type": "Link",
 * //         "linkType": "User",
 * //         "id": "4FLrUHftHW3v2BLi9fzfjU"
 * //       }
 * //     }
 * //   },
 * //   "name": "Contentful Example API"
 * // }
 * var space = await client.getSpace('cfexampleapi')
 *
 * // Example Deleting a space
 * space.delete()
 * .catch(err => console.log(err))
 *
 * // Example updating a space
 * space.name = 'Updated Space Name'
 * space.update()
 * .then(space => console.log(space.name) // `Updated Space Name`)
 *
 * // Example getting a contentType
 * space.getContentType('contentTypeId')
 * .then(contentType => console.log(contentType)) // @see {ContentType}
 *
 * // Example getting an editorInterface for a contentType
 * // an editorInterface is a set of configuration that defines how a field look like
 * // example singleLine, etc...
 * space.getEditorInterfaceForContentType('contentTypeId')
 * .then(editorInterface => console.log(editorInterface))
 *
 * // Example creating a contentType
 * space.createContentType({name: 'Post', fields: []})
 * .then(ct => console.log(ct))
 *
 * // Example Creating a contentType with a custom id
 * space.createContentTypeWithId('post', {name: 'Post', fields: []})
 * .then(ct => console.log(ct))
 *
 * // Example getting all entries form a space where contentType is `contentTypeId`
 * // you can add more query params along with the content_type key, like 'limit':'1000', 'order':'sys.createdAt' and more
 * // for more infos about the query check https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters
 * space.getEntries({content_type: 'contentTypeId'})
 * .then(entries => console.log(entries.items))
 *
 * // Example Creating an entry with a localized title field
 * // you can fill in all the fields defined in the contentType with the id 'contentTypeId'
 * // so if you have another field of type text for example called description, you can add 'description' in the fields object
 * // that will be sent to the server
 * space.createEntry('contentTypeId', {
 *   fields: {
 *     title: {
 *       'en-US': 'english content',
 *       'de-DE': 'german content'
 *     }
 *   }
 * })
 * .then(e => console.log(e))
 *
 * // Example getting an entry by id
 * space.getEntry('entryId')
 *  .then(entity => console.log(entry))
 *
 * // Example getting assets
 * space.getAssets()
 *  .then(response => console.log(response.items))
 *
 * // Example getting an asset
 * space.getAsset('assetId')
 * .then(asset => console.log(asset)) // @see {Asset}
 *
 * // Example creating an asset
 * // After creation, call asset.processForLocale or asset.processForAllLocales to start asset processing.
 * // After processing the upload property name will be replace by 'url'
 * // if you want to create an asset with a custom id please use the space.createAssetWithId('id', data)
 * space.createAsset(
 *   fields: {
 *     file: {
 *       'en-US': {
 *          contentType: 'image/jpeg',
 *          fileName: 'filename_english.jpg',
 *          upload: 'http://example.com/filename_original_en.jpg'
 *       },
 *       'de-DE': {
 *          contentType: 'image/jpeg',
 *          fileName: 'filename_german.jpg',
 *          upload: 'http://example.com/filename_original_de.jpg'
 *       }
 *     }
 *   }
 * )
 * .then(asset => asset.processForAllLocales())
 */

/**
 * @typedef {SpaceCollection} SpaceCollection
 * @property {number} total - Total amount of records in the server
 * @property {number} skip - A starting point of the collection
 * @property {number} limit - Amount of records in collection
 * @property {Array<Space>} items - An array of spaces
 * @property {function(): Object} toPlainObject - Returns this Space collection as a plain JS object
 * @example
 * // require contentful-management
 * var contentfulManagement = require('contentful-management')
 * var client = contentfulManagement.createClient({
 * // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
 * accessToken: 'YOUR_ACCESS_TOKEN'
 * })
 *
 * client.getSpaces()
 *   .then((spaceCollection) => {
 *     console.log(spaceCollection.items) // list of spaces @see {Space}
 *   })
 */

/**
 * Creates API object with methods to access the Space API
 * @private
 * @param {http: Object} params - API initialization params
 * @prop {Object} http - HTTP client instance
 * @prop {Object} entities - Object with wrapper methods for each kind of entity
 * @return {ContentfulSpaceAPI}
 */
function createSpaceApi(_ref) {
  var http = _ref.http;
  var wrapSpace = _entities2.default.space.wrapSpace;
  var _entities$contentType = _entities2.default.contentType,
      wrapContentType = _entities$contentType.wrapContentType,
      wrapContentTypeCollection = _entities$contentType.wrapContentTypeCollection;
  var _entities$entry = _entities2.default.entry,
      wrapEntry = _entities$entry.wrapEntry,
      wrapEntryCollection = _entities$entry.wrapEntryCollection;
  var _entities$asset = _entities2.default.asset,
      wrapAsset = _entities$asset.wrapAsset,
      wrapAssetCollection = _entities$asset.wrapAssetCollection;
  var _entities$locale = _entities2.default.locale,
      wrapLocale = _entities$locale.wrapLocale,
      wrapLocaleCollection = _entities$locale.wrapLocaleCollection;
  var _entities$webhook = _entities2.default.webhook,
      wrapWebhook = _entities$webhook.wrapWebhook,
      wrapWebhookCollection = _entities$webhook.wrapWebhookCollection;
  var _entities$role = _entities2.default.role,
      wrapRole = _entities$role.wrapRole,
      wrapRoleCollection = _entities$role.wrapRoleCollection;
  var _entities$spaceMember = _entities2.default.spaceMembership,
      wrapSpaceMembership = _entities$spaceMember.wrapSpaceMembership,
      wrapSpaceMembershipCollection = _entities$spaceMember.wrapSpaceMembershipCollection;
  var _entities$apiKey = _entities2.default.apiKey,
      wrapApiKey = _entities$apiKey.wrapApiKey,
      wrapApiKeyCollection = _entities$apiKey.wrapApiKeyCollection;
  var wrapEditorInterface = _entities2.default.editorInterface.wrapEditorInterface;

  /**
   * Space instances.
   * @namespace Space
   */

  /**
   * Deletes the space
   * @memberof Space
   * @func delete
   * @return {Promise} Promise for the deletion. It contains no data, but the Promise error case should be handled.
   * @example
   * space.delete()
   * .catch(err => console.log(err))
   */

  function deleteSpace() {
    return http.delete('').then(function (response) {}, _errorHandler2.default);
  }

  /**
   * Updates the space
   * @memberof Space
   * @func update
   * @return {Promise<Space.Space>} Promise for the updated space.
   */
  function updateSpace() {
    var raw = this.toPlainObject();
    var data = (0, _omit2.default)(raw, ['sys']);
    return http.put('', data, {
      headers: {
        'X-Contentful-Version': raw.sys.version
      }
    }).then(function (response) {
      return wrapSpace(http, response.data);
    }, _errorHandler2.default);
  }

  /**
   * Gets a Content Type
   * @memberof ContentfulSpaceAPI
   * @param  {string} id
   * @return {Promise<ContentType.ContentType>} Promise for a Content Type
   * @example
   */
  function getContentType(id) {
    return http.get('content_types/' + id).then(function (response) {
      return wrapContentType(http, response.data);
    }, _errorHandler2.default);
  }

  /**
   * Gets an EditorInterface for a ContentType
   * @memberof ContentfulSpaceAPI
   * @param  {string} contentTypeId
   * @return {Promise<EditorInterface.EditorInterface>} Promise for an EditorInterface
   * @example
   * space.getEditorInterfaceForContentType('contentTypeId')
   * .then(editorInterface => console.log(editorInterface))
   */
  function getEditorInterfaceForContentType(contentTypeId) {
    return http.get('content_types/' + contentTypeId + '/editor_interface').then(function (response) {
      return wrapEditorInterface(http, response.data);
    }, _errorHandler2.default);
  }

  /**
   * Gets a collection of Content Types
   * @memberof ContentfulSpaceAPI
   * @param  {Object=} query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
   * @return {Promise<ContentType.ContentTypeCollection>} Promise for a collection of Content Types
   * @example
   * space.getContentTypes()
   * .then(contentTypes => console.log(contentTypes.items))
   */
  function getContentTypes() {
    var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return http.get('content_types', (0, _createRequestConfig2.default)({ query: query })).then(function (response) {
      return wrapContentTypeCollection(http, response.data);
    }, _errorHandler2.default);
  }

  /**
   * Creates a Content Type
   * @memberof ContentfulSpaceAPI
   * @see {ContentType}
   * @param {object} data - Object representation of the Content Type to be created
   * @return {Promise<ContentType.ContentType>} Promise for the newly created Content Type
   * @example
   * space.createContentType({name: 'Post', fields: []})
   * .then(ct => console.log(ct))
   */
  function createContentType(data) {
    return http.post('content_types', data).then(function (response) {
      return wrapContentType(http, response.data);
    }, _errorHandler2.default);
  }

  /**
   * Creates a Content Type with a custom id
   * @memberof ContentfulSpaceAPI
   * @see {ContentType.ContentType}
   * @param {string} id - Content Type ID
   * @param {object} data - Object representation of the Content Type to be created
   * @return {Promise<ContentType.ContentType>} Promise for the newly created Content Type
   * @example
   * space.createContentType('post', {name: 'Post', fields: []})
   * .then(ct => console.log(ct))
   */
  function createContentTypeWithId(id, data) {
    return http.put('content_types/' + id, data).then(function (response) {
      return wrapContentType(http, response.data);
    }, _errorHandler2.default);
  }

  /**
   * Gets an Entry
   * Warning: if you are using the select operator, when saving, any field that was not selected will be removed
   * from your entry in the backend
   * @memberof ContentfulSpaceAPI
   * @param  {string} id
   * @param  {Object=} query - Object with search parameters. In this method it's only useful for `locale`.
   * @return {Promise<Entry.Entry>} Promise for an Entry
   * @example
   * space.getEntry('entryId')
   * .then(entry => console.log(entry))
   */
  function getEntry(id) {
    var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    normalizeSelect(query);
    return http.get('entries/' + id, (0, _createRequestConfig2.default)({ query: query })).then(function (response) {
      return wrapEntry(http, response.data);
    }, _errorHandler2.default);
  }

  /**
   * Gets a collection of Entries
   * Warning: if you are using the select operator, when saving, any field that was not selected will be removed
   * from your entry in the backend
   * @memberof ContentfulSpaceAPI
   * @param  {Object=} query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
   * @return {Promise<Entry.EntryCollection>} Promise for a collection of Entries
   * @example
   * space.getEntries({content_type: 'contentTypeId'})
   * .then(entries => console.log(entries.items))
   */
  function getEntries() {
    var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    normalizeSelect(query);
    return http.get('entries', (0, _createRequestConfig2.default)({ query: query })).then(function (response) {
      return wrapEntryCollection(http, response.data);
    }, _errorHandler2.default);
  }

  /**
   * Creates a Entry
   * @memberof ContentfulSpaceAPI
   * @see {Entry.Entry}
   * @param {string} contentTypeId - The Content Type which this Entry is based on
   * @param {object} data - Object representation of the Entry to be created
   * @return {Promise<Entry.Entry>} Promise for the newly created Entry
   * @example
   * space.createEntry('contentTypeId', {
   *   fields: {
   *     title: {
   *       'en-US': 'english content',
   *       'de-DE': 'german content'
   *     }
   *   }
   * })
   * .then(e => console.log(e))
   */
  function createEntry(contentTypeId, data) {
    return http.post('entries', data, {
      headers: {
        'X-Contentful-Content-Type': contentTypeId
      }
    }).then(function (response) {
      return wrapEntry(http, response.data);
    }, _errorHandler2.default);
  }

  /**
   * Creates a Entry with a custom id
   * @memberof ContentfulSpaceAPI
   * @see {Entry.Entry}
   * @param {string} contentTypeId - The Content Type which this Entry is based on
   * @param {string} id - Entry ID
   * @param {object} data - Object representation of the Entry to be created
   * @return {Promise<Entry.Entry>} Promise for the newly created Entry
   * @example
   * space.createEntryWithId('contentTypeId', 'entryId', {
   *   fields: {
   *     title: {
   *       'en-US': 'english content',
   *       'de-DE': 'german content'
   *     }
   *   }
   * })
   * .then(e => console.log(e))
   */
  function createEntryWithId(contentTypeId, id, data) {
    return http.put('entries/' + id, data, {
      headers: {
        'X-Contentful-Content-Type': contentTypeId
      }
    }).then(function (response) {
      return wrapEntry(http, response.data);
    }, _errorHandler2.default);
  }

  /**
   * Gets an Asset
   * Warning: if you are using the select operator, when saving, any field that was not selected will be removed
   * from your entry in the backend
   * @memberof ContentfulSpaceAPI
   * @param  {string} id
   * @param  {Object=} query - Object with search parameters. In this method it's only useful for `locale`.
   * @return {Promise<Asset.Asset>} Promise for an Asset
   * @example
   * space.getAsset('assetId')
   * .then(asset => console.log(asset))
   */
  function getAsset(id) {
    var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    normalizeSelect(query);
    return http.get('assets/' + id, (0, _createRequestConfig2.default)({ query: query })).then(function (response) {
      return wrapAsset(http, response.data);
    }, _errorHandler2.default);
  }

  /**
   * Gets a collection of Assets
   * Warning: if you are using the select operator, when saving, any field that was not selected will be removed
   * from your entry in the backend
   * @memberof ContentfulSpaceAPI
   * @param  {Object=} query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
   * @return {Promise<Asset.AssetCollection>} Promise for a collection of Assets
   * @example
   * space.getAssets()
   * .then(assets => console.log(assets.items))
   */
  function getAssets() {
    var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    normalizeSelect(query);
    return http.get('assets', (0, _createRequestConfig2.default)({ query: query })).then(function (response) {
      return wrapAssetCollection(http, response.data);
    }, _errorHandler2.default);
  }

  /**
   * Creates a Asset. After creation, call asset.processForLocale or asset.processForAllLocales to start asset processing.
   * @memberof ContentfulSpaceAPI
   * @see {Asset.Asset}
   * @param {object} data - Object representation of the Asset to be created. Note that the field object should have an upload property on asset creation, which will be removed and replaced with an url property when processing is finished.
   * @return {Promise<Asset.Asset>} Promise for the newly created Asset
   * @example
   * space.createAsset(
   *   fields: {
   *     file: {
   *       'en-US': {
   *          contentType: 'image/jpeg',
   *          fileName: 'filename_english.jpg',
   *          upload: 'http://example.com/filename_original_en.jpg'
   *       },
   *       'de-DE': {
   *          contentType: 'image/jpeg',
   *          fileName: 'filename_german.jpg',
   *          upload: 'http://example.com/filename_original_de.jpg'
   *       }
   *     }
   *   }
   * )
   * .then(e => console.log(e))
   */
  function createAsset(data) {
    return http.post('assets', data).then(function (response) {
      return wrapAsset(http, response.data);
    }, _errorHandler2.default);
  }

  /**
   * Creates a Asset with a custom id. After creation, call asset.processForLocale or asset.processForAllLocales to start asset processing.
   * @memberof ContentfulSpaceAPI
   * @see {Asset.Asset}
   * @param {string} id - Asset ID
   * @param {object} data - Object representation of the Asset to be created. Note that the field object should have an upload property on asset creation, which will be removed and replaced with an url property when processing is finished.
   * @return {Promise<Asset.Asset>} Promise for the newly created Asset
   * @example
   * space.createAssetWithId('image', {
   *   fields: {
   *     file: {
   *       'en-US': {
   *          contentType: 'image/jpeg',
   *          fileName: 'filename_english.jpg',
   *          upload: 'http://example.com/filename_original_en.jpg'
   *       },
   *       'de-DE': {
   *          contentType: 'image/jpeg',
   *          fileName: 'filename_german.jpg',
   *          upload: 'http://example.com/filename_original_de.jpg'
   *       }
   *     }
   *   }
   * })
   * .then(e => console.log(e))
   */
  function createAssetWithId(id, data) {
    return http.put('assets/' + id, data).then(function (response) {
      return wrapAsset(http, response.data);
    }, _errorHandler2.default);
  }

  /**
   * Gets a Locale
   * @memberof ContentfulSpaceAPI
   * @param  {string} id
   * @return {Promise<Locale.Locale>} Promise for an Locale
   * @example
   * space.getLocale('localeId')
   * .then(locale => console.log(locale))
   */
  function getLocale(id) {
    return http.get('locales/' + id).then(function (response) {
      return wrapLocale(http, response.data);
    }, _errorHandler2.default);
  }

  /**
   * Gets a collection of Locales
   * @memberof ContentfulSpaceAPI
   * @return {Promise<Locale.LocaleCollection>} Promise for a collection of Locales
   * @example
   * space.getLocales()
   * .then(locales => console.log(locales.items))
   */
  function getLocales() {
    return http.get('locales').then(function (response) {
      return wrapLocaleCollection(http, response.data);
    }, _errorHandler2.default);
  }

  /**
   * Creates a Locale
   * @memberof ContentfulSpaceAPI
   * @see {Locale.Locale}
   * @param {object} data - Object representation of the Locale to be created
   * @return {Promise<Locale.Locale>} Promise for the newly created Locale
   * @example
   * space.createLocale({name: 'German (Germany)', code: 'de-DE'})
   * .then(e => console.log(e))
   */
  function createLocale(data) {
    return http.post('locales', data).then(function (response) {
      return wrapLocale(http, response.data);
    }, _errorHandler2.default);
  }

  /**
   * Gets a Webhook
   * @memberof ContentfulSpaceAPI
   * @param  {string} id
   * @return {Promise<Webhook.Webhook>} Promise for a Webhook
   * @example
   * space.getWebhook('id')
   * .then(webhook => console.log(webhook))
   */
  function getWebhook(id) {
    return http.get('webhook_definitions/' + id).then(function (response) {
      return wrapWebhook(http, response.data);
    }, _errorHandler2.default);
  }

  /**
   * Gets a collection of Webhooks
   * @memberof ContentfulSpaceAPI
   * @return {Promise<Webhook.WebhookCollection>} Promise for a collection of Webhooks
   * @example
   * space.getWebhooks()
   * .then(webhooks => console.log(webhooks.items))
   */
  function getWebhooks() {
    return http.get('webhook_definitions').then(function (response) {
      return wrapWebhookCollection(http, response.data);
    }, _errorHandler2.default);
  }

  /**
   * Creates a Webhook
   * @memberof ContentfulSpaceAPI
   * @see {Webhook.Webhook}
   * @param {object} data - Object representation of the Webhook to be created
   * @return {Promise<Webhook.Webhook>} Promise for the newly created Webhook
   * @example
   * space.createWebhook({})
   * .then(webhook => console.log(webhook))
   */
  function createWebhook(data) {
    return http.post('webhook_definitions', data).then(function (response) {
      return wrapWebhook(http, response.data);
    }, _errorHandler2.default);
  }

  /**
   * Creates a Webhook with a custom id
   * @memberof ContentfulSpaceAPI
   * @see {Webhook.Webhook}
   * @param {string} id - Webhook ID
   * @param {object} data - Object representation of the Webhook to be created
   * @return {Promise<Webhook.Webhook>} Promise for the newly created Webhook
   * @example
   * space.createWebhook('id', {})
   * .then(webhook => console.log(webhook))
   */
  function createWebhookWithId(id, data) {
    return http.put('webhook_definitions/' + id, data).then(function (response) {
      return wrapWebhook(http, response.data);
    }, _errorHandler2.default);
  }

  /**
   * Gets a Space Membership
   * @memberof ContentfulSpaceAPI
   * @param  {string} id
   * @return {Promise<SpaceMembership.SpaceMembership>} Promise for a Space Membership
   * @example
   * space.getSpaceMembership('id')
   * .then(spaceMembership => console.log(spaceMembership))
   */
  function getSpaceMembership(id) {
    return http.get('space_memberships/' + id).then(function (response) {
      return wrapSpaceMembership(http, response.data);
    }, _errorHandler2.default);
  }

  /**
   * Gets a collection of Space Memberships
   * @memberof ContentfulSpaceAPI
   * @return {Promise<SpaceMembership.SpaceMembershipCollection>} Promise for a collection of Space Memberships
   * @example
   * space.getSpaceMemberships()
   * .then(spaceMemberships => console.log(spaceMemberships.items))
   */
  function getSpaceMemberships() {
    return http.get('space_memberships').then(function (response) {
      return wrapSpaceMembershipCollection(http, response.data);
    }, _errorHandler2.default);
  }

  /**
   * Creates a Space Membership
   * @memberof ContentfulSpaceAPI
   * @see {SpaceMembership.SpaceMembership}
   * @param {object} data - Object representation of the Space Membership to be created
   * @return {Promise<SpaceMembership.SpaceMembership>} Promise for the newly created Space Membership
   * @example
   * space.createSpaceMembership({})
   * .then(spaceMembership => console.log(spaceMembership))
   */
  function createSpaceMembership(data) {
    return http.post('space_memberships', data).then(function (response) {
      return wrapSpaceMembership(http, response.data);
    }, _errorHandler2.default);
  }

  /**
   * Creates a Space Membership with a custom id
   * @memberof ContentfulSpaceAPI
   * @see {SpaceMembership.SpaceMembership}
   * @param {string} id - Space Membership ID
   * @param {object} data - Object representation of the Space Membership to be created
   * @return {Promise<SpaceMembership.SpaceMembership>} Promise for the newly created Space Membership
   * @example
   * space.createSpaceMembership('id', {})
   * .then(spaceMembership => console.log(spaceMembership))
   */
  function createSpaceMembershipWithId(id, data) {
    return http.put('space_memberships/' + id, data).then(function (response) {
      return wrapSpaceMembership(http, response.data);
    }, _errorHandler2.default);
  }

  /**
   * Gets a Role
   * @memberof ContentfulSpaceAPI
   * @param  {string} id
   * @return {Promise<Role.Role>} Promise for a Role
   * @example
   * space.getRole('id')
   * .then(role => console.log(role))
   */
  function getRole(id) {
    return http.get('roles/' + id).then(function (response) {
      return wrapRole(http, response.data);
    }, _errorHandler2.default);
  }

  /**
   * Gets a collection of Roles
   * @memberof ContentfulSpaceAPI
   * @return {Promise<Role.RoleCollection>} Promise for a collection of Roles
   * @example
   * space.getRoles()
   * .then(roles => console.log(roles.items))
   */
  function getRoles() {
    return http.get('roles').then(function (response) {
      return wrapRoleCollection(http, response.data);
    }, _errorHandler2.default);
  }

  /**
   * Creates a Role
   * @memberof ContentfulSpaceAPI
   * @see {Role.Role}
   * @param {object} data - Object representation of the Role to be created
   * @return {Promise<Role.Role>} Promise for the newly created Role
   * @example
   * space.createRole({})
   * .then(role => console.log(role))
   */
  function createRole(data) {
    return http.post('roles', data).then(function (response) {
      return wrapRole(http, response.data);
    }, _errorHandler2.default);
  }

  /**
   * Creates a Role with a custom id
   * @memberof ContentfulSpaceAPI
   * @see {Role.Role}
   * @param {string} id - Role ID
   * @param {object} data - Object representation of the Role to be created
   * @return {Promise<Role.Role>} Promise for the newly created Role
   * @example
   * space.createRole('id', {})
   * .then(role => console.log(role))
   */
  function createRoleWithId(id, data) {
    return http.put('roles/' + id, data).then(function (response) {
      return wrapRole(http, response.data);
    }, _errorHandler2.default);
  }

  /**
   * Gets a Api Key
   * @memberof ContentfulSpaceAPI
   * @param  {string} id
   * @return {Promise<ApiKey.ApiKey>} Promise for a Api Key
   * @example
   * space.getApiKey('id')
   * .then(apiKey => console.log(apiKey))
   */
  function getApiKey(id) {
    return http.get('api_keys/' + id).then(function (response) {
      return wrapApiKey(http, response.data);
    }, _errorHandler2.default);
  }

  /**
   * Gets a collection of Api Keys
   * @memberof ContentfulSpaceAPI
   * @return {Promise<ApiKey.ApiKeyCollection>} Promise for a collection of Api Keys
   * @example
   * space.getApiKeys()
   * .then(apiKeys => console.log(apiKeys.items))
   */
  function getApiKeys() {
    return http.get('api_keys').then(function (response) {
      return wrapApiKeyCollection(http, response.data);
    }, _errorHandler2.default);
  }

  /**
   * Creates a Api Key
   * @memberof ContentfulSpaceAPI
   * @see {ApiKey.ApiKey}
   * @param {object} data - Object representation of the Api Key to be created
   * @return {Promise<ApiKey.ApiKey>} Promise for the newly created Api Key
   * @example
   * space.createApiKey({})
   * .then(apiKey => console.log(apiKey))
   */
  function createApiKey(data) {
    return http.post('api_keys', data).then(function (response) {
      return wrapApiKey(http, response.data);
    }, _errorHandler2.default);
  }

  /**
   * Creates a Api Key with a custom id
   * @memberof ContentfulSpaceAPI
   * @see {ApiKey.ApiKey}
   * @param {string} id - Api Key ID
   * @param {object} data - Object representation of the Api Key to be created
   * @return {Promise<ApiKey.ApiKey>} Promise for the newly created Api Key
   * @example
   * space.createApiKey('id', {})
   * .then(apiKey => console.log(apiKey))
   */
  function createApiKeyWithId(id, data) {
    return http.put('api_keys/' + id, data).then(function (response) {
      return wrapApiKey(http, response.data);
    }, _errorHandler2.default);
  }

  /*
   * sdk relies heavily on sys metadata
   * so we cannot omit the sys property on sdk level
   * */
  function normalizeSelect(query) {
    if (query.select && !/sys/i.test(query.select)) {
      query.select += ',sys';
    }
  }

  return {
    delete: deleteSpace,
    update: updateSpace,
    getContentType: getContentType,
    getContentTypes: getContentTypes,
    createContentType: createContentType,
    createContentTypeWithId: createContentTypeWithId,
    getEditorInterfaceForContentType: getEditorInterfaceForContentType,
    getEntry: getEntry,
    getEntries: getEntries,
    createEntry: createEntry,
    createEntryWithId: createEntryWithId,
    getAsset: getAsset,
    getAssets: getAssets,
    createAsset: createAsset,
    createAssetWithId: createAssetWithId,
    getLocale: getLocale,
    getLocales: getLocales,
    createLocale: createLocale,
    getWebhook: getWebhook,
    getWebhooks: getWebhooks,
    createWebhook: createWebhook,
    createWebhookWithId: createWebhookWithId,
    getRole: getRole,
    getRoles: getRoles,
    createRole: createRole,
    createRoleWithId: createRoleWithId,
    getSpaceMembership: getSpaceMembership,
    getSpaceMemberships: getSpaceMemberships,
    createSpaceMembership: createSpaceMembership,
    createSpaceMembershipWithId: createSpaceMembershipWithId,
    getApiKey: getApiKey,
    getApiKeys: getApiKeys,
    createApiKey: createApiKey,
    createApiKeyWithId: createApiKeyWithId
  };
}
},{"./entities":19,"./error-handler":25,"contentful-sdk-core/create-request-config":104,"lodash/omit":319}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

exports.default = enhanceWithMethods;

var _reduce = require('lodash/reduce');

var _reduce2 = _interopRequireDefault(_reduce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This method enhances a base object which would normally contain data, with
 * methods from another object that might work on manipulating that data.
 * All the added methods are set as non enumerable, non configurable, and non
 * writable properties. This ensures that if we try to clone or stringify the
 * base object, we don't have to worry about these additional methods.
 * @private
 * @param {object} baseObject - Base object with data
 * @param {object} methodsObject - Object with methods as properties. The key
 * values used here will be the same that will be defined on the baseObject.
 */
function enhanceWithMethods(baseObject, methodsObject) {
  return (0, _reduce2.default)(methodsObject, function (baseObject, method, methodName) {
    (0, _defineProperty2.default)(baseObject, methodName, {
      enumerable: false,
      configurable: false,
      writable: false,
      value: method
    });
    return baseObject;
  }, baseObject);
}
},{"babel-runtime/core-js/object/define-property":28,"lodash/reduce":321}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapApiKey = wrapApiKey;
exports.wrapApiKeyCollection = wrapApiKeyCollection;

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _freezeSys = require('contentful-sdk-core/freeze-sys');

var _freezeSys2 = _interopRequireDefault(_freezeSys);

var _enhanceWithMethods = require('../enhance-with-methods');

var _enhanceWithMethods2 = _interopRequireDefault(_enhanceWithMethods);

var _toPlainObject = require('contentful-sdk-core/mixins/to-plain-object');

var _toPlainObject2 = _interopRequireDefault(_toPlainObject);

var _instanceActions = require('../instance-actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {ApiKey} ApiKey
 * @property {Object} sys - System metadata
 * @property {string} name
 * @property {string} description
 * @property {function(): Promise<ApiKey>} update() - Sends an update to the server with any changes made to the object's properties
 * @property {function(): Promise} delete() - Deletes this object on the server
 * @property {function(): Object} toPlainObject - Returns this Api Key as a plain JS object
 * @example
 *
 * // require contentful-management
 * var contentfulManagement = require('contentful-management')
 * var client = contentfulManagement.createClient({
 * // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
 * accessToken: 'YOUR_ACCESS_TOKEN'
 * })
 *
 * var space = await client.getSpace('SPACE_ID')
 *
 * //=======================================================================================================
 * // You can get an ApiKey object by
 * //
 * // 1. Creating one
 * //
 * // var apiKey = await space.createApiKey({})
 * //
 * // OR
 * //
 * // 2. Get an existing one
 * //
 * // var apiKey = await space.getApiKey('API_KEY_ID')
 * //=======================================================================================================
 *
 * // we'll use option 2
 * var apiKey = await space.getApiKey('API_KEY_ID')
 *
 * // Example updating an APIKey
 * apiKey.name = 'New name'
 * apiKey.update()
 * .then(apiKey => console.log(apiKey.name))
 *
 * // Example deleting an ApiKey
 * apiKey.delete()
 * .catch(err => console.log(err))
 *
 */

/**
 * @typedef {ApiKeyCollection} ApiKeyCollection
 * @property {number} total - Total amount of records in the server
 * @property {number} skip - A starting point of the collection
 * @property {number} limit - Amount of records in collection
 * @property {ApiKey[]} items - Array of ApiKey
 * @property {function(): Object} toPlainObject - Returns this Api Key collection as a plain JS object
 * @example
 *
 * // require contentful-management
 * var contentfulManagement = require('contentful-management')
 * var client = contentfulManagement.createClient({
 * // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
 * accessToken: 'YOUR_ACCESS_TOKEN'
 * })
 *
 * var space = await client.getSpace('SPACE_ID')
 *
 * //get all the api keys
 * space.getApiKeys()
 * .then(apiKeys => console.log(apiKeys.items))
 */
function createApiKeyApi(http) {
  return {
    update: (0, _instanceActions.createUpdateEntity)({
      http: http,
      entityPath: 'api_keys',
      wrapperMethod: wrapApiKey
    }),

    delete: (0, _instanceActions.createDeleteEntity)({
      http: http,
      entityPath: 'api_keys'
    })
  };
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw api key data
 * @return {ApiKey} Wrapped api key data
 */
function wrapApiKey(http, data) {
  var apiKey = (0, _toPlainObject2.default)((0, _cloneDeep2.default)(data));
  (0, _enhanceWithMethods2.default)(apiKey, createApiKeyApi(http));
  return (0, _freezeSys2.default)(apiKey);
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw api key collection data
 * @return {ApiKeyCollection} Wrapped api key collection data
 */
function wrapApiKeyCollection(http, data) {
  var apiKeys = (0, _toPlainObject2.default)((0, _cloneDeep2.default)(data));
  apiKeys.items = apiKeys.items.map(function (entity) {
    return wrapApiKey(http, entity);
  });
  return (0, _freezeSys2.default)(apiKeys);
}
},{"../enhance-with-methods":13,"../instance-actions":26,"contentful-sdk-core/freeze-sys":105,"contentful-sdk-core/mixins/to-plain-object":106,"lodash/cloneDeep":295}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.wrapAsset = wrapAsset;
exports.wrapAssetCollection = wrapAssetCollection;

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _freezeSys = require('contentful-sdk-core/freeze-sys');

var _freezeSys2 = _interopRequireDefault(_freezeSys);

var _enhanceWithMethods = require('../enhance-with-methods');

var _enhanceWithMethods2 = _interopRequireDefault(_enhanceWithMethods);

var _toPlainObject = require('contentful-sdk-core/mixins/to-plain-object');

var _toPlainObject2 = _interopRequireDefault(_toPlainObject);

var _errorHandler = require('../error-handler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _instanceActions = require('../instance-actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ASSET_PROCESSING_CHECK_WAIT = 500;
var ASSET_PROCESSING_CHECK_RETRIES = 5;

/**
 * @typedef {Asset} Asset
 * @property {Object} sys - Standard system metadata with additional asset specific properties
 * @property {string} sys.locale - If present, indicates the locale which this asset uses
 * @property {Object} fields - Object with content for each field
 * @property {string} fields.title - Title for this asset
 * @property {string} fields.description - Description for this asset
 * @property {Object} fields.file - File object for this asset
 * @property {Object} fields.file.fileName - Name for the file
 * @property {string} fields.file.contentType - Mime type for the file
 * @property {string} fields.file.upload - Url where the file is available to be downloaded from, into the Contentful asset system. After the asset is processed this field is gone.
 * @property {string} fields.file.url - Url where the file is available at the Contentful media asset system. This field won't be available until the asset is processed.
 * @property {Object} fields.file.details - Details for the file, depending on file type (example: image size in bytes, etc)
 * @property {boolean} isPublished - checks if the asset is published. A published asset might have unpublished changes (@see {Asset.isUpdated})
 * @property {boolean} isUpdated - Checks if the asset is updated. This means the asset was previously published but has unpublished changes.
 * @property {boolean} isArchived - Checks if asset is archived. This means it's not exposed to the Delivery/Preview APIs.
 * @property {boolean} isDraft - Checks if the asset is in draft mode. This means it is not published.
 * @property {function(): Promise<Asset>} update - Updates an asset
 * @property {function(): Promise<Asset>} delete - Deletes an asset
 * @property {function(): Promise<Asset>} publish - publish an asset
 * @property {function(): Promise<Asset>} unPublish - unPublish an asset
 * @property {function(): Promise<Asset>} archive - archive an asset
 * @property {function(): Promise<Asset>} unArchive - unArchive an asset
 * @property {function(locale: string, options: {processingCheckWait: number, processingCheckRetries: number}): Promise<Asset>} processForLocale - Triggers asset processing after an upload, for the file uploaded to a specific locale.
 * @property {function(options: {processingCheckWait: number, processingCheckRetries: number}): Promise<Asset>} processForAllLocales - Triggers asset processing after an upload, for the files uploaded to all locales of an asset.
 * @property {function(): Object} toPlainObject - Returns this Asset as a plain JS object
 * @example
 *
 * // require contentful-management
 * var contentfulManagement = require('contentful-management')
 * var client = contentfulManagement.createClient({
 * // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
 * accessToken: 'YOUR_ACCESS_TOKEN'
 * })
 *
 * var space = await client.getSpace('SPACE_ID')
 * var asset = await space.getAsset('ASSET_ID')
 *
 * // Example Creating an asset
 * var createdAsset = await space.createAsset(
 *   fields: {
 *     file: {
 *       'en-US': {
 *          contentType: 'image/jpeg',
 *          fileName: 'filename_english.jpg',
 *          upload: 'http://example.com/filename_original_en.jpg'
 *       },
 *       'de-DE': {
 *          contentType: 'image/jpeg',
 *          fileName: 'filename_german.jpg',
 *          upload: 'http://example.com/filename_original_de.jpg'
 *       }
 *     }
 *   }
 * )
 *
 * // Example Updating an asset
 * asset.fields.title = 'My new Title'
 * asset.update()
 * .then(asset => console.log(asset.fields.name['en-US']))
 *
 * // Process an asset for a specific locale
 * asset.processForLocale('en-US')
 * .then(asset => console.log(asset.fields.file['en-US'].url))
 *
 * // Process Asset for all locales
 * asset.processForAllLocales()
 * .then(asset => console.log(asset.fields.file['en-US'].url, asset.fields.file['de-DE'].url))
 *
 * // Publish an asset
 * asset.publish()
 * .then(asset => console.log(asset.sys.publishedVersion))
 *
 * // Delete an asset
 * asset.delete()
 * .catch(err => console.log(err))
 *
 * // unPublish an asset
 * asset.unpublish()
 * .then(asset => console.log(asset.sys))
 *
 * // archive an asset
 * asset.archive()
 * .then(asset => console.log(asset.sys.archivedVersion))
 *
 * // unarchive an asset
 * asset.unarchive()
 * .then(asset => console.log(asset.sys))
 */

/**
 * @typedef {AssetCollection} AssetCollection
 * @property {number} total - Total amount of records in the server
 * @property {number} skip - A starting point of the collection
 * @property {number} limit - Amount of records in collection
 * @property {Asset[]} items - an array of assets
 * @property {function(): Object} toPlainObject - Returns this Asset collection as a plain JS object
 * @example
 *
 * // require contentful-management
 * var contentfulManagement = require('contentful-management')
 * var client = contentfulManagement.createClient({
 * // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
 * accessToken: 'YOUR_ACCESS_TOKEN'
 * })
 *
 * let space = await client.getSpace('SPACE_ID')
 * let assetCollection = await space.getAssets()
 * console.log("the space contains ", assetCollection.items.length, " assets")
 * assetCollection.items.forEach((asset) => {
 *    // do something with asset @link {Asset}
 * })
 */
function createAssetApi(http) {
  function checkIfAssetHasUrl(_ref) {
    var resolve = _ref.resolve,
        reject = _ref.reject,
        id = _ref.id,
        locale = _ref.locale,
        _ref$processingCheckW = _ref.processingCheckWait,
        processingCheckWait = _ref$processingCheckW === undefined ? ASSET_PROCESSING_CHECK_WAIT : _ref$processingCheckW,
        _ref$processingCheckR = _ref.processingCheckRetries,
        processingCheckRetries = _ref$processingCheckR === undefined ? ASSET_PROCESSING_CHECK_RETRIES : _ref$processingCheckR,
        _ref$checkCount = _ref.checkCount,
        checkCount = _ref$checkCount === undefined ? 0 : _ref$checkCount;

    http.get('assets/' + id).then(function (response) {
      return wrapAsset(http, response.data);
    }, _errorHandler2.default).then(function (asset) {
      if (asset.fields.file[locale].url) {
        resolve(asset);
      } else if (checkCount === processingCheckRetries) {
        var error = new Error();
        error.name = 'AssetProcessingTimeout';
        error.message = 'Asset is taking longer then expected to process.';
        reject(error);
      } else {
        checkCount++;
        setTimeout(function () {
          return checkIfAssetHasUrl({
            resolve: resolve,
            reject: reject,
            id: id,
            locale: locale,
            checkCount: checkCount,
            processingCheckWait: processingCheckWait,
            processingCheckRetries: processingCheckRetries
          });
        }, processingCheckWait);
      }
    });
  }

  function processForLocale(locale) {
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        processingCheckWait = _ref2.processingCheckWait,
        processingCheckRetries = _ref2.processingCheckRetries;

    var assetId = this.sys.id;
    return http.put('assets/' + this.sys.id + '/files/' + locale + '/process', null, {
      headers: {
        'X-Contentful-Version': this.sys.version
      }
    }).then(function () {
      return new _promise2.default(function (resolve, reject) {
        return checkIfAssetHasUrl({
          resolve: resolve,
          reject: reject,
          id: assetId,
          locale: locale,
          processingCheckWait: processingCheckWait,
          processingCheckRetries: processingCheckRetries
        });
      });
    }, _errorHandler2.default);
  }

  function processForAllLocales() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var self = this;
    var locales = (0, _keys2.default)(this.fields.file);
    return _promise2.default.all(locales.map(function (locale) {
      return processForLocale.call(self, locale, options);
    })).then(function (assets) {
      return assets[0];
    });
  }

  return {
    /**
     * Sends an update to the server with any changes made to the object's properties
     * @memberof Asset
     * @func update
     * @return {Promise<Asset>} Object returned from the server with updated changes.
     * @example
     */
    update: (0, _instanceActions.createUpdateEntity)({
      http: http,
      entityPath: 'assets',
      wrapperMethod: wrapAsset
    }),

    /**
     * Deletes this object on the server.
     * @memberof Asset
     * @func delete
     * @return {Promise} Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example
     */
    delete: (0, _instanceActions.createDeleteEntity)({
      http: http,
      entityPath: 'assets'
    }),

    /**
     * Publishes the object
     * @memberof Asset
     * @func publish
     * @return {Promise<Asset>} Object returned from the server with updated metadata.
     * @example
     */
    publish: (0, _instanceActions.createPublishEntity)({
      http: http,
      entityPath: 'assets',
      wrapperMethod: wrapAsset
    }),

    /**
     * Unpublishes the object
     * @memberof Asset
     * @func unpublish
     * @return {Promise<Asset>} Object returned from the server with updated metadata.
     * @example
     */
    unpublish: (0, _instanceActions.createUnpublishEntity)({
      http: http,
      entityPath: 'assets',
      wrapperMethod: wrapAsset
    }),

    /**
     * Archives the object
     * @memberof Asset
     * @func archive
     * @return {Promise<Asset>} Object returned from the server with updated metadata.
     * @example
     */
    archive: (0, _instanceActions.createArchiveEntity)({
      http: http,
      entityPath: 'assets',
      wrapperMethod: wrapAsset
    }),

    /**
     * Unarchives the object
     * @memberof Asset
     * @func unarchive
     * @return {Promise<Asset>} Object returned from the server with updated metadata.
     * @example
     */
    unarchive: (0, _instanceActions.createUnarchiveEntity)({
      http: http,
      entityPath: 'assets',
      wrapperMethod: wrapAsset
    }),

    /**
     * Triggers asset processing after an upload, for the file uploaded to a specific locale.
     * @memberof Asset
     * @func processForLocale
     * @param {string} locale - Locale which processing should be triggered for
     * @param {object} options - Additional options for processing
     * @prop {number} options.processingCheckWait - Time in milliseconds to wait before checking again if the asset has been processed (default: 500ms)
     * @prop {number} options.processingCheckRetries - Maximum amount of times to check if the asset has been processed (default: 5)
     * @return {Promise<Asset>} Object returned from the server with updated metadata.
     * @throws {AssetProcessingTimeout} If the asset takes too long to process. If this happens, retrieve the asset again, and if the url property is available, then processing has succeeded. If not, your file might be damaged.
     * @example
     */
    processForLocale: processForLocale,

    /**
     * Triggers asset processing after an upload, for the files uploaded to all locales of an asset.
     * @memberof Asset
     * @func processForAllLocales
     * @param {object} options - Additional options for processing
     * @prop {number} options.processingCheckWait - Time in milliseconds to wait before checking again if the asset has been processed (default: 500ms)
     * @prop {number} options.processingCheckRetries - Maximum amount of times to check if the asset has been processed (default: 5)
     * @return {Promise<Asset>} Object returned from the server with updated metadata.
     * @throws {AssetProcessingTimeout} If the asset takes too long to process. If this happens, retrieve the asset again, and if the url property is available, then processing has succeeded. If not, your file might be damaged.
     * @example
     * asset.processForAllLocales()
     * .then(asset => console.log(asset.fields.file['en-US'].url, asset.fields.file['de-DE'].url))
     */
    processForAllLocales: processForAllLocales,

    /**
     * Checks if the asset is published. A published asset might have unpublished changes (@see {Asset.isUpdated})
     * @memberof Asset
     * @func isPublished
     * @return {boolean}
     */
    isPublished: (0, _instanceActions.createPublishedChecker)(),

    /**
     * Checks if the asset is updated. This means the asset was previously published but has unpublished changes.
     * @memberof Asset
     * @func isUpdated
     * @return {boolean}
     */
    isUpdated: (0, _instanceActions.createUpdatedChecker)(),

    /**
     * Checks if the asset is in draft mode. This means it is not published.
     * @memberof Asset
     * @func isDraft
     * @return {boolean}
     */
    isDraft: (0, _instanceActions.createDraftChecker)(),

    /**
     * Checks if asset is archived. This means it's not exposed to the Delivery/Preview APIs.
     * @memberof Asset
     * @func isArchived
     * @return {boolean}
     */
    isArchived: (0, _instanceActions.createArchivedChecker)()
  };
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw asset data
 * @return {Asset} Wrapped asset data
 */
function wrapAsset(http, data) {
  var asset = (0, _toPlainObject2.default)((0, _cloneDeep2.default)(data));
  (0, _enhanceWithMethods2.default)(asset, createAssetApi(http));
  return (0, _freezeSys2.default)(asset);
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw asset collection data
 * @return {AssetCollection} Wrapped asset collection data
 */
function wrapAssetCollection(http, data) {
  var assets = (0, _toPlainObject2.default)((0, _cloneDeep2.default)(data));
  assets.items = assets.items.map(function (entity) {
    return wrapAsset(http, entity);
  });
  return (0, _freezeSys2.default)(assets);
}
},{"../enhance-with-methods":13,"../error-handler":25,"../instance-actions":26,"babel-runtime/core-js/object/keys":29,"babel-runtime/core-js/promise":30,"contentful-sdk-core/freeze-sys":105,"contentful-sdk-core/mixins/to-plain-object":106,"lodash/cloneDeep":295}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapContentType = wrapContentType;
exports.wrapContentTypeCollection = wrapContentTypeCollection;

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _freezeSys = require('contentful-sdk-core/freeze-sys');

var _freezeSys2 = _interopRequireDefault(_freezeSys);

var _enhanceWithMethods = require('../enhance-with-methods');

var _enhanceWithMethods2 = _interopRequireDefault(_enhanceWithMethods);

var _toPlainObject = require('contentful-sdk-core/mixins/to-plain-object');

var _toPlainObject2 = _interopRequireDefault(_toPlainObject);

var _instanceActions = require('../instance-actions');

var _editorInterface = require('./editor-interface');

var _errorHandler = require('../error-handler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {ContentType} ContentType
 * @property {Object} sys - System metadata
 * @property {string} name - name of the contentType
 * @property {string} description - description of the contentType
 * @property {string} displayField - Field used as the main display field for Entries
 * @property {Array<Field>} fields - All the fields contained in this Content Type
 * @property {function(): Object} toPlainObject() - Returns this Content Type as a plain JS object
 * @example
 * // require contentful-management
 * var contentfulManagement = require('contentful-management')
 * var client = contentfulManagement.createClient({
 * // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
 * accessToken: 'YOUR_ACCESS_TOKEN'
 * })
 *
 * //=======================================================================================================
 * // You can get an Entry object by
 * //
 * // 1. Creating one
 * //
 * // var contentType = await space.createContentType({name: 'Post', fields: []})
 * //
 * // OR
 * //
 * // 2. Get an existing one
 * //
 * // var contentType = await space.getContentType('contentTypeId')
 * //=======================================================================================================
 *
 * // Example updating a ContentType
 * contentType.name = 'New name'
 * contentType.update()
 * .then(contentType => console.log(contentType.name))
 *
 * //Example deleting a content type
 * contentType.delete()
 * .catch(err => console.log(err))
 */

/**
 * @typedef {ContentTypeCollection} ContentTypeCollection
 * @property {number} total - Total amount of records in the server
 * @property {number} skip - A starting point of the collection
 * @property {number} limit - Amount of records in collection
 * @property {ContentType[]} items - An array of contentTypes
 * @property {function(): Object} toPlainObject - Returns this Content Type collection as a plain JS object
 * @example
 *
 * // require contentful-management
 * var contentfulManagement = require('contentful-management')
 * var client = contentfulManagement.createClient({
 * // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
 * accessToken: 'YOUR_ACCESS_TOKEN'
 * })
 *
 * var space = await client.getSpace('SPACE_ID')
 * //Example getting contentTypes
 * space.getContentTypes()
 *  .then(contentTypes => console.log(contentTypes.items))
 */

function createContentTypeApi(http) {
  return {

    /**
     * Sends an update to the server with any changes made to the object's properties
     * @memberof ContentType
     * @func update
     * @return {Promise<ContentType>} Object returned from the server with updated changes.
     * @example
     * contentType.name = 'New name'
     * contentType.update()
     * .then(contentType => console.log(contentType.name))
     */
    update: (0, _instanceActions.createUpdateEntity)({
      http: http,
      entityPath: 'content_types',
      wrapperMethod: wrapContentType
    }),

    /**
     * Deletes this object on the server.
     * @memberof ContentType
     * @func delete
     * @return {Promise} Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example
     * contentType.delete()
     * .catch(err => console.log(err))
     */
    delete: (0, _instanceActions.createDeleteEntity)({
      http: http,
      entityPath: 'content_types'
    }),

    /**
     * Publishes the object
     * @memberof ContentType
     * @func publish
     * @return {Promise<ContentType>} Object returned from the server with updated metadata.
     * @example
     * contentType.publish()
     * .then(contentType => console.log(contentType.sys.publishedVersion))
     */
    publish: (0, _instanceActions.createPublishEntity)({
      http: http,
      entityPath: 'content_types',
      wrapperMethod: wrapContentType
    }),

    /**
     * Unpublishes the object
     * @memberof ContentType
     * @func unpublish
     * @return {Promise<ContentType>} Object returned from the server with updated metadata.
     * @example
     * contentType.unpublish()
     * .then(contentType => console.log(contentType.sys))
     */
    unpublish: (0, _instanceActions.createUnpublishEntity)({
      http: http,
      entityPath: 'content_types',
      wrapperMethod: wrapContentType
    }),

    /**
     * Gets the editor interface for the object <br />
     * <strong>Important note</strong>: The editor interface only represent a published contentType.<br />
     * To get the most recent representation of the contentType make sure to publish it first
     * @memberof ContentType
     * @func getEditorInterface
     * @return {Promise<EditorInterface.EditorInterface>} Object returned from the server with the current editor interface.
     * @example
     * contentType.getEditorInterface()
     * .then(editorInterface => console.log(editorInterface.controls))
     */
    getEditorInterface: function getEditorInterface() {
      return http.get('content_types/' + this.sys.id + '/editor_interface').then(function (response) {
        return (0, _editorInterface.wrapEditorInterface)(http, response.data);
      }, _errorHandler2.default);
    },
    /**
     * Checks if the contentType is published. A published contentType might have unpublished changes (@see {ContentType.isUpdated})
     * @memberof ContentType
     * @func isPublished
     * @return {boolean}
     */
    isPublished: (0, _instanceActions.createPublishedChecker)(),

    /**
     * Checks if the contentType is updated. This means the contentType was previously published but has unpublished changes.
     * @memberof ContentType
     * @func isUpdated
     * @return {boolean}
     */
    isUpdated: (0, _instanceActions.createUpdatedChecker)(),

    /**
     * Checks if the contentType is in draft mode. This means it is not published.
     * @memberof ContentType
     * @func isDraft
     * @return {boolean}
     */
    isDraft: (0, _instanceActions.createDraftChecker)()
  };
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw content type data
 * @return {ContentType} Wrapped content type data
 */
function wrapContentType(http, data) {
  var contentType = (0, _toPlainObject2.default)((0, _cloneDeep2.default)(data));
  (0, _enhanceWithMethods2.default)(contentType, createContentTypeApi(http));
  return (0, _freezeSys2.default)(contentType);
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw content type collection data
 * @return {ContentTypeCollection} Wrapped content type collection data
 */
function wrapContentTypeCollection(http, data) {
  var contentTypes = (0, _toPlainObject2.default)((0, _cloneDeep2.default)(data));
  contentTypes.items = contentTypes.items.map(function (entity) {
    return wrapContentType(http, entity);
  });
  return (0, _freezeSys2.default)(contentTypes);
}
},{"../enhance-with-methods":13,"../error-handler":25,"../instance-actions":26,"./editor-interface":17,"contentful-sdk-core/freeze-sys":105,"contentful-sdk-core/mixins/to-plain-object":106,"lodash/cloneDeep":295}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapEditorInterface = wrapEditorInterface;

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _freezeSys = require('contentful-sdk-core/freeze-sys');

var _freezeSys2 = _interopRequireDefault(_freezeSys);

var _enhanceWithMethods = require('../enhance-with-methods');

var _enhanceWithMethods2 = _interopRequireDefault(_enhanceWithMethods);

var _toPlainObject = require('contentful-sdk-core/mixins/to-plain-object');

var _toPlainObject2 = _interopRequireDefault(_toPlainObject);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _errorHandler = require('../error-handler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {Control} Control
 * @property {string} widgetId - defines how the field will look like e.g. singleLine
 * @property {string} fieldId - id of the field that this control is affecting
 * @property {Object} settings - settings for the widget
 */
/**
 * @typedef {EditorInterface} EditorInterface
 * @property {Object} sys - System metadata
 * @property {Control[]} controls - List of settings per field
 * @property {function(): Promise<EditorInterface>} update - Sends an update to the server with any changes made to the object's properties
 * @property {function(): Control} getControlForField - Gets a control for a specific field
 * @property {function(): Object} toPlainObject() - Returns this Content Type as a plain JS object
 * @example
 *
 * // require contentful-management
 * var contentfulManagement = require('contentful-management')
 * var client = contentfulManagement.createClient({
 * // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
 * accessToken: 'YOUR_ACCESS_TOKEN'
 * })
 *
 * // request our space from Contentful
 * var space = await client.getSpace('SPACE_ID')
 *
 * //=======================================================================================================
 * // web can get an editor interface in two ways
 * // 1. request our ContentType from Contentful
 * //
 * // var contentType = await space.getContentType('CONTENT_TYPE_ID')
 * //
 * //1.1 Get the editorInterface through the ContentType
 * //
 * // var editorInterface = await contentType.getEditorInterface()
 * //
 * // OR
 * //
 * // 2. get an editor interface from the Space object right away
 * //
 * // var editorInterface = await space.getEditorInterfaceForContentType('CONTENT_TYPE_ID')
 * //=======================================================================================================
 *
 * // we'll use option 2
 *
 * var editorInterface = await space.getEditorInterfaceForContentType('CONTENT_TYPE_ID')
 *
 * // Example Updating  and editor interface
 * editorInterface.controls[0] = { "fieldId": "title", "widgetId": "singleLine"}
 * editorInterface.update()
 * .then(editorInterface => console.log(editorInterface.controls))
 */

function createEditorInterfaceApi(http) {
  return {
    /**
     * Sends an update to the server with any changes made to the object's properties
     * @memberof EditorInterface
     * @func update
     * @return {Promise<EditorInterface>} Object returned from the server with updated changes.
     * @example
     * editorInterface.controls[0] = { "fieldId": "title", "widgetId": "singleLine"}
     * editorInterface.update()
     * .then(editorInterface => console.log(editorInterface.controls))
     */
    update: function update() {
      var raw = this.toPlainObject();
      var data = (0, _omit2.default)(raw, ['sys']);
      return http.put('content_types/' + this.sys.contentType.sys.id + '/editor_interface', data, {
        headers: { 'X-Contentful-Version': this.sys.version }
      }).then(function (response) {
        return wrapEditorInterface(http, response.data);
      }, _errorHandler2.default);
    },
    /**
     * gets a control for a specific field
     * @memberof EditorInterface
     * @func getControlForField
     * @return {?Object} control object for specific field.
     * @example
     * const control = editorInterface.getControlForField('fieldId')
     * console.log(control)
     */
    getControlForField: function getControlForField(fieldId) {
      var result = this.controls.filter(function (control) {
        return control.fieldId === fieldId;
      });
      return result && result.length > 0 ? result[0] : null;
    }
  };
}

/**
* @private
* @param {Object} http - HTTP client instance
* @param {Object} data - Raw editor-interface data
* @return {EditorInterface} Wrapped editor-interface data
*/
function wrapEditorInterface(http, data) {
  var editorInterface = (0, _toPlainObject2.default)((0, _cloneDeep2.default)(data));
  (0, _enhanceWithMethods2.default)(editorInterface, createEditorInterfaceApi(http));
  return (0, _freezeSys2.default)(editorInterface);
}
},{"../enhance-with-methods":13,"../error-handler":25,"contentful-sdk-core/freeze-sys":105,"contentful-sdk-core/mixins/to-plain-object":106,"lodash/cloneDeep":295,"lodash/omit":319}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapEntry = wrapEntry;
exports.wrapEntryCollection = wrapEntryCollection;

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _freezeSys = require('contentful-sdk-core/freeze-sys');

var _freezeSys2 = _interopRequireDefault(_freezeSys);

var _enhanceWithMethods = require('../enhance-with-methods');

var _enhanceWithMethods2 = _interopRequireDefault(_enhanceWithMethods);

var _toPlainObject = require('contentful-sdk-core/mixins/to-plain-object');

var _toPlainObject2 = _interopRequireDefault(_toPlainObject);

var _instanceActions = require('../instance-actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {Entry} Entry
 * @property {Object} sys - Standard system metadata with additional entry specific properties
 * @property {Object} sys.contentType - Content Type used by this Entry
 * @property {string} sys.locale - If present, indicates the locale which this entry uses
 * @property {Object} fields - Object with content for each field
 * @property {boolean} isPublished - Checks if the entry is published. A published entry might have unpublished changes (@see {Entry.isUpdated})
 * @property {boolean} isUpdated - Checks if the entry is updated. This means the entry was previously published but has unpublished changes.
 * @property {boolean} isDraft -  Checks if the entry is in draft mode. This means it is not published.
 * @property {boolean} isArchived - Checks if entry is archived. This means it's not exposed to the Delivery/Preview APIs.
 * @property {function(): Promise<Entry>} update - Updates an entry in the server
 * @property {function(): Promise<Entry>} delete - Deletes an entry on the server
 * @property {function(): Promise<Entry>} publish - Publishes an entry
 * @property {function(): Promise<Entry>} unPublish - Un-publishes an entry
 * @property {function(): Promise<Entry>} archive - Archives an entry
 * @property {function(): Promise<Entry>} unArchive - Un-archives an entry
 * @property {function(): Object} toPlainObject - Returns this Entry as a plain JS object
 * @example
 * // require contentful-management
 * var contentfulManagement = require('contentful-management')
 * var client = contentfulManagement.createClient({
 * // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
 * accessToken: 'YOUR_ACCESS_TOKEN'
 * })
 *
 * //=======================================================================================================
 * // You can get an Entry object by
 * //
 * // 1. Creating one
 * //
 * // var entry = await space.createEntry({})
 * //
 * // OR
 * //
 * // 2. Get an existing one
 * //
 * // var entry = await space.getEntry('ENTRY_ID')
 * //=======================================================================================================
 *
 * // Example updating an entry
 * entry.fields.name['en-US'] = 'Blog Post'
 * entry.update()
 * .then(entry => console.log(entry.fields.name['en-US']))
 *
 * // Example deleting an entry
 * entry.delete()
 * .catch(err => console.log(err))
 *
 * // Example publish an entry
 * entry.publish()
 * .then(entry => console.log(entry.sys.publishedVersion))
 *
 * // Example unPublishing an entry
 * entry.unpublish()
 * .then(entry => console.log(entry.sys))
 *
 * // Example archiving an entry
 * entry.archive()
 * .then(entry => console.log(entry.sys.archivedVersion))
 *
 * // Example unarchiving an entry
 * entry.unarchive()
 * .then(entry => console.log(entry.sys))
 */

/**
 * @typedef {EntryCollection} EntryCollection
 * @property {number} total - Total amount of records in the server
 * @property {number} skip - A starting point of the collection
 * @property {number} limit - Amount of records in collection
 * @property {Entry[]} items - array of entries
 * @property {Array<Object>} errors - Array of errors that might occur when retrieving entries.
 * @property {function(): Object} toPlainObject - Returns this Entry collection as a plain JS object
 */

function createEntryApi(http) {
  return {

    /**
     * Sends an update to the server with any changes made to the object's properties
     * @memberof Entry
     * @func update
     * @return {Promise<Entry>} Object returned from the server with updated changes.
     * @example
     * entry.fields.name['en-US'] = 'Blog Post'
     * entry.update()
     * .then(entry => console.log(entry.fields.name['en-US']))
     */
    update: (0, _instanceActions.createUpdateEntity)({
      http: http,
      entityPath: 'entries',
      wrapperMethod: wrapEntry
    }),

    /**
     * Deletes this object on the server.
     * @memberof Entry
     * @func delete
     * @return {Promise} Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example
     * entry.delete()
     * .catch(err => console.log(err))
     */
    delete: (0, _instanceActions.createDeleteEntity)({
      http: http,
      entityPath: 'entries'
    }),

    /**
     * Publishes the object
     * @memberof Entry
     * @func publish
     * @return {Promise<Entry>} Object returned from the server with updated metadata.
     * @example
     * entry.publish()
     * .then(entry => console.log(entry.sys.publishedVersion))
     */
    publish: (0, _instanceActions.createPublishEntity)({
      http: http,
      entityPath: 'entries',
      wrapperMethod: wrapEntry
    }),

    /**
     * Unpublishes the object
     * @memberof Entry
     * @func unpublish
     * @return {Promise<Entry>} Object returned from the server with updated metadata.
     * @example
     * entry.unpublish()
     * .then(entry => console.log(entry.sys))
     */
    unpublish: (0, _instanceActions.createUnpublishEntity)({
      http: http,
      entityPath: 'entries',
      wrapperMethod: wrapEntry
    }),

    /**
     * Archives the object
     * @memberof Entry
     * @func archive
     * @return {Promise<Entry>} Object returned from the server with updated metadata.
     * @example
     * entry.archive()
     * .then(entry => console.log(entry.sys.archivedVersion))
     */
    archive: (0, _instanceActions.createArchiveEntity)({
      http: http,
      entityPath: 'entries',
      wrapperMethod: wrapEntry
    }),

    /**
     * Unarchives the object
     * @memberof Entry
     * @func unarchive
     * @return {Promise<Entry>} Object returned from the server with updated metadata.
     * @example
     * entry.unarchive()
     * .then(entry => console.log(entry.sys))
     */
    unarchive: (0, _instanceActions.createUnarchiveEntity)({
      http: http,
      entityPath: 'entries',
      wrapperMethod: wrapEntry
    }),

    /**
     * Checks if the entry is published. A published entry might have unpublished changes (@see {Entry.isUpdated})
     * @memberof Entry
     * @func isPublished
     * @return {boolean}
     */
    isPublished: (0, _instanceActions.createPublishedChecker)(),

    /**
     * Checks if the entry is updated. This means the entry was previously published but has unpublished changes.
     * @memberof Entry
     * @func isUpdated
     * @return {boolean}
     */
    isUpdated: (0, _instanceActions.createUpdatedChecker)(),

    /**
     * Checks if the entry is in draft mode. This means it is not published.
     * @memberof Entry
     * @func isDraft
     * @return {boolean}
     */
    isDraft: (0, _instanceActions.createDraftChecker)(),

    /**
     * Checks if entry is archived. This means it's not exposed to the Delivery/Preview APIs.
     * @memberof Entry
     * @func isArchived
     * @return {boolean}
     */
    isArchived: (0, _instanceActions.createArchivedChecker)()
  };
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw entry data
 * @return {Entry} Wrapped entry data
 */
function wrapEntry(http, data) {
  var entry = (0, _toPlainObject2.default)((0, _cloneDeep2.default)(data));
  (0, _enhanceWithMethods2.default)(entry, createEntryApi(http));
  return (0, _freezeSys2.default)(entry);
}

/**
 * Data is also mixed in with link getters if links exist and includes were requested
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw entry collection data
 * @return {EntryCollection} Wrapped entry collection data
 */
function wrapEntryCollection(http, data, resolveLinks) {
  var entries = (0, _toPlainObject2.default)((0, _cloneDeep2.default)(data));
  entries.items = entries.items.map(function (entity) {
    return wrapEntry(http, entity);
  });
  return (0, _freezeSys2.default)(entries);
}
},{"../enhance-with-methods":13,"../instance-actions":26,"contentful-sdk-core/freeze-sys":105,"contentful-sdk-core/mixins/to-plain-object":106,"lodash/cloneDeep":295}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _space = require('./space');

var space = _interopRequireWildcard(_space);

var _entry = require('./entry');

var entry = _interopRequireWildcard(_entry);

var _asset = require('./asset');

var asset = _interopRequireWildcard(_asset);

var _contentType = require('./content-type');

var contentType = _interopRequireWildcard(_contentType);

var _editorInterface = require('./editor-interface');

var editorInterface = _interopRequireWildcard(_editorInterface);

var _locale = require('./locale');

var locale = _interopRequireWildcard(_locale);

var _webhook = require('./webhook');

var webhook = _interopRequireWildcard(_webhook);

var _spaceMembership = require('./space-membership');

var spaceMembership = _interopRequireWildcard(_spaceMembership);

var _role = require('./role');

var role = _interopRequireWildcard(_role);

var _apiKey = require('./api-key');

var apiKey = _interopRequireWildcard(_apiKey);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
  space: space,
  entry: entry,
  asset: asset,
  contentType: contentType,
  editorInterface: editorInterface,
  locale: locale,
  webhook: webhook,
  spaceMembership: spaceMembership,
  role: role,
  apiKey: apiKey
};
},{"./api-key":14,"./asset":15,"./content-type":16,"./editor-interface":17,"./entry":18,"./locale":20,"./role":21,"./space":23,"./space-membership":22,"./webhook":24}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapLocale = wrapLocale;
exports.wrapLocaleCollection = wrapLocaleCollection;

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _freezeSys = require('contentful-sdk-core/freeze-sys');

var _freezeSys2 = _interopRequireDefault(_freezeSys);

var _enhanceWithMethods = require('../enhance-with-methods');

var _enhanceWithMethods2 = _interopRequireDefault(_enhanceWithMethods);

var _toPlainObject = require('contentful-sdk-core/mixins/to-plain-object');

var _toPlainObject2 = _interopRequireDefault(_toPlainObject);

var _instanceActions = require('../instance-actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {Locale} Locale
 * @property {Object} sys - System metadata
 * @property {string} name
 * @property {string} code - Locale code (example: en-us)
 * @property {boolean} contentDeliveryApi - If the content under this locale should be available on the CDA (for public reading)
 * @property {boolean} contentManagementApi - If the content under this locale should be available on the CMA (for editing)
 * @property {boolean} default - If this is the default locale
 * @property {boolean} optional - If the locale needs to be filled in on entries or not
 * @property {function(): Object} toPlainObject - Returns this Locale as a plain JS object
 */

/**
 * @typedef {LocaleCollection} LocaleCollection
 * @property {number} total - Total amount of records in the server
 * @property {number} skip - A starting point of the collection
 * @property {number} limit - Amount of records in collection
 * @property {Array<Locale>} items - array of locales
 * @property {function(): Object} toPlainObject - Returns this Locale collection as a plain JS object
 */

function createLocaleApi(http) {
  return {
    /**
     * Sends an update to the server with any changes made to the object's properties
     * @memberof Locale
     * @func update
     * @return {Promise<Locale>} Object returned from the server with updated changes.
     * @example
     * locale.name = 'English'
     * locale.update()
     * .then(locale => console.log(locale.name))
     */
    update: function update() {
      var locale = this;
      // this property shouldn't be sent back if it exists
      delete locale.default;
      delete locale.fallback_code;
      delete locale.fallbackCode;
      return (0, _instanceActions.createUpdateEntity)({
        http: http,
        entityPath: 'locales',
        wrapperMethod: wrapLocale
      }).call(locale);
    },

    /**
     * Deletes this object on the server.
     * @memberof Locale
     * @func delete
     * @return {Promise} Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example
     * locale.delete()
     * .catch(err => console.log(err))
     */
    delete: (0, _instanceActions.createDeleteEntity)({
      http: http,
      entityPath: 'locales'
    })
  };
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw locale data
 * @return {Locale} Wrapped locale data
 */
function wrapLocale(http, data) {
  delete data.internal_code;
  var locale = (0, _toPlainObject2.default)((0, _cloneDeep2.default)(data));
  (0, _enhanceWithMethods2.default)(locale, createLocaleApi(http));
  return (0, _freezeSys2.default)(locale);
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw locale collection data
 * @return {LocaleCollection} Wrapped locale collection data
 */
function wrapLocaleCollection(http, data) {
  var locales = (0, _toPlainObject2.default)((0, _cloneDeep2.default)(data));
  locales.items = locales.items.map(function (entity) {
    return wrapLocale(http, entity);
  });
  return (0, _freezeSys2.default)(locales);
}
},{"../enhance-with-methods":13,"../instance-actions":26,"contentful-sdk-core/freeze-sys":105,"contentful-sdk-core/mixins/to-plain-object":106,"lodash/cloneDeep":295}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapRole = wrapRole;
exports.wrapRoleCollection = wrapRoleCollection;

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _freezeSys = require('contentful-sdk-core/freeze-sys');

var _freezeSys2 = _interopRequireDefault(_freezeSys);

var _enhanceWithMethods = require('../enhance-with-methods');

var _enhanceWithMethods2 = _interopRequireDefault(_enhanceWithMethods);

var _toPlainObject = require('contentful-sdk-core/mixins/to-plain-object');

var _toPlainObject2 = _interopRequireDefault(_toPlainObject);

var _instanceActions = require('../instance-actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @see https://www.contentful.com/developers/docs/references/content-management-api/#/reference/roles/create-a-role
 * @typedef {Role} Role
 * @property {Object} sys - System metadata
 * @property {string} name
 * @property {Object} permissions - Permissions for application sections
 * @property {Object} policies
 * @property {function(): Prmise<Role>} update - Sends an update to the server with any changes made to the object's properties
 * @property {function(): Prmise} delete - Deletes this object on the server.
 * @property {function(): Object} toPlainObject - Returns this Role as a plain JS object
 */

/**
 * @typedef {RoleCollection} RoleCollection
 * @property {number} total - Total amount of records in the server
 * @property {number} skip - A starting point of the collection
 * @property {number} limit - Amount of records in collection
 * @property {Role[]} items - an array of roles
 * @property {function(): Object} toPlainObject - Returns this Role collection as a plain JS object
 */

function createRoleApi(http) {
  return {

    /**
     * Sends an update to the server with any changes made to the object's properties
     * @memberof Role
     * @func update
     * @return {Promise<Role>} Object returned from the server with updated changes.
     * @example
     * role.name = 'New name'
     * role.update()
     * .then(role => console.log(role.name))
     */
    update: (0, _instanceActions.createUpdateEntity)({
      http: http,
      entityPath: 'roles',
      wrapperMethod: wrapRole
    }),

    /**
     * Deletes this object on the server.
     * @memberof Role
     * @func delete
     * @return {Promise} Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example
     * role.delete()
     * .catch(err => console.log(err))
     */
    delete: (0, _instanceActions.createDeleteEntity)({
      http: http,
      entityPath: 'roles'
    })
  };
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw role data
 * @return {Role} Wrapped role data
 */
/**
 * Role instances
 * @namespace Role
 */
function wrapRole(http, data) {
  var role = (0, _toPlainObject2.default)((0, _cloneDeep2.default)(data));
  (0, _enhanceWithMethods2.default)(role, createRoleApi(http));
  return (0, _freezeSys2.default)(role);
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw role collection data
 * @return {RoleCollection} Wrapped role collection data
 */
function wrapRoleCollection(http, data) {
  var roles = (0, _toPlainObject2.default)((0, _cloneDeep2.default)(data));
  roles.items = roles.items.map(function (entity) {
    return wrapRole(http, entity);
  });
  return (0, _freezeSys2.default)(roles);
}
},{"../enhance-with-methods":13,"../instance-actions":26,"contentful-sdk-core/freeze-sys":105,"contentful-sdk-core/mixins/to-plain-object":106,"lodash/cloneDeep":295}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapSpaceMembership = wrapSpaceMembership;
exports.wrapSpaceMembershipCollection = wrapSpaceMembershipCollection;

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _freezeSys = require('contentful-sdk-core/freeze-sys');

var _freezeSys2 = _interopRequireDefault(_freezeSys);

var _enhanceWithMethods = require('../enhance-with-methods');

var _enhanceWithMethods2 = _interopRequireDefault(_enhanceWithMethods);

var _toPlainObject = require('contentful-sdk-core/mixins/to-plain-object');

var _toPlainObject2 = _interopRequireDefault(_toPlainObject);

var _instanceActions = require('../instance-actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {SpaceMembership} SpaceMembership
 * @property {Object} sys - System metadata
 * @property {string} name
 * @property {boolean} admin - User is an admin
 * @property {Array} roles - Array of Role Links
 * @property {function(): Object} toPlainObject - Returns this Space Membership as a plain JS object
 */

/**
 * @typedef {SpaceMembershipCollection} SpaceMembershipCollection
 * @property {number} total - Total amount of records in the server
 * @property {number} skip - A starting point of the collection
 * @property {number} limit - Amount of records in collection
 * @property {Array<SpaceMembership.SpaceMembership>} items
 * @property {function(): Object} toPlainObject() - Returns this Space Membership collection as a plain JS object
 */

function createSpaceMembershipApi(http) {
  return {

    /**
     * Sends an update to the server with any changes made to the object's properties
     * @memberof SpaceMembership
     * @func update
     * @return {Promise<SpaceMembership>} Object returned from the server with updated changes.
     * @example
     * spaceMembership.name = 'New name'
     * spaceMembership.update()
     * .then(spaceMembership => console.log(spaceMembership.name))
     */
    update: (0, _instanceActions.createUpdateEntity)({
      http: http,
      entityPath: 'space_memberships',
      wrapperMethod: wrapSpaceMembership
    }),

    /**
     * Deletes this object on the server.
     * @memberof SpaceMembership
     * @func delete
     * @return {Promise} Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example
     * spaceMembership.delete()
     * .catch(err => console.log(err))
     */
    delete: (0, _instanceActions.createDeleteEntity)({
      http: http,
      entityPath: 'space_memberships'
    })
  };
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw space membership data
 * @return {SpaceMembership} Wrapped space membership data
 */
function wrapSpaceMembership(http, data) {
  var spaceMembership = (0, _toPlainObject2.default)((0, _cloneDeep2.default)(data));
  (0, _enhanceWithMethods2.default)(spaceMembership, createSpaceMembershipApi(http));
  return (0, _freezeSys2.default)(spaceMembership);
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw space membership collection data
 * @return {SpaceMembershipCollection} Wrapped space membership collection data
 */
function wrapSpaceMembershipCollection(http, data) {
  var spaceMemberships = (0, _toPlainObject2.default)((0, _cloneDeep2.default)(data));
  spaceMemberships.items = spaceMemberships.items.map(function (entity) {
    return wrapSpaceMembership(http, entity);
  });
  return (0, _freezeSys2.default)(spaceMemberships);
}
},{"../enhance-with-methods":13,"../instance-actions":26,"contentful-sdk-core/freeze-sys":105,"contentful-sdk-core/mixins/to-plain-object":106,"lodash/cloneDeep":295}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapSpace = wrapSpace;
exports.wrapSpaceCollection = wrapSpaceCollection;

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _freezeSys = require('contentful-sdk-core/freeze-sys');

var _freezeSys2 = _interopRequireDefault(_freezeSys);

var _toPlainObject = require('contentful-sdk-core/mixins/to-plain-object');

var _toPlainObject2 = _interopRequireDefault(_toPlainObject);

var _wrapHttpClient = require('contentful-sdk-core/wrap-http-client');

var _wrapHttpClient2 = _interopRequireDefault(_wrapHttpClient);

var _enhanceWithMethods = require('../enhance-with-methods');

var _enhanceWithMethods2 = _interopRequireDefault(_enhanceWithMethods);

var _createSpaceApi = require('../create-space-api');

var _createSpaceApi2 = _interopRequireDefault(_createSpaceApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This method creates the API for the given space with all the methods for
 * reading and creating other entities. It also passes down a clone of the
 * http client with a space id, so the base path for requests now has the
 * space id already set.
 * @private
 * @param  {Object} http - HTTP client instance
 * @param  {Object} data - API response for a Space
 * @return {Space}
 */
function wrapSpace(http, data) {
  var space = (0, _toPlainObject2.default)((0, _cloneDeep2.default)(data));
  var _http$httpClientParam = http.httpClientParams,
      rateLimit = _http$httpClientParam.rateLimit,
      rateLimitPeriod = _http$httpClientParam.rateLimitPeriod,
      maxRetries = _http$httpClientParam.maxRetries,
      retryOnTooManyRequests = _http$httpClientParam.retryOnTooManyRequests;

  var httpClientParams = {
    concurrency: rateLimit,
    delay: rateLimitPeriod,
    maxRetries: maxRetries,
    retryOnTooManyRequests: retryOnTooManyRequests
  };
  var spaceScopedHttpClient = (0, _wrapHttpClient2.default)(http.cloneWithNewParams({
    space: space.sys.id
  }), httpClientParams);
  var spaceApi = (0, _createSpaceApi2.default)({
    http: spaceScopedHttpClient
  });
  var enhancedSpace = (0, _enhanceWithMethods2.default)(space, spaceApi);
  return (0, _freezeSys2.default)(enhancedSpace);
}

/**
 * This method wraps each space in a collection with the space API. See wrapSpace
 * above for more details.
 * @private
 * @param  {Object} http - HTTP client instance
 * @param  {Object} data - API response for a Space collection
 * @return {SpaceCollection}
 */
function wrapSpaceCollection(http, data) {
  var spaces = (0, _toPlainObject2.default)((0, _cloneDeep2.default)(data));
  spaces.items = spaces.items.map(function (entity) {
    return wrapSpace(http, entity);
  });
  return (0, _freezeSys2.default)(spaces);
}
},{"../create-space-api":12,"../enhance-with-methods":13,"contentful-sdk-core/freeze-sys":105,"contentful-sdk-core/mixins/to-plain-object":106,"contentful-sdk-core/wrap-http-client":110,"lodash/cloneDeep":295}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapWebhook = wrapWebhook;
exports.wrapWebhookCollection = wrapWebhookCollection;

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _freezeSys = require('contentful-sdk-core/freeze-sys');

var _freezeSys2 = _interopRequireDefault(_freezeSys);

var _enhanceWithMethods = require('../enhance-with-methods');

var _enhanceWithMethods2 = _interopRequireDefault(_enhanceWithMethods);

var _toPlainObject = require('contentful-sdk-core/mixins/to-plain-object');

var _toPlainObject2 = _interopRequireDefault(_toPlainObject);

var _errorHandler = require('../error-handler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _instanceActions = require('../instance-actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @memberof Webhook
 * @typedef Webhook
 * @prop {Meta.Sys} sys - System metadata
 * @prop {string} name
 * @prop {string} url - Url which the webhook will call
 * @prop {string} httpBasicUsername - Username for basic HTTP authentication
 * @prop {string} httpBasicPassword - Password for basic HTTP authentication
 * @prop {object} headers - Key value pairs of additional headers to be sent with every webhook call.
 * @prop {array} topics - Topics which this webhook should be subscribed to. See https://www.contentful.com/developers/docs/references/content-management-api/#/reference/webhooks/create-a-webhook for more details
 * @prop {function(): Object} toPlainObject() - Returns this Webhook as a plain JS object
 */

/**
 * Webhook instances
 * @namespace Webhook
 */
function createWebhookApi(http) {
  return {

    /**
     * Sends an update to the server with any changes made to the object's properties
     * @memberof Webhook
     * @func update
     * @return {Promise<Webhook>} Object returned from the server with updated changes.
     * @example
     * webhook.name = 'New name'
     * webhook.update()
     * .then(webhook => console.log(webhook.name))
     */
    update: (0, _instanceActions.createUpdateEntity)({
      http: http,
      entityPath: 'webhook_definitions',
      wrapperMethod: wrapWebhook
    }),

    /**
     * Deletes this object on the server.
     * @memberof Webhook
     * @func delete
     * @return {Promise} Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example
     * webhook.delete()
     * .catch(err => console.log(err))
     */
    delete: (0, _instanceActions.createDeleteEntity)({
      http: http,
      entityPath: 'webhook_definitions'
    }),

    /**
     * List of the most recent webhook calls. See https://www.contentful.com/developers/docs/references/content-management-api/#/reference/webhook-calls/webhook-call-overviews for more details.
     * @memberof Webhook
     * @func getCalls
     * @return {Promise<object>} Promise for list of calls
     * @example
     * webhook.getCalls()
     * .then(calls => console.log(calls.items))
     */
    getCalls: function getCalls() {
      return http.get('webhooks/' + this.sys.id + '/calls').then(function (response) {
        return response.data;
      }, _errorHandler2.default);
    },

    /**
     * Webhook call with specific id. See https://www.contentful.com/developers/docs/references/content-management-api/#/reference/webhook-calls/webhook-call-overviews for more details
     * @memberof Webhook
     * @func getCalls
     * @return {Promise<object>} Promise for call details
     * @example
     * webhook.getCall('kjsdk1jeasd')
     * .then(call => console.log(call))
     */
    getCall: function getCall(id) {
      return http.get('webhooks/' + this.sys.id + '/calls/' + id).then(function (response) {
        return response.data;
      }, _errorHandler2.default);
    },

    /**
     * Overview of the health of webhook calls. See https://www.contentful.com/developers/docs/references/content-management-api/#/reference/webhook-calls/webhook-call-overviews for more details.
     * @memberof Webhook
     * @func getHealth
     * @return {Promise<object>} Promise for health info
     * @example
     * webhook.getHealth()
     * .then(health => console.log(health))
     */
    getHealth: function getHealth() {
      return http.get('webhooks/' + this.sys.id + '/health').then(function (response) {
        return response.data;
      }, _errorHandler2.default);
    }
  };
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw webhook data
 * @return {Webhook} Wrapped webhook data
 */
function wrapWebhook(http, data) {
  var webhook = (0, _toPlainObject2.default)((0, _cloneDeep2.default)(data));
  (0, _enhanceWithMethods2.default)(webhook, createWebhookApi(http));
  return (0, _freezeSys2.default)(webhook);
}

/**
 * @memberof Webhook
 * @typedef WebhookCollection
 * @prop {number} total
 * @prop {number} skip
 * @prop {number} limit
 * @prop {Array<Webhook.Webhook>} items
 * @prop {function(): Object} toPlainObject() - Returns this Webhook collection as a plain JS object
 */

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw webhook collection data
 * @return {WebhookCollection} Wrapped webhook collection data
 */
function wrapWebhookCollection(http, data) {
  var webhooks = (0, _toPlainObject2.default)((0, _cloneDeep2.default)(data));
  webhooks.items = webhooks.items.map(function (entity) {
    return wrapWebhook(http, entity);
  });
  return (0, _freezeSys2.default)(webhooks);
}
},{"../enhance-with-methods":13,"../error-handler":25,"../instance-actions":26,"contentful-sdk-core/freeze-sys":105,"contentful-sdk-core/mixins/to-plain-object":106,"lodash/cloneDeep":295}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = errorHandler;

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {ErrorResponse} ErrorResponse
 * @property {string} name - Error name. Usually refers to the sys.id returned on the
 * error server response. If that's not available or is unknown, it defaults to
 * the HTTP error code and status text.
 * @property {string} message - Stringified JSON object with request information,
 * HTTP response details and error details payload (if available). The `requestId`
 * property is internal to Contentful and it can be used when contacting support
 * about unusual errors.
 */

/**
 * Handles errors received from the server. Parses the error into a more useful
 * format, places it in an exception and throws it.
 * See https://www.contentful.com/developers/docs/references/content-management-api/#/introduction/errors
 * for more details on the data received on the errorResponse.data property
 * and the expected error codes.
 * @private
 * @param {Object} errorResponse - Error received from an axios request
 * @throws {ErrorResponse}
 */
function errorHandler(errorResponse) {
  var data = errorResponse.data,
      status = errorResponse.status,
      statusText = errorResponse.statusText,
      config = errorResponse.config;

  var errorData = {
    request: {
      url: config.url,
      headers: config.headers,
      method: config.method,
      payloadData: config.data
    },
    status: status,
    statusText: statusText
  };
  if (data.requestId) {
    errorData.requestId = data.requestId;
  }
  if ((0, _get2.default)(data, 'sys.type') === 'Error') {
    errorData.message = data.message;
    if (data.details) {
      errorData.details = data.details;
    }
  }
  var error = new Error();
  var errorName = (0, _get2.default)(data, 'sys.id');
  error.name = errorName && errorName !== 'Unknown' ? errorName : status + ' ' + statusText;
  error.message = (0, _stringify2.default)(errorData, null, '  ');
  throw error;
}
},{"babel-runtime/core-js/json/stringify":27,"lodash/get":300}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUpdateEntity = createUpdateEntity;
exports.createDeleteEntity = createDeleteEntity;
exports.createPublishEntity = createPublishEntity;
exports.createUnpublishEntity = createUnpublishEntity;
exports.createArchiveEntity = createArchiveEntity;
exports.createUnarchiveEntity = createUnarchiveEntity;
exports.createPublishedChecker = createPublishedChecker;
exports.createUpdatedChecker = createUpdatedChecker;
exports.createDraftChecker = createDraftChecker;
exports.createArchivedChecker = createArchivedChecker;

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _errorHandler = require('./error-handler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @private
 */
function createUpdateEntity(_ref) {
  var http = _ref.http,
      entityPath = _ref.entityPath,
      wrapperMethod = _ref.wrapperMethod;

  return function () {
    var raw = this.toPlainObject();
    var data = (0, _omit2.default)(raw, ['sys']);
    return http.put(entityPath + '/' + this.sys.id, data, {
      headers: {
        'X-Contentful-Version': this.sys.version
      }
    }).then(function (response) {
      return wrapperMethod(http, response.data);
    }, _errorHandler2.default);
  };
}

/**
 * @private
 */
function createDeleteEntity(_ref2) {
  var http = _ref2.http,
      entityPath = _ref2.entityPath;

  return function () {
    return http.delete(entityPath + '/' + this.sys.id).then(function (response) {}, _errorHandler2.default);
  };
}

/**
 * @private
 */
function createPublishEntity(_ref3) {
  var http = _ref3.http,
      entityPath = _ref3.entityPath,
      wrapperMethod = _ref3.wrapperMethod;

  return function () {
    return http.put(entityPath + '/' + this.sys.id + '/published', null, {
      headers: {
        'X-Contentful-Version': this.sys.version
      }
    }).then(function (response) {
      return wrapperMethod(http, response.data);
    }, _errorHandler2.default);
  };
}

/**
 * @private
 */
function createUnpublishEntity(_ref4) {
  var http = _ref4.http,
      entityPath = _ref4.entityPath,
      wrapperMethod = _ref4.wrapperMethod;

  return function () {
    return http.delete(entityPath + '/' + this.sys.id + '/published').then(function (response) {
      return wrapperMethod(http, response.data);
    }, _errorHandler2.default);
  };
}

/**
 * @private
 */
function createArchiveEntity(_ref5) {
  var http = _ref5.http,
      entityPath = _ref5.entityPath,
      wrapperMethod = _ref5.wrapperMethod;

  return function () {
    return http.put(entityPath + '/' + this.sys.id + '/archived').then(function (response) {
      return wrapperMethod(http, response.data);
    }, _errorHandler2.default);
  };
}

/**
 * @private
 */
function createUnarchiveEntity(_ref6) {
  var http = _ref6.http,
      entityPath = _ref6.entityPath,
      wrapperMethod = _ref6.wrapperMethod;

  return function () {
    return http.delete(entityPath + '/' + this.sys.id + '/archived').then(function (response) {
      return wrapperMethod(http, response.data);
    }, _errorHandler2.default);
  };
}

/**
 * @private
 */
function createPublishedChecker() {
  return function () {
    return !!this.sys.publishedVersion;
  };
}

/**
 * @private
 */
function createUpdatedChecker() {
  return function () {
    // The act of publishing an entity increases its version by 1, so any entry which has
    // 2 versions higher or more than the publishedVersion has unpublished changes.
    return this.sys.publishedVersion && this.sys.version > this.sys.publishedVersion + 1;
  };
}

/**
 * @private
 */
function createDraftChecker() {
  return function () {
    return !this.sys.publishedVersion;
  };
}

/**
 * @private
 */
function createArchivedChecker() {
  return function () {
    return !!this.sys.archivedVersion;
  };
}
},{"./error-handler":25,"lodash/omit":319}],27:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"core-js/library/fn/json/stringify":31,"dup":3}],28:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":32}],29:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":33}],30:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"core-js/library/fn/promise":34,"dup":5}],31:[function(require,module,exports){
var core  = require('../../modules/_core')
  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};
},{"../../modules/_core":42}],32:[function(require,module,exports){
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};
},{"../../modules/_core":42,"../../modules/es6.object.define-property":95}],33:[function(require,module,exports){
require('../../modules/es6.object.keys');
module.exports = require('../../modules/_core').Object.keys;
},{"../../modules/_core":42,"../../modules/es6.object.keys":96}],34:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
module.exports = require('../modules/_core').Promise;
},{"../modules/_core":42,"../modules/es6.object.to-string":97,"../modules/es6.promise":98,"../modules/es6.string.iterator":99,"../modules/web.dom.iterable":100}],35:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],36:[function(require,module,exports){
module.exports = function(){ /* empty */ };
},{}],37:[function(require,module,exports){
module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};
},{}],38:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./_is-object":59}],39:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject')
  , toLength  = require('./_to-length')
  , toIndex   = require('./_to-index');
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};
},{"./_to-index":85,"./_to-iobject":87,"./_to-length":88}],40:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof')
  , TAG = require('./_wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./_cof":41,"./_wks":92}],41:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],42:[function(require,module,exports){
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],43:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./_a-function":35}],44:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],45:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_fails":49}],46:[function(require,module,exports){
var isObject = require('./_is-object')
  , document = require('./_global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./_global":51,"./_is-object":59}],47:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');
},{}],48:[function(require,module,exports){
var global    = require('./_global')
  , core      = require('./_core')
  , ctx       = require('./_ctx')
  , hide      = require('./_hide')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;
},{"./_core":42,"./_ctx":43,"./_global":51,"./_hide":53}],49:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],50:[function(require,module,exports){
var ctx         = require('./_ctx')
  , call        = require('./_iter-call')
  , isArrayIter = require('./_is-array-iter')
  , anObject    = require('./_an-object')
  , toLength    = require('./_to-length')
  , getIterFn   = require('./core.get-iterator-method')
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;
},{"./_an-object":38,"./_ctx":43,"./_is-array-iter":58,"./_iter-call":60,"./_to-length":88,"./core.get-iterator-method":93}],51:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],52:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],53:[function(require,module,exports){
var dP         = require('./_object-dp')
  , createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./_descriptors":45,"./_object-dp":69,"./_property-desc":75}],54:[function(require,module,exports){
module.exports = require('./_global').document && document.documentElement;
},{"./_global":51}],55:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function(){
  return Object.defineProperty(require('./_dom-create')('div'), 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_descriptors":45,"./_dom-create":46,"./_fails":49}],56:[function(require,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};
},{}],57:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./_cof":41}],58:[function(require,module,exports){
// check on default Array iterator
var Iterators  = require('./_iterators')
  , ITERATOR   = require('./_wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./_iterators":65,"./_wks":92}],59:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],60:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./_an-object":38}],61:[function(require,module,exports){
'use strict';
var create         = require('./_object-create')
  , descriptor     = require('./_property-desc')
  , setToStringTag = require('./_set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./_hide":53,"./_object-create":68,"./_property-desc":75,"./_set-to-string-tag":79,"./_wks":92}],62:[function(require,module,exports){
'use strict';
var LIBRARY        = require('./_library')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , hide           = require('./_hide')
  , has            = require('./_has')
  , Iterators      = require('./_iterators')
  , $iterCreate    = require('./_iter-create')
  , setToStringTag = require('./_set-to-string-tag')
  , getPrototypeOf = require('./_object-gpo')
  , ITERATOR       = require('./_wks')('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./_export":48,"./_has":52,"./_hide":53,"./_iter-create":61,"./_iterators":65,"./_library":66,"./_object-gpo":71,"./_redefine":77,"./_set-to-string-tag":79,"./_wks":92}],63:[function(require,module,exports){
var ITERATOR     = require('./_wks')('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./_wks":92}],64:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],65:[function(require,module,exports){
module.exports = {};
},{}],66:[function(require,module,exports){
module.exports = true;
},{}],67:[function(require,module,exports){
var global    = require('./_global')
  , macrotask = require('./_task').set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = require('./_cof')(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};
},{"./_cof":41,"./_global":51,"./_task":84}],68:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = require('./_an-object')
  , dPs         = require('./_object-dps')
  , enumBugKeys = require('./_enum-bug-keys')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":38,"./_dom-create":46,"./_enum-bug-keys":47,"./_html":54,"./_object-dps":70,"./_shared-key":80}],69:[function(require,module,exports){
var anObject       = require('./_an-object')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , toPrimitive    = require('./_to-primitive')
  , dP             = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};
},{"./_an-object":38,"./_descriptors":45,"./_ie8-dom-define":55,"./_to-primitive":90}],70:[function(require,module,exports){
var dP       = require('./_object-dp')
  , anObject = require('./_an-object')
  , getKeys  = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};
},{"./_an-object":38,"./_descriptors":45,"./_object-dp":69,"./_object-keys":73}],71:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = require('./_has')
  , toObject    = require('./_to-object')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};
},{"./_has":52,"./_shared-key":80,"./_to-object":89}],72:[function(require,module,exports){
var has          = require('./_has')
  , toIObject    = require('./_to-iobject')
  , arrayIndexOf = require('./_array-includes')(false)
  , IE_PROTO     = require('./_shared-key')('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};
},{"./_array-includes":39,"./_has":52,"./_shared-key":80,"./_to-iobject":87}],73:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = require('./_object-keys-internal')
  , enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};
},{"./_enum-bug-keys":47,"./_object-keys-internal":72}],74:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./_export')
  , core    = require('./_core')
  , fails   = require('./_fails');
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"./_core":42,"./_export":48,"./_fails":49}],75:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],76:[function(require,module,exports){
var hide = require('./_hide');
module.exports = function(target, src, safe){
  for(var key in src){
    if(safe && target[key])target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};
},{"./_hide":53}],77:[function(require,module,exports){
module.exports = require('./_hide');
},{"./_hide":53}],78:[function(require,module,exports){
'use strict';
var global      = require('./_global')
  , core        = require('./_core')
  , dP          = require('./_object-dp')
  , DESCRIPTORS = require('./_descriptors')
  , SPECIES     = require('./_wks')('species');

module.exports = function(KEY){
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./_core":42,"./_descriptors":45,"./_global":51,"./_object-dp":69,"./_wks":92}],79:[function(require,module,exports){
var def = require('./_object-dp').f
  , has = require('./_has')
  , TAG = require('./_wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./_has":52,"./_object-dp":69,"./_wks":92}],80:[function(require,module,exports){
var shared = require('./_shared')('keys')
  , uid    = require('./_uid');
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};
},{"./_shared":81,"./_uid":91}],81:[function(require,module,exports){
var global = require('./_global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./_global":51}],82:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = require('./_an-object')
  , aFunction = require('./_a-function')
  , SPECIES   = require('./_wks')('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};
},{"./_a-function":35,"./_an-object":38,"./_wks":92}],83:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , defined   = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./_defined":44,"./_to-integer":86}],84:[function(require,module,exports){
var ctx                = require('./_ctx')
  , invoke             = require('./_invoke')
  , html               = require('./_html')
  , cel                = require('./_dom-create')
  , global             = require('./_global')
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(require('./_cof')(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"./_cof":41,"./_ctx":43,"./_dom-create":46,"./_global":51,"./_html":54,"./_invoke":56}],85:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"./_to-integer":86}],86:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],87:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject')
  , defined = require('./_defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./_defined":44,"./_iobject":57}],88:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./_to-integer":86}],89:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./_defined":44}],90:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};
},{"./_is-object":59}],91:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],92:[function(require,module,exports){
var store      = require('./_shared')('wks')
  , uid        = require('./_uid')
  , Symbol     = require('./_global').Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;
},{"./_global":51,"./_shared":81,"./_uid":91}],93:[function(require,module,exports){
var classof   = require('./_classof')
  , ITERATOR  = require('./_wks')('iterator')
  , Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./_classof":40,"./_core":42,"./_iterators":65,"./_wks":92}],94:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables')
  , step             = require('./_iter-step')
  , Iterators        = require('./_iterators')
  , toIObject        = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"./_add-to-unscopables":36,"./_iter-define":62,"./_iter-step":64,"./_iterators":65,"./_to-iobject":87}],95:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', {defineProperty: require('./_object-dp').f});
},{"./_descriptors":45,"./_export":48,"./_object-dp":69}],96:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object')
  , $keys    = require('./_object-keys');

require('./_object-sap')('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});
},{"./_object-keys":73,"./_object-sap":74,"./_to-object":89}],97:[function(require,module,exports){

},{}],98:[function(require,module,exports){
'use strict';
var LIBRARY            = require('./_library')
  , global             = require('./_global')
  , ctx                = require('./_ctx')
  , classof            = require('./_classof')
  , $export            = require('./_export')
  , isObject           = require('./_is-object')
  , aFunction          = require('./_a-function')
  , anInstance         = require('./_an-instance')
  , forOf              = require('./_for-of')
  , speciesConstructor = require('./_species-constructor')
  , task               = require('./_task').set
  , microtask          = require('./_microtask')()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});
},{"./_a-function":35,"./_an-instance":37,"./_classof":40,"./_core":42,"./_ctx":43,"./_export":48,"./_for-of":50,"./_global":51,"./_is-object":59,"./_iter-detect":63,"./_library":66,"./_microtask":67,"./_redefine-all":76,"./_set-species":78,"./_set-to-string-tag":79,"./_species-constructor":82,"./_task":84,"./_wks":92}],99:[function(require,module,exports){
'use strict';
var $at  = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./_iter-define":62,"./_string-at":83}],100:[function(require,module,exports){
require('./es6.array.iterator');
var global        = require('./_global')
  , hide          = require('./_hide')
  , Iterators     = require('./_iterators')
  , TO_STRING_TAG = require('./_wks')('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}
},{"./_global":51,"./_hide":53,"./_iterators":65,"./_wks":92,"./es6.array.iterator":94}],101:[function(require,module,exports){
module.exports = '1.3.1'

},{}],102:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = createBackoff;

var _promisedWait = require('./promised-wait');

var _promisedWait2 = _interopRequireDefault(_promisedWait);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a wrapper method which waits a given amount of time before calling
 * wrapped method.
 * If the call to the wrapped method fails, retries `maxRetries` times, and if
 * all those fail, it returns a rejected promise.
 * @private
 * @param {number} maxRetries - max number of retries before aborting
 */
function createBackoff(maxRetries) {
  var attempt = 0;
  return function maybeRetry(error, retry) {
    if (attempt < maxRetries) {
      var waitTime = error.headers && error.headers['X-Contentful-RateLimit-Reset'] || Math.pow(2, attempt);
      attempt++;
      // add a randomized buffer before recalling the api
      // The random buffer ensure that not all the backed-off requests are resent at the same time
      waitTime *= 1000 * (Math.random() * 1.2 + 1);
      return (0, _promisedWait2.default)(waitTime).then(retry);
    } else {
      return _promise2.default.reject(error);
    }
  };
}
},{"./promised-wait":107,"babel-runtime/core-js/promise":5}],103:[function(require,module,exports){
(function (process){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = createHttpClient;

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _assign = require('lodash/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create pre configured axios instance
 * @private
 * @param {Object} axios - Axios library
 * @param {Object} httpClientParams - Initialization parameters for the HTTP client
 * @prop {string} space - Space ID
 * @prop {string} accessToken - Access Token
 * @prop {boolean=} insecure - If we should use http instead
 * @prop {string=} host - Alternate host
 * @prop {Object=} agent - HTTP agent for node
 * @prop {Object=} headers - Additional headers
 * @return {Object} Initialized axios instance
 */
function createHttpClient(axios, httpClientParams) {
  var space = httpClientParams.space,
      accessToken = httpClientParams.accessToken,
      insecure = httpClientParams.insecure,
      host = httpClientParams.host,
      defaultHostname = httpClientParams.defaultHostname,
      agent = httpClientParams.agent;
  var headers = httpClientParams.headers;

  var _ref = host && host.split(':') || [],
      _ref2 = (0, _slicedToArray3.default)(_ref, 2),
      hostname = _ref2[0],
      port = _ref2[1];

  hostname = hostname || defaultHostname;
  port = port || (insecure ? 80 : 443);
  var baseURL = (insecure ? 'http' : 'https') + '://' + hostname + ':' + port + '/spaces/';
  if (space) {
    baseURL += space + '/';
  }
  headers = headers || {};
  headers['Authorization'] = 'Bearer ' + accessToken;

  // Set these headers only for node because browsers don't like it when you
  // override user-agent or accept-encoding.
  // The SDKs should set their own X-Contentful-User-Agent.
  if (process && process.release && process.release.name === 'node') {
    headers['user-agent'] = 'node.js/' + process.version;
    headers['Accept-Encoding'] = 'gzip';
  }

  var instance = axios.create({
    baseURL: baseURL,
    headers: headers,
    agent: agent,
    paramsSerializer: _qs2.default.stringify
  });
  instance.httpClientParams = httpClientParams;

  /**
   * Creates a new axios instance with the same default base parameters as the
   * current one, and with any overrides passed to the newParams object
   * This is useful as the SDKs use dependency injection to get the axios library
   * and the version of the library comes from different places depending
   * on whether it's a browser build or a node.js build.
   * @private
   * @param {Object} httpClientParams - Initialization parameters for the HTTP client
   * @return {Object} Initialized axios instance
   */
  instance.cloneWithNewParams = function (newParams) {
    return createHttpClient(axios, (0, _assign2.default)((0, _cloneDeep2.default)(httpClientParams), newParams));
  };

  return instance;
}
}).call(this,require('_process'))
},{"_process":327,"babel-runtime/helpers/slicedToArray":7,"lodash/assign":293,"lodash/cloneDeep":295,"qs":329}],104:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createRequestConfig;

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates request parameters configuration by parsing an existing query object
 * @private
 * @param {Object} query
 * @return {Object} Config object with `params` property, ready to be used in axios
 */
function createRequestConfig(_ref) {
  var query = _ref.query;

  var config = {};
  delete query.resolveLinks;
  config.params = (0, _cloneDeep2.default)(query);
  return config;
}
},{"lodash/cloneDeep":295}],105:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _freeze = require('babel-runtime/core-js/object/freeze');

var _freeze2 = _interopRequireDefault(_freeze);

exports.default = freezeSys;

var _each = require('lodash/each');

var _each2 = _interopRequireDefault(_each);

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function freezeObjectDeep(obj) {
  (0, _each2.default)(obj, function (value, key) {
    if ((0, _isPlainObject2.default)(value)) {
      freezeObjectDeep(value);
    }
  });
  return (0, _freeze2.default)(obj);
}

function freezeSys(obj) {
  freezeObjectDeep(obj.sys);
  return obj;
}
},{"babel-runtime/core-js/object/freeze":4,"lodash/each":297,"lodash/isPlainObject":312}],106:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mixinToPlainObject;

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Mixes in a method to return just a plain object with no additional methods
 * @private
 * @param {Object} data - Any plain JSON response returned from the API
 * @return {Object} Enhanced object with toPlainObject method
 */
function mixinToPlainObject(data) {
  return Object.defineProperty(data, 'toPlainObject', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function value() {
      return (0, _cloneDeep2.default)(this);
    }
  });
}
},{"lodash/cloneDeep":295}],107:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

exports.default = promisedWait;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function promisedWait(ms) {
  return new _promise2.default(function (resolve) {
    setTimeout(resolve, ms || 3000);
  });
}
},{"babel-runtime/core-js/promise":5}],108:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = rateLimit;

var _promisedWait = require('./promised-wait');

var _promisedWait2 = _interopRequireDefault(_promisedWait);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Promise-based rate limiting of a function. Assumes that the passed in
 * function will return a Promise.
 * Queues calls made to the wrapped function, and if more calls are made than
 * the allowed level of concurrency waits until a certain amount of time has
 * passed before continuing to clear calls from the queue.
 * @private
 * @param {Function} fn - call to be rate limited
 * @param {number} concurrency - Number of allowed concurrent requests
 * @param {number} delay - Delay in milliseconds for waiting after hitting the
 */
function rateLimit(fn, concurrency, delay) {
  concurrency = positiveInteger('concurrency', concurrency);
  delay = positiveInteger('delay', delay);
  var callQueue = [];
  var inFlight = 0;

  function shift() {
    if (inFlight >= concurrency) {
      return;
    }

    var start = new Date().getTime();

    if (callQueue.length) {
      var call = callQueue.shift();
      inFlight++;

      var result = void 0;
      try {
        // call the wrapped method
        var tmp = _promise2.default.resolve(fn.apply(call.self, call.args));
        // resolve the call with a possibly rejected promise
        call.resolve(tmp);
        // rate-limiting doesn't care about errors
        result = tmp.catch(function () {});
      } catch (err) {
        call.reject(err);
        result = _promise2.default.resolve();
      }

      // If this request completed faster than our rate-limit would
      // allow, wait the appropriate amount of time before marking the
      // request as finished.
      result.then(maybeWait).then(goToNextCall);
    }

    function maybeWait() {
      var duration = start - new Date().getTime();
      if (duration < delay) {
        return (0, _promisedWait2.default)(delay - duration);
      }
    }
  }

  function goToNextCall() {
    inFlight--;
    shift();
  }

  return function () /* wrapped method arguments */{
    var self = this;
    var args = Array.prototype.slice.call(arguments);
    return new _promise2.default(function (resolve, reject) {
      callQueue.push({
        reject: reject,
        resolve: resolve,
        self: self,
        args: args
      });
      shift();
    });
  };
}

function positiveInteger(name, value) {
  value = parseInt(value, 10);
  if (isNaN(value) || value < 1) {
    throw new TypeError(name + ' must be a positive integer');
  }
  return value;
}
},{"./promised-wait":107,"babel-runtime/core-js/promise":5}],109:[function(require,module,exports){
(function (process){
'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/* axios v0.9.1 | (c) 2016 by Matt Zabriskie */
(function webpackUniversalModuleDefinition(root, factory) {
	if ((typeof exports === 'undefined' ? 'undefined' : (0, _typeof3.default)(exports)) === 'object' && (typeof module === 'undefined' ? 'undefined' : (0, _typeof3.default)(module)) === 'object') module.exports = factory();else if (typeof define === 'function' && define.amd) define([], factory);else if ((typeof exports === 'undefined' ? 'undefined' : (0, _typeof3.default)(exports)) === 'object') exports["axios"] = factory();else root["axios"] = factory();
})(undefined, function () {
	return (/******/function (modules) {
			// webpackBootstrap
			/******/ // The module cache
			/******/var installedModules = {};
			/******/
			/******/ // The require function
			/******/function __webpack_require__(moduleId) {
				/******/
				/******/ // Check if module is in cache
				/******/if (installedModules[moduleId])
					/******/return installedModules[moduleId].exports;
				/******/
				/******/ // Create a new module (and put it into the cache)
				/******/var module = installedModules[moduleId] = {
					/******/exports: {},
					/******/id: moduleId,
					/******/loaded: false
					/******/ };
				/******/
				/******/ // Execute the module function
				/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
				/******/
				/******/ // Flag the module as loaded
				/******/module.loaded = true;
				/******/
				/******/ // Return the exports of the module
				/******/return module.exports;
				/******/
			}
			/******/
			/******/
			/******/ // expose the modules object (__webpack_modules__)
			/******/__webpack_require__.m = modules;
			/******/
			/******/ // expose the module cache
			/******/__webpack_require__.c = installedModules;
			/******/
			/******/ // __webpack_public_path__
			/******/__webpack_require__.p = "";
			/******/
			/******/ // Load entry module and return exports
			/******/return __webpack_require__(0);
			/******/
		}(
		/************************************************************************/
		/******/[
		/* 0 */
		/***/function (module, exports, __webpack_require__) {

			module.exports = __webpack_require__(1);

			/***/
		},
		/* 1 */
		/***/function (module, exports, __webpack_require__) {

			'use strict';

			var defaults = __webpack_require__(2);
			var utils = __webpack_require__(3);
			var dispatchRequest = __webpack_require__(4);
			var InterceptorManager = __webpack_require__(12);
			var isAbsoluteURL = __webpack_require__(13);
			var combineURLs = __webpack_require__(14);
			var bind = __webpack_require__(15);
			var transformData = __webpack_require__(8);

			function Axios(defaultConfig) {
				this.defaults = utils.merge({}, defaultConfig);
				this.interceptors = {
					request: new InterceptorManager(),
					response: new InterceptorManager()
				};
			}

			Axios.prototype.request = function request(config) {
				/*eslint no-param-reassign:0*/
				// Allow for axios('example/url'[, config]) a la fetch API
				if (typeof config === 'string') {
					config = utils.merge({
						url: arguments[0]
					}, arguments[1]);
				}

				config = utils.merge(defaults, this.defaults, { method: 'get' }, config);

				// Support baseURL config
				if (config.baseURL && !isAbsoluteURL(config.url)) {
					config.url = combineURLs(config.baseURL, config.url);
				}

				// Don't allow overriding defaults.withCredentials
				config.withCredentials = config.withCredentials || this.defaults.withCredentials;

				// Transform request data
				config.data = transformData(config.data, config.headers, config.transformRequest);

				// Flatten headers
				config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers || {});

				utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
					delete config.headers[method];
				});

				// Hook up interceptors middleware
				var chain = [dispatchRequest, undefined];
				var promise = _promise2.default.resolve(config);

				this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
					chain.unshift(interceptor.fulfilled, interceptor.rejected);
				});

				this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
					chain.push(interceptor.fulfilled, interceptor.rejected);
				});

				while (chain.length) {
					promise = promise.then(chain.shift(), chain.shift());
				}

				return promise;
			};

			var defaultInstance = new Axios(defaults);
			var axios = module.exports = bind(Axios.prototype.request, defaultInstance);

			axios.create = function create(defaultConfig) {
				return new Axios(defaultConfig);
			};

			// Expose defaults
			axios.defaults = defaultInstance.defaults;

			// Expose all/spread
			axios.all = function all(promises) {
				return _promise2.default.all(promises);
			};
			axios.spread = __webpack_require__(16);

			// Expose interceptors
			axios.interceptors = defaultInstance.interceptors;

			// Provide aliases for supported request methods
			utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
				/*eslint func-names:0*/
				Axios.prototype[method] = function (url, config) {
					return this.request(utils.merge(config || {}, {
						method: method,
						url: url
					}));
				};
				axios[method] = bind(Axios.prototype[method], defaultInstance);
			});

			utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
				/*eslint func-names:0*/
				Axios.prototype[method] = function (url, data, config) {
					return this.request(utils.merge(config || {}, {
						method: method,
						url: url,
						data: data
					}));
				};
				axios[method] = bind(Axios.prototype[method], defaultInstance);
			});

			/***/
		},
		/* 2 */
		/***/function (module, exports, __webpack_require__) {

			'use strict';

			var utils = __webpack_require__(3);

			var PROTECTION_PREFIX = /^\)\]\}',?\n/;
			var DEFAULT_CONTENT_TYPE = {
				'Content-Type': 'application/x-www-form-urlencoded'
			};

			module.exports = {
				transformRequest: [function transformResponseJSON(data, headers) {
					if (utils.isFormData(data)) {
						return data;
					}
					if (utils.isArrayBuffer(data)) {
						return data;
					}
					if (utils.isArrayBufferView(data)) {
						return data.buffer;
					}
					if (utils.isObject(data) && !utils.isFile(data) && !utils.isBlob(data)) {
						// Set application/json if no Content-Type has been specified
						if (!utils.isUndefined(headers)) {
							utils.forEach(headers, function processContentTypeHeader(val, key) {
								if (key.toLowerCase() === 'content-type') {
									headers['Content-Type'] = val;
								}
							});

							if (utils.isUndefined(headers['Content-Type'])) {
								headers['Content-Type'] = 'application/json;charset=utf-8';
							}
						}
						return (0, _stringify2.default)(data);
					}
					return data;
				}],

				transformResponse: [function transformResponseJSON(data) {
					/*eslint no-param-reassign:0*/
					if (typeof data === 'string') {
						data = data.replace(PROTECTION_PREFIX, '');
						try {
							data = JSON.parse(data);
						} catch (e) {/* Ignore */}
					}
					return data;
				}],

				headers: {
					common: {
						'Accept': 'application/json, text/plain, */*'
					},
					patch: utils.merge(DEFAULT_CONTENT_TYPE),
					post: utils.merge(DEFAULT_CONTENT_TYPE),
					put: utils.merge(DEFAULT_CONTENT_TYPE)
				},

				timeout: 0,

				xsrfCookieName: 'XSRF-TOKEN',
				xsrfHeaderName: 'X-XSRF-TOKEN'
			};

			/***/
		},
		/* 3 */
		/***/function (module, exports) {

			'use strict';

			/*global toString:true*/

			// utils is a library of generic helper functions non-specific to axios

			var toString = Object.prototype.toString;

			/**
    * Determine if a value is an Array
    *
    * @param {Object} val The value to test
    * @returns {boolean} True if value is an Array, otherwise false
    */
			function isArray(val) {
				return toString.call(val) === '[object Array]';
			}

			/**
    * Determine if a value is an ArrayBuffer
    *
    * @param {Object} val The value to test
    * @returns {boolean} True if value is an ArrayBuffer, otherwise false
    */
			function isArrayBuffer(val) {
				return toString.call(val) === '[object ArrayBuffer]';
			}

			/**
    * Determine if a value is a FormData
    *
    * @param {Object} val The value to test
    * @returns {boolean} True if value is an FormData, otherwise false
    */
			function isFormData(val) {
				return toString.call(val) === '[object FormData]';
			}

			/**
    * Determine if a value is a view on an ArrayBuffer
    *
    * @param {Object} val The value to test
    * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
    */
			function isArrayBufferView(val) {
				var result;
				if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
					result = ArrayBuffer.isView(val);
				} else {
					result = val && val.buffer && val.buffer instanceof ArrayBuffer;
				}
				return result;
			}

			/**
    * Determine if a value is a String
    *
    * @param {Object} val The value to test
    * @returns {boolean} True if value is a String, otherwise false
    */
			function isString(val) {
				return typeof val === 'string';
			}

			/**
    * Determine if a value is a Number
    *
    * @param {Object} val The value to test
    * @returns {boolean} True if value is a Number, otherwise false
    */
			function isNumber(val) {
				return typeof val === 'number';
			}

			/**
    * Determine if a value is undefined
    *
    * @param {Object} val The value to test
    * @returns {boolean} True if the value is undefined, otherwise false
    */
			function isUndefined(val) {
				return typeof val === 'undefined';
			}

			/**
    * Determine if a value is an Object
    *
    * @param {Object} val The value to test
    * @returns {boolean} True if value is an Object, otherwise false
    */
			function isObject(val) {
				return val !== null && (typeof val === 'undefined' ? 'undefined' : (0, _typeof3.default)(val)) === 'object';
			}

			/**
    * Determine if a value is a Date
    *
    * @param {Object} val The value to test
    * @returns {boolean} True if value is a Date, otherwise false
    */
			function isDate(val) {
				return toString.call(val) === '[object Date]';
			}

			/**
    * Determine if a value is a File
    *
    * @param {Object} val The value to test
    * @returns {boolean} True if value is a File, otherwise false
    */
			function isFile(val) {
				return toString.call(val) === '[object File]';
			}

			/**
    * Determine if a value is a Blob
    *
    * @param {Object} val The value to test
    * @returns {boolean} True if value is a Blob, otherwise false
    */
			function isBlob(val) {
				return toString.call(val) === '[object Blob]';
			}

			/**
    * Trim excess whitespace off the beginning and end of a string
    *
    * @param {String} str The String to trim
    * @returns {String} The String freed of excess whitespace
    */
			function trim(str) {
				return str.replace(/^\s*/, '').replace(/\s*$/, '');
			}

			/**
    * Determine if we're running in a standard browser environment
    *
    * This allows axios to run in a web worker, and react-native.
    * Both environments support XMLHttpRequest, but not fully standard globals.
    *
    * web workers:
    *  typeof window -> undefined
    *  typeof document -> undefined
    *
    * react-native:
    *  typeof document.createElement -> undefined
    */
			function isStandardBrowserEnv() {
				return typeof window !== 'undefined' && typeof document !== 'undefined' && typeof document.createElement === 'function';
			}

			/**
    * Iterate over an Array or an Object invoking a function for each item.
    *
    * If `obj` is an Array callback will be called passing
    * the value, index, and complete array for each item.
    *
    * If 'obj' is an Object callback will be called passing
    * the value, key, and complete object for each property.
    *
    * @param {Object|Array} obj The object to iterate
    * @param {Function} fn The callback to invoke for each item
    */
			function forEach(obj, fn) {
				// Don't bother if no value provided
				if (obj === null || typeof obj === 'undefined') {
					return;
				}

				// Force an array if not already something iterable
				if ((typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) !== 'object' && !isArray(obj)) {
					/*eslint no-param-reassign:0*/
					obj = [obj];
				}

				if (isArray(obj)) {
					// Iterate over array values
					for (var i = 0, l = obj.length; i < l; i++) {
						fn.call(null, obj[i], i, obj);
					}
				} else {
					// Iterate over object keys
					for (var key in obj) {
						if (obj.hasOwnProperty(key)) {
							fn.call(null, obj[key], key, obj);
						}
					}
				}
			}

			/**
    * Accepts varargs expecting each argument to be an object, then
    * immutably merges the properties of each object and returns result.
    *
    * When multiple objects contain the same key the later object in
    * the arguments list will take precedence.
    *
    * Example:
    *
    * ```js
    * var result = merge({foo: 123}, {foo: 456});
    * console.log(result.foo); // outputs 456
    * ```
    *
    * @param {Object} obj1 Object to merge
    * @returns {Object} Result of all merge properties
    */
			function merge() /* obj1, obj2, obj3, ... */{
				var result = {};
				function assignValue(val, key) {
					if ((0, _typeof3.default)(result[key]) === 'object' && (typeof val === 'undefined' ? 'undefined' : (0, _typeof3.default)(val)) === 'object') {
						result[key] = merge(result[key], val);
					} else {
						result[key] = val;
					}
				}

				for (var i = 0, l = arguments.length; i < l; i++) {
					forEach(arguments[i], assignValue);
				}
				return result;
			}

			module.exports = {
				isArray: isArray,
				isArrayBuffer: isArrayBuffer,
				isFormData: isFormData,
				isArrayBufferView: isArrayBufferView,
				isString: isString,
				isNumber: isNumber,
				isObject: isObject,
				isUndefined: isUndefined,
				isDate: isDate,
				isFile: isFile,
				isBlob: isBlob,
				isStandardBrowserEnv: isStandardBrowserEnv,
				forEach: forEach,
				merge: merge,
				trim: trim
			};

			/***/
		},
		/* 4 */
		/***/function (module, exports, __webpack_require__) {

			'use strict';

			/**
    * Dispatch a request to the server using whichever adapter
    * is supported by the current environment.
    *
    * @param {object} config The config that is to be used for the request
    * @returns {Promise} The Promise to be fulfilled
    */

			module.exports = function dispatchRequest(config) {
				return new _promise2.default(function executor(resolve, reject) {
					try {
						var adapter;

						if (typeof config.adapter === 'function') {
							// For custom adapter support
							adapter = config.adapter;
						} else if (typeof XMLHttpRequest !== 'undefined') {
							// For browsers use XHR adapter
							adapter = __webpack_require__(5);
						} else if (typeof process !== 'undefined') {
							// For node use HTTP adapter
							adapter = __webpack_require__(5);
						}

						if (typeof adapter === 'function') {
							adapter(resolve, reject, config);
						}
					} catch (e) {
						reject(e);
					}
				});
			};

			/***/
		},
		/* 5 */
		/***/function (module, exports, __webpack_require__) {

			'use strict';

			var utils = __webpack_require__(3);
			var buildURL = __webpack_require__(6);
			var parseHeaders = __webpack_require__(7);
			var transformData = __webpack_require__(8);
			var isURLSameOrigin = __webpack_require__(9);
			var btoa = window.btoa || __webpack_require__(10);

			module.exports = function xhrAdapter(resolve, reject, config) {
				var requestData = config.data;
				var requestHeaders = config.headers;

				if (utils.isFormData(requestData)) {
					delete requestHeaders['Content-Type']; // Let the browser set it
				}

				var request = new XMLHttpRequest();

				// For IE 8/9 CORS support
				// Only supports POST and GET calls and doesn't returns the response headers.
				if (window.XDomainRequest && !('withCredentials' in request) && !isURLSameOrigin(config.url)) {
					request = new window.XDomainRequest();
				}

				// HTTP basic authentication
				if (config.auth) {
					var username = config.auth.username || '';
					var password = config.auth.password || '';
					requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
				}

				request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

				// Set the request timeout in MS
				request.timeout = config.timeout;

				// Listen for ready state
				request.onload = function handleLoad() {
					if (!request) {
						return;
					}
					// Prepare the response
					var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
					var responseData = ['text', ''].indexOf(config.responseType || '') !== -1 ? request.responseText : request.response;
					var response = {
						data: transformData(responseData, responseHeaders, config.transformResponse),
						// IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
						status: request.status === 1223 ? 204 : request.status,
						statusText: request.status === 1223 ? 'No Content' : request.statusText,
						headers: responseHeaders,
						config: config
					};

					// Resolve or reject the Promise based on the status
					(response.status >= 200 && response.status < 300 || !('status' in request) && response.responseText ? resolve : reject)(response);

					// Clean up request
					request = null;
				};

				// Handle low level network errors
				request.onerror = function handleError() {
					// Real errors are hidden from us by the browser
					// onerror should only fire if it's a network error
					reject(new Error('Network Error'));

					// Clean up request
					request = null;
				};

				// Add xsrf header
				// This is only done if running in a standard browser environment.
				// Specifically not if we're in a web worker, or react-native.
				if (utils.isStandardBrowserEnv()) {
					var cookies = __webpack_require__(11);

					// Add xsrf header
					var xsrfValue = config.withCredentials || isURLSameOrigin(config.url) ? cookies.read(config.xsrfCookieName) : undefined;

					if (xsrfValue) {
						requestHeaders[config.xsrfHeaderName] = xsrfValue;
					}
				}

				// Add headers to the request
				if ('setRequestHeader' in request) {
					utils.forEach(requestHeaders, function setRequestHeader(val, key) {
						if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
							// Remove Content-Type if data is undefined
							delete requestHeaders[key];
						} else {
							// Otherwise add header to the request
							request.setRequestHeader(key, val);
						}
					});
				}

				// Add withCredentials to request if needed
				if (config.withCredentials) {
					request.withCredentials = true;
				}

				// Add responseType to request if needed
				if (config.responseType) {
					try {
						request.responseType = config.responseType;
					} catch (e) {
						if (request.responseType !== 'json') {
							throw e;
						}
					}
				}

				if (utils.isArrayBuffer(requestData)) {
					requestData = new DataView(requestData);
				}

				// Send the request
				request.send(requestData);
			};

			/***/
		},
		/* 6 */
		/***/function (module, exports, __webpack_require__) {

			'use strict';

			var utils = __webpack_require__(3);

			function encode(val) {
				return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
			}

			/**
    * Build a URL by appending params to the end
    *
    * @param {string} url The base of the url (e.g., http://www.google.com)
    * @param {object} [params] The params to be appended
    * @returns {string} The formatted url
    */
			module.exports = function buildURL(url, params, paramsSerializer) {
				/*eslint no-param-reassign:0*/
				if (!params) {
					return url;
				}

				var serializedParams;
				if (paramsSerializer) {
					serializedParams = paramsSerializer(params);
				} else {
					var parts = [];

					utils.forEach(params, function serialize(val, key) {
						if (val === null || typeof val === 'undefined') {
							return;
						}

						if (utils.isArray(val)) {
							key = key + '[]';
						}

						if (!utils.isArray(val)) {
							val = [val];
						}

						utils.forEach(val, function parseValue(v) {
							if (utils.isDate(v)) {
								v = v.toISOString();
							} else if (utils.isObject(v)) {
								v = (0, _stringify2.default)(v);
							}
							parts.push(encode(key) + '=' + encode(v));
						});
					});

					serializedParams = parts.join('&');
				}

				if (serializedParams) {
					url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
				}

				return url;
			};

			/***/
		},
		/* 7 */
		/***/function (module, exports, __webpack_require__) {

			'use strict';

			var utils = __webpack_require__(3);

			/**
    * Parse headers into an object
    *
    * ```
    * Date: Wed, 27 Aug 2014 08:58:49 GMT
    * Content-Type: application/json
    * Connection: keep-alive
    * Transfer-Encoding: chunked
    * ```
    *
    * @param {String} headers Headers needing to be parsed
    * @returns {Object} Headers parsed into an object
    */
			module.exports = function parseHeaders(headers) {
				var parsed = {};
				var key;
				var val;
				var i;

				if (!headers) {
					return parsed;
				}

				utils.forEach(headers.split('\n'), function parser(line) {
					i = line.indexOf(':');
					key = utils.trim(line.substr(0, i)).toLowerCase();
					val = utils.trim(line.substr(i + 1));

					if (key) {
						parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
					}
				});

				return parsed;
			};

			/***/
		},
		/* 8 */
		/***/function (module, exports, __webpack_require__) {

			'use strict';

			var utils = __webpack_require__(3);

			/**
    * Transform the data for a request or a response
    *
    * @param {Object|String} data The data to be transformed
    * @param {Array} headers The headers for the request or response
    * @param {Array|Function} fns A single function or Array of functions
    * @returns {*} The resulting transformed data
    */
			module.exports = function transformData(data, headers, fns) {
				/*eslint no-param-reassign:0*/
				utils.forEach(fns, function transform(fn) {
					data = fn(data, headers);
				});

				return data;
			};

			/***/
		},
		/* 9 */
		/***/function (module, exports, __webpack_require__) {

			'use strict';

			var utils = __webpack_require__(3);

			module.exports = utils.isStandardBrowserEnv() ?

			// Standard browser envs have full support of the APIs needed to test
			// whether the request URL is of the same origin as current location.
			function standardBrowserEnv() {
				var msie = /(msie|trident)/i.test(navigator.userAgent);
				var urlParsingNode = document.createElement('a');
				var originURL;

				/**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
				function resolveURL(url) {
					var href = url;

					if (msie) {
						// IE needs attribute set twice to normalize properties
						urlParsingNode.setAttribute('href', href);
						href = urlParsingNode.href;
					}

					urlParsingNode.setAttribute('href', href);

					// urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
					return {
						href: urlParsingNode.href,
						protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
						host: urlParsingNode.host,
						search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
						hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
						hostname: urlParsingNode.hostname,
						port: urlParsingNode.port,
						pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
					};
				}

				originURL = resolveURL(window.location.href);

				/**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
				return function isURLSameOrigin(requestURL) {
					var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
					return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
				};
			}() :

			// Non standard browser envs (web workers, react-native) lack needed support.
			function nonStandardBrowserEnv() {
				return function isURLSameOrigin() {
					return true;
				};
			}();

			/***/
		},
		/* 10 */
		/***/function (module, exports) {

			'use strict';

			// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

			var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

			function InvalidCharacterError(message) {
				this.message = message;
			}
			InvalidCharacterError.prototype = new Error();
			InvalidCharacterError.prototype.code = 5;
			InvalidCharacterError.prototype.name = 'InvalidCharacterError';

			function btoa(input) {
				var str = String(input);
				var output = '';
				for (
				// initialize result and counter
				var block, charCode, idx = 0, map = chars;
				// if the next str index does not exist:
				//   change the mapping table to "="
				//   check if d has no fractional digits
				str.charAt(idx | 0) || (map = '=', idx % 1);
				// "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
				output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
					charCode = str.charCodeAt(idx += 3 / 4);
					if (charCode > 0xFF) {
						throw new InvalidCharacterError('INVALID_CHARACTER_ERR: DOM Exception 5');
					}
					block = block << 8 | charCode;
				}
				return output;
			}

			module.exports = btoa;

			/***/
		},
		/* 11 */
		/***/function (module, exports, __webpack_require__) {

			'use strict';

			var utils = __webpack_require__(3);

			module.exports = utils.isStandardBrowserEnv() ?

			// Standard browser envs support document.cookie
			function standardBrowserEnv() {
				return {
					write: function write(name, value, expires, path, domain, secure) {
						var cookie = [];
						cookie.push(name + '=' + encodeURIComponent(value));

						if (utils.isNumber(expires)) {
							cookie.push('expires=' + new Date(expires).toGMTString());
						}

						if (utils.isString(path)) {
							cookie.push('path=' + path);
						}

						if (utils.isString(domain)) {
							cookie.push('domain=' + domain);
						}

						if (secure === true) {
							cookie.push('secure');
						}

						document.cookie = cookie.join('; ');
					},

					read: function read(name) {
						var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
						return match ? decodeURIComponent(match[3]) : null;
					},

					remove: function remove(name) {
						this.write(name, '', Date.now() - 86400000);
					}
				};
			}() :

			// Non standard browser env (web workers, react-native) lack needed support.
			function nonStandardBrowserEnv() {
				return {
					write: function write() {},
					read: function read() {
						return null;
					},
					remove: function remove() {}
				};
			}();

			/***/
		},
		/* 12 */
		/***/function (module, exports, __webpack_require__) {

			'use strict';

			var utils = __webpack_require__(3);

			function InterceptorManager() {
				this.handlers = [];
			}

			/**
    * Add a new interceptor to the stack
    *
    * @param {Function} fulfilled The function to handle `then` for a `Promise`
    * @param {Function} rejected The function to handle `reject` for a `Promise`
    *
    * @return {Number} An ID used to remove interceptor later
    */
			InterceptorManager.prototype.use = function use(fulfilled, rejected) {
				this.handlers.push({
					fulfilled: fulfilled,
					rejected: rejected
				});
				return this.handlers.length - 1;
			};

			/**
    * Remove an interceptor from the stack
    *
    * @param {Number} id The ID that was returned by `use`
    */
			InterceptorManager.prototype.eject = function eject(id) {
				if (this.handlers[id]) {
					this.handlers[id] = null;
				}
			};

			/**
    * Iterate over all the registered interceptors
    *
    * This method is particularly useful for skipping over any
    * interceptors that may have become `null` calling `eject`.
    *
    * @param {Function} fn The function to call for each interceptor
    */
			InterceptorManager.prototype.forEach = function forEach(fn) {
				utils.forEach(this.handlers, function forEachHandler(h) {
					if (h !== null) {
						fn(h);
					}
				});
			};

			module.exports = InterceptorManager;

			/***/
		},
		/* 13 */
		/***/function (module, exports) {

			'use strict';

			/**
    * Determines whether the specified URL is absolute
    *
    * @param {string} url The URL to test
    * @returns {boolean} True if the specified URL is absolute, otherwise false
    */

			module.exports = function isAbsoluteURL(url) {
				// A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
				// RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
				// by any combination of letters, digits, plus, period, or hyphen.
				return (/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
				);
			};

			/***/
		},
		/* 14 */
		/***/function (module, exports) {

			'use strict';

			/**
    * Creates a new URL by combining the specified URLs
    *
    * @param {string} baseURL The base URL
    * @param {string} relativeURL The relative URL
    * @returns {string} The combined URL
    */

			module.exports = function combineURLs(baseURL, relativeURL) {
				return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
			};

			/***/
		},
		/* 15 */
		/***/function (module, exports) {

			'use strict';

			module.exports = function bind(fn, thisArg) {
				return function wrap() {
					var args = new Array(arguments.length);
					for (var i = 0; i < args.length; i++) {
						args[i] = arguments[i];
					}
					return fn.apply(thisArg, args);
				};
			};

			/***/
		},
		/* 16 */
		/***/function (module, exports) {

			'use strict';

			/**
    * Syntactic sugar for invoking a function and expanding an array for arguments.
    *
    * Common use case would be to use `Function.prototype.apply`.
    *
    *  ```js
    *  function f(x, y, z) {}
    *  var args = [1, 2, 3];
    *  f.apply(null, args);
    *  ```
    *
    * With `spread` this example can be re-written.
    *
    *  ```js
    *  spread(function(x, y, z) {})([1, 2, 3]);
    *  ```
    *
    * @param {Function} callback
    * @returns {Function}
    */

			module.exports = function spread(callback) {
				return function wrap(arr) {
					return callback.apply(null, arr);
				};
			};

			/***/
		}
		/******/])
	);
});
;

}).call(this,require('_process'))
},{"_process":327,"babel-runtime/core-js/json/stringify":3,"babel-runtime/core-js/promise":5,"babel-runtime/helpers/typeof":8}],110:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wrapHttpClient;

var _reduce = require('lodash/reduce');

var _reduce2 = _interopRequireDefault(_reduce);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _rateLimit = require('./rate-limit');

var _rateLimit2 = _interopRequireDefault(_rateLimit);

var _createBackoff = require('./create-backoff');

var _createBackoff2 = _interopRequireDefault(_createBackoff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Wraps the http client with a rate limiter, and a backoff functionality.
 * The rate limiter queues calls and attempts to prevent the server side rate
 * limit from ever being hit.
 * The backoff is triggered if a 429 Too Many Requests error is received from
 * the server, and every time if it is received repeateadly the wait time
 * for the next try will increase exponentially.
 * @private
 * @param {Object} http - HTTP Client instances
 * @param {Object} options - Options for the wrapper methods
 * @prop {number} concurrency - Number of allowed concurrent requests
 * @prop {number} delay - Delay in milliseconds for waiting after hitting the
 * allowed number of concurrent requests
 * @prop {number} maxRetries - Maximum number of retries when a 429 is received
 * @prop {boolean} retryOnTooManyRequests - If we should retry on 429s
 */
function wrapHttpClient(http, _ref) {
  var concurrency = _ref.concurrency,
      delay = _ref.delay,
      maxRetries = _ref.maxRetries,
      retryOnTooManyRequests = _ref.retryOnTooManyRequests;

  return (0, _reduce2.default)(['get', 'post', 'put', 'delete', 'patch', 'head'], function (http, methodName) {
    var httpCall = http[methodName].bind(http);
    if (retryOnTooManyRequests) {
      httpCall = maybeBackoff(httpCall, maxRetries);
    }
    http[methodName] = (0, _rateLimit2.default)(httpCall, concurrency, delay);
    return http;
  }, (0, _cloneDeep2.default)(http));
}

function maybeBackoff(fn, maxRetries) {
  return function httpCall() {
    var self = this;
    self.backoff = self.backoff || (0, _createBackoff2.default)(maxRetries);
    var args = Array.prototype.slice.call(arguments);
    var response = fn.apply(self, args);

    response = response.catch(function (error) {
      // Rate-limited by the server, maybe backoff and retry
      if (error.status === 429 || error.status >= 500) {
        return self.backoff(error, function () {
          return httpCall.apply(self, args);
        });
      }
      throw error;
    });

    return response;
  };
}
},{"./create-backoff":102,"./rate-limit":108,"lodash/cloneDeep":295,"lodash/reduce":321}],111:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.get-iterator');
},{"../modules/core.get-iterator":170,"../modules/es6.string.iterator":176,"../modules/web.dom.iterable":178}],112:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.is-iterable');
},{"../modules/core.is-iterable":171,"../modules/es6.string.iterator":176,"../modules/web.dom.iterable":178}],113:[function(require,module,exports){
var core = require('../../modules/$.core');
module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
  return (core.JSON && core.JSON.stringify || JSON.stringify).apply(JSON, arguments);
};
},{"../../modules/$.core":122}],114:[function(require,module,exports){
require('../../modules/es6.object.freeze');
module.exports = require('../../modules/$.core').Object.freeze;
},{"../../modules/$.core":122,"../../modules/es6.object.freeze":173}],115:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
module.exports = require('../modules/$.core').Promise;
},{"../modules/$.core":122,"../modules/es6.object.to-string":174,"../modules/es6.promise":175,"../modules/es6.string.iterator":176,"../modules/web.dom.iterable":178}],116:[function(require,module,exports){
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
module.exports = require('../../modules/$.core').Symbol;
},{"../../modules/$.core":122,"../../modules/es6.object.to-string":174,"../../modules/es6.symbol":177}],117:[function(require,module,exports){
arguments[4][35][0].apply(exports,arguments)
},{"dup":35}],118:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"dup":36}],119:[function(require,module,exports){
var isObject = require('./$.is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./$.is-object":140}],120:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./$.cof')
  , TAG = require('./$.wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./$.cof":121,"./$.wks":168}],121:[function(require,module,exports){
arguments[4][41][0].apply(exports,arguments)
},{"dup":41}],122:[function(require,module,exports){
var core = module.exports = {version: '1.2.6'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],123:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./$.a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./$.a-function":117}],124:[function(require,module,exports){
arguments[4][44][0].apply(exports,arguments)
},{"dup":44}],125:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./$.fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./$.fails":129}],126:[function(require,module,exports){
var isObject = require('./$.is-object')
  , document = require('./$.global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./$.global":132,"./$.is-object":140}],127:[function(require,module,exports){
// all enumerable object keys, includes symbols
var $ = require('./$');
module.exports = function(it){
  var keys       = $.getKeys(it)
    , getSymbols = $.getSymbols;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = $.isEnum
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
  }
  return keys;
};
},{"./$":147}],128:[function(require,module,exports){
var global    = require('./$.global')
  , core      = require('./$.core')
  , ctx       = require('./$.ctx')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && key in target;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(param){
        return this instanceof C ? new C(param) : C(param);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
  }
};
// type bitmap
$export.F = 1;  // forced
$export.G = 2;  // global
$export.S = 4;  // static
$export.P = 8;  // proto
$export.B = 16; // bind
$export.W = 32; // wrap
module.exports = $export;
},{"./$.core":122,"./$.ctx":123,"./$.global":132}],129:[function(require,module,exports){
arguments[4][49][0].apply(exports,arguments)
},{"dup":49}],130:[function(require,module,exports){
var ctx         = require('./$.ctx')
  , call        = require('./$.iter-call')
  , isArrayIter = require('./$.is-array-iter')
  , anObject    = require('./$.an-object')
  , toLength    = require('./$.to-length')
  , getIterFn   = require('./core.get-iterator-method');
module.exports = function(iterable, entries, fn, that){
  var iterFn = getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    call(iterator, f, step.value, entries);
  }
};
},{"./$.an-object":119,"./$.ctx":123,"./$.is-array-iter":138,"./$.iter-call":141,"./$.to-length":166,"./core.get-iterator-method":169}],131:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./$.to-iobject')
  , getNames  = require('./$').getNames
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return getNames(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.get = function getOwnPropertyNames(it){
  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
  return getNames(toIObject(it));
};
},{"./$":147,"./$.to-iobject":165}],132:[function(require,module,exports){
arguments[4][51][0].apply(exports,arguments)
},{"dup":51}],133:[function(require,module,exports){
arguments[4][52][0].apply(exports,arguments)
},{"dup":52}],134:[function(require,module,exports){
var $          = require('./$')
  , createDesc = require('./$.property-desc');
module.exports = require('./$.descriptors') ? function(object, key, value){
  return $.setDesc(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./$":147,"./$.descriptors":125,"./$.property-desc":152}],135:[function(require,module,exports){
module.exports = require('./$.global').document && document.documentElement;
},{"./$.global":132}],136:[function(require,module,exports){
arguments[4][56][0].apply(exports,arguments)
},{"dup":56}],137:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./$.cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./$.cof":121}],138:[function(require,module,exports){
// check on default Array iterator
var Iterators  = require('./$.iterators')
  , ITERATOR   = require('./$.wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./$.iterators":146,"./$.wks":168}],139:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./$.cof');
module.exports = Array.isArray || function(arg){
  return cof(arg) == 'Array';
};
},{"./$.cof":121}],140:[function(require,module,exports){
arguments[4][59][0].apply(exports,arguments)
},{"dup":59}],141:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./$.an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./$.an-object":119}],142:[function(require,module,exports){
'use strict';
var $              = require('./$')
  , descriptor     = require('./$.property-desc')
  , setToStringTag = require('./$.set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./$.hide')(IteratorPrototype, require('./$.wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./$":147,"./$.hide":134,"./$.property-desc":152,"./$.set-to-string-tag":158,"./$.wks":168}],143:[function(require,module,exports){
'use strict';
var LIBRARY        = require('./$.library')
  , $export        = require('./$.export')
  , redefine       = require('./$.redefine')
  , hide           = require('./$.hide')
  , has            = require('./$.has')
  , Iterators      = require('./$.iterators')
  , $iterCreate    = require('./$.iter-create')
  , setToStringTag = require('./$.set-to-string-tag')
  , getProto       = require('./$').getProto
  , ITERATOR       = require('./$.wks')('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , methods, key;
  // Fix native
  if($native){
    var IteratorPrototype = getProto($default.call(new Base));
    // Set @@toStringTag to native iterators
    setToStringTag(IteratorPrototype, TAG, true);
    // FF fix
    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    // fix Array#{values, @@iterator}.name in V8 / FF
    if(DEF_VALUES && $native.name !== VALUES){
      VALUES_BUG = true;
      $default = function values(){ return $native.call(this); };
    }
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES  ? $default : getMethod(VALUES),
      keys:    IS_SET      ? $default : getMethod(KEYS),
      entries: !DEF_VALUES ? $default : getMethod('entries')
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./$":147,"./$.export":128,"./$.has":133,"./$.hide":134,"./$.iter-create":142,"./$.iterators":146,"./$.library":149,"./$.redefine":154,"./$.set-to-string-tag":158,"./$.wks":168}],144:[function(require,module,exports){
var ITERATOR     = require('./$.wks')('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./$.wks":168}],145:[function(require,module,exports){
arguments[4][64][0].apply(exports,arguments)
},{"dup":64}],146:[function(require,module,exports){
arguments[4][65][0].apply(exports,arguments)
},{"dup":65}],147:[function(require,module,exports){
var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};
},{}],148:[function(require,module,exports){
var $         = require('./$')
  , toIObject = require('./$.to-iobject');
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = $.getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./$":147,"./$.to-iobject":165}],149:[function(require,module,exports){
arguments[4][66][0].apply(exports,arguments)
},{"dup":66}],150:[function(require,module,exports){
var global    = require('./$.global')
  , macrotask = require('./$.task').set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = require('./$.cof')(process) == 'process'
  , head, last, notify;

var flush = function(){
  var parent, domain, fn;
  if(isNode && (parent = process.domain)){
    process.domain = null;
    parent.exit();
  }
  while(head){
    domain = head.domain;
    fn     = head.fn;
    if(domain)domain.enter();
    fn(); // <- currently we use it only for Promise - try / catch not required
    if(domain)domain.exit();
    head = head.next;
  } last = undefined;
  if(parent)parent.enter();
};

// Node.js
if(isNode){
  notify = function(){
    process.nextTick(flush);
  };
// browsers with MutationObserver
} else if(Observer){
  var toggle = 1
    , node   = document.createTextNode('');
  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
  notify = function(){
    node.data = toggle = -toggle;
  };
// environments with maybe non-completely correct, but existent Promise
} else if(Promise && Promise.resolve){
  notify = function(){
    Promise.resolve().then(flush);
  };
// for other environments - macrotask based on:
// - setImmediate
// - MessageChannel
// - window.postMessag
// - onreadystatechange
// - setTimeout
} else {
  notify = function(){
    // strange IE + webpack dev server bug - use .call(global)
    macrotask.call(global, flush);
  };
}

module.exports = function asap(fn){
  var task = {fn: fn, next: undefined, domain: isNode && process.domain};
  if(last)last.next = task;
  if(!head){
    head = task;
    notify();
  } last = task;
};
},{"./$.cof":121,"./$.global":132,"./$.task":163}],151:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./$.export')
  , core    = require('./$.core')
  , fails   = require('./$.fails');
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"./$.core":122,"./$.export":128,"./$.fails":129}],152:[function(require,module,exports){
arguments[4][75][0].apply(exports,arguments)
},{"dup":75}],153:[function(require,module,exports){
var redefine = require('./$.redefine');
module.exports = function(target, src){
  for(var key in src)redefine(target, key, src[key]);
  return target;
};
},{"./$.redefine":154}],154:[function(require,module,exports){
module.exports = require('./$.hide');
},{"./$.hide":134}],155:[function(require,module,exports){
// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};
},{}],156:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var getDesc  = require('./$').getDesc
  , isObject = require('./$.is-object')
  , anObject = require('./$.an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = require('./$.ctx')(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
},{"./$":147,"./$.an-object":119,"./$.ctx":123,"./$.is-object":140}],157:[function(require,module,exports){
'use strict';
var core        = require('./$.core')
  , $           = require('./$')
  , DESCRIPTORS = require('./$.descriptors')
  , SPECIES     = require('./$.wks')('species');

module.exports = function(KEY){
  var C = core[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./$":147,"./$.core":122,"./$.descriptors":125,"./$.wks":168}],158:[function(require,module,exports){
var def = require('./$').setDesc
  , has = require('./$.has')
  , TAG = require('./$.wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./$":147,"./$.has":133,"./$.wks":168}],159:[function(require,module,exports){
var global = require('./$.global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./$.global":132}],160:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = require('./$.an-object')
  , aFunction = require('./$.a-function')
  , SPECIES   = require('./$.wks')('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};
},{"./$.a-function":117,"./$.an-object":119,"./$.wks":168}],161:[function(require,module,exports){
module.exports = function(it, Constructor, name){
  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
  return it;
};
},{}],162:[function(require,module,exports){
var toInteger = require('./$.to-integer')
  , defined   = require('./$.defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./$.defined":124,"./$.to-integer":164}],163:[function(require,module,exports){
var ctx                = require('./$.ctx')
  , invoke             = require('./$.invoke')
  , html               = require('./$.html')
  , cel                = require('./$.dom-create')
  , global             = require('./$.global')
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listner = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(require('./$.cof')(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listner;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listner, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"./$.cof":121,"./$.ctx":123,"./$.dom-create":126,"./$.global":132,"./$.html":135,"./$.invoke":136}],164:[function(require,module,exports){
arguments[4][86][0].apply(exports,arguments)
},{"dup":86}],165:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./$.iobject')
  , defined = require('./$.defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./$.defined":124,"./$.iobject":137}],166:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./$.to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./$.to-integer":164}],167:[function(require,module,exports){
arguments[4][91][0].apply(exports,arguments)
},{"dup":91}],168:[function(require,module,exports){
var store  = require('./$.shared')('wks')
  , uid    = require('./$.uid')
  , Symbol = require('./$.global').Symbol;
module.exports = function(name){
  return store[name] || (store[name] =
    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
};
},{"./$.global":132,"./$.shared":159,"./$.uid":167}],169:[function(require,module,exports){
var classof   = require('./$.classof')
  , ITERATOR  = require('./$.wks')('iterator')
  , Iterators = require('./$.iterators');
module.exports = require('./$.core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./$.classof":120,"./$.core":122,"./$.iterators":146,"./$.wks":168}],170:[function(require,module,exports){
var anObject = require('./$.an-object')
  , get      = require('./core.get-iterator-method');
module.exports = require('./$.core').getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};
},{"./$.an-object":119,"./$.core":122,"./core.get-iterator-method":169}],171:[function(require,module,exports){
var classof   = require('./$.classof')
  , ITERATOR  = require('./$.wks')('iterator')
  , Iterators = require('./$.iterators');
module.exports = require('./$.core').isIterable = function(it){
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    || Iterators.hasOwnProperty(classof(O));
};
},{"./$.classof":120,"./$.core":122,"./$.iterators":146,"./$.wks":168}],172:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./$.add-to-unscopables')
  , step             = require('./$.iter-step')
  , Iterators        = require('./$.iterators')
  , toIObject        = require('./$.to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./$.iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"./$.add-to-unscopables":118,"./$.iter-define":143,"./$.iter-step":145,"./$.iterators":146,"./$.to-iobject":165}],173:[function(require,module,exports){
// 19.1.2.5 Object.freeze(O)
var isObject = require('./$.is-object');

require('./$.object-sap')('freeze', function($freeze){
  return function freeze(it){
    return $freeze && isObject(it) ? $freeze(it) : it;
  };
});
},{"./$.is-object":140,"./$.object-sap":151}],174:[function(require,module,exports){
arguments[4][97][0].apply(exports,arguments)
},{"dup":97}],175:[function(require,module,exports){
'use strict';
var $          = require('./$')
  , LIBRARY    = require('./$.library')
  , global     = require('./$.global')
  , ctx        = require('./$.ctx')
  , classof    = require('./$.classof')
  , $export    = require('./$.export')
  , isObject   = require('./$.is-object')
  , anObject   = require('./$.an-object')
  , aFunction  = require('./$.a-function')
  , strictNew  = require('./$.strict-new')
  , forOf      = require('./$.for-of')
  , setProto   = require('./$.set-proto').set
  , same       = require('./$.same-value')
  , SPECIES    = require('./$.wks')('species')
  , speciesConstructor = require('./$.species-constructor')
  , asap       = require('./$.microtask')
  , PROMISE    = 'Promise'
  , process    = global.process
  , isNode     = classof(process) == 'process'
  , P          = global[PROMISE]
  , empty      = function(){ /* empty */ }
  , Wrapper;

var testResolve = function(sub){
  var test = new P(empty), promise;
  if(sub)test.constructor = function(exec){
    exec(empty, empty);
  };
  (promise = P.resolve(test))['catch'](empty);
  return promise === test;
};

var USE_NATIVE = function(){
  var works = false;
  function P2(x){
    var self = new P(x);
    setProto(self, P2.prototype);
    return self;
  }
  try {
    works = P && P.resolve && testResolve();
    setProto(P2, P);
    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
    // actual Firefox has broken subclass support, test that
    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
      works = false;
    }
    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
    if(works && require('./$.descriptors')){
      var thenableThenGotten = false;
      P.resolve($.setDesc({}, 'then', {
        get: function(){ thenableThenGotten = true; }
      }));
      works = thenableThenGotten;
    }
  } catch(e){ works = false; }
  return works;
}();

// helpers
var sameConstructor = function(a, b){
  // library wrapper special case
  if(LIBRARY && a === P && b === Wrapper)return true;
  return same(a, b);
};
var getConstructor = function(C){
  var S = anObject(C)[SPECIES];
  return S != undefined ? S : C;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var PromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve),
  this.reject  = aFunction(reject)
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(record, isReject){
  if(record.n)return;
  record.n = true;
  var chain = record.c;
  asap(function(){
    var value = record.v
      , ok    = record.s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , result, then;
      try {
        if(handler){
          if(!ok)record.h = true;
          result = handler === true ? value : handler(value);
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    chain.length = 0;
    record.n = false;
    if(isReject)setTimeout(function(){
      var promise = record.p
        , handler, console;
      if(isUnhandled(promise)){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      } record.a = undefined;
    }, 1);
  });
};
var isUnhandled = function(promise){
  var record = promise._d
    , chain  = record.a || record.c
    , i      = 0
    , reaction;
  if(record.h)return false;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var $reject = function(value){
  var record = this;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  record.v = value;
  record.s = 2;
  record.a = record.c.slice();
  notify(record, true);
};
var $resolve = function(value){
  var record = this
    , then;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  try {
    if(record.p === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      asap(function(){
        var wrapper = {r: record, d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      record.v = value;
      record.s = 1;
      notify(record, false);
    }
  } catch(e){
    $reject.call({r: record, d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  P = function Promise(executor){
    aFunction(executor);
    var record = this._d = {
      p: strictNew(this, P, PROMISE),         // <- promise
      c: [],                                  // <- awaiting reactions
      a: undefined,                           // <- checked in isUnhandled reactions
      s: 0,                                   // <- state
      d: false,                               // <- done
      v: undefined,                           // <- value
      h: false,                               // <- handled rejection
      n: false                                // <- notify
    };
    try {
      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
    } catch(err){
      $reject.call(record, err);
    }
  };
  require('./$.redefine-all')(P.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction = new PromiseCapability(speciesConstructor(this, P))
        , promise  = reaction.promise
        , record   = this._d;
      reaction.ok   = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      record.c.push(reaction);
      if(record.a)record.a.push(reaction);
      if(record.s)notify(record, false);
      return promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: P});
require('./$.set-to-string-tag')(P, PROMISE);
require('./$.set-species')(PROMISE);
Wrapper = require('./$.core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = new PromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (!USE_NATIVE || testResolve(true)), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof P && sameConstructor(x.constructor, this))return x;
    var capability = new PromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./$.iter-detect')(function(iter){
  P.all(iter)['catch'](function(){});
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = getConstructor(this)
      , capability = new PromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject
      , values     = [];
    var abrupt = perform(function(){
      forOf(iterable, false, values.push, values);
      var remaining = values.length
        , results   = Array(remaining);
      if(remaining)$.each.call(values, function(promise, index){
        var alreadyCalled = false;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled = true;
          results[index] = value;
          --remaining || resolve(results);
        }, reject);
      });
      else resolve(results);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = getConstructor(this)
      , capability = new PromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});
},{"./$":147,"./$.a-function":117,"./$.an-object":119,"./$.classof":120,"./$.core":122,"./$.ctx":123,"./$.descriptors":125,"./$.export":128,"./$.for-of":130,"./$.global":132,"./$.is-object":140,"./$.iter-detect":144,"./$.library":149,"./$.microtask":150,"./$.redefine-all":153,"./$.same-value":155,"./$.set-proto":156,"./$.set-species":157,"./$.set-to-string-tag":158,"./$.species-constructor":160,"./$.strict-new":161,"./$.wks":168}],176:[function(require,module,exports){
'use strict';
var $at  = require('./$.string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./$.iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./$.iter-define":143,"./$.string-at":162}],177:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var $              = require('./$')
  , global         = require('./$.global')
  , has            = require('./$.has')
  , DESCRIPTORS    = require('./$.descriptors')
  , $export        = require('./$.export')
  , redefine       = require('./$.redefine')
  , $fails         = require('./$.fails')
  , shared         = require('./$.shared')
  , setToStringTag = require('./$.set-to-string-tag')
  , uid            = require('./$.uid')
  , wks            = require('./$.wks')
  , keyOf          = require('./$.keyof')
  , $names         = require('./$.get-names')
  , enumKeys       = require('./$.enum-keys')
  , isArray        = require('./$.is-array')
  , anObject       = require('./$.an-object')
  , toIObject      = require('./$.to-iobject')
  , createDesc     = require('./$.property-desc')
  , getDesc        = $.getDesc
  , setDesc        = $.setDesc
  , _create        = $.create
  , getNames       = $names.get
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , setter         = false
  , HIDDEN         = wks('_hidden')
  , isEnum         = $.isEnum
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , useNative      = typeof $Symbol == 'function'
  , ObjectProto    = Object.prototype;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(setDesc({}, 'a', {
    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = getDesc(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  setDesc(it, key, D);
  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
} : setDesc;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol.prototype);
  sym._k = tag;
  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
    configurable: true,
    set: function(value){
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    }
  });
  return sym;
};

var isSymbol = function(it){
  return typeof it == 'symbol';
};

var $defineProperty = function defineProperty(it, key, D){
  if(D && has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return setDesc(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key);
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
    ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  var D = getDesc(it = toIObject(it), key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = getNames(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
  return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var names  = getNames(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
  return result;
};
var $stringify = function stringify(it){
  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
  var args = [it]
    , i    = 1
    , $$   = arguments
    , replacer, $replacer;
  while($$.length > i)args.push($$[i++]);
  replacer = args[1];
  if(typeof replacer == 'function')$replacer = replacer;
  if($replacer || !isArray(replacer))replacer = function(key, value){
    if($replacer)value = $replacer.call(this, key, value);
    if(!isSymbol(value))return value;
  };
  args[1] = replacer;
  return _stringify.apply($JSON, args);
};
var buggyJSON = $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
});

// 19.4.1.1 Symbol([description])
if(!useNative){
  $Symbol = function Symbol(){
    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
  };
  redefine($Symbol.prototype, 'toString', function toString(){
    return this._k;
  });

  isSymbol = function(it){
    return it instanceof $Symbol;
  };

  $.create     = $create;
  $.isEnum     = $propertyIsEnumerable;
  $.getDesc    = $getOwnPropertyDescriptor;
  $.setDesc    = $defineProperty;
  $.setDescs   = $defineProperties;
  $.getNames   = $names.get = $getOwnPropertyNames;
  $.getSymbols = $getOwnPropertySymbols;

  if(DESCRIPTORS && !require('./$.library')){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }
}

var symbolStatics = {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    return keyOf(SymbolRegistry, key);
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
};
// 19.4.2.2 Symbol.hasInstance
// 19.4.2.3 Symbol.isConcatSpreadable
// 19.4.2.4 Symbol.iterator
// 19.4.2.6 Symbol.match
// 19.4.2.8 Symbol.replace
// 19.4.2.9 Symbol.search
// 19.4.2.10 Symbol.species
// 19.4.2.11 Symbol.split
// 19.4.2.12 Symbol.toPrimitive
// 19.4.2.13 Symbol.toStringTag
// 19.4.2.14 Symbol.unscopables
$.each.call((
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
  'species,split,toPrimitive,toStringTag,unscopables'
).split(','), function(it){
  var sym = wks(it);
  symbolStatics[it] = useNative ? sym : wrap(sym);
});

setter = true;

$export($export.G + $export.W, {Symbol: $Symbol});

$export($export.S, 'Symbol', symbolStatics);

$export($export.S + $export.F * !useNative, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});

// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);
},{"./$":147,"./$.an-object":119,"./$.descriptors":125,"./$.enum-keys":127,"./$.export":128,"./$.fails":129,"./$.get-names":131,"./$.global":132,"./$.has":133,"./$.is-array":139,"./$.keyof":148,"./$.library":149,"./$.property-desc":152,"./$.redefine":154,"./$.set-to-string-tag":158,"./$.shared":159,"./$.to-iobject":165,"./$.uid":167,"./$.wks":168}],178:[function(require,module,exports){
require('./es6.array.iterator');
var Iterators = require('./$.iterators');
Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
},{"./$.iterators":146,"./es6.array.iterator":172}],179:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Creates an hash object.
 *
 * @private
 * @returns {Object} Returns the new hash object.
 */
function Hash() {}

// Avoid inheriting from `Object.prototype` when possible.
Hash.prototype = nativeCreate ? nativeCreate(null) : objectProto;

module.exports = Hash;

},{"./_nativeCreate":282}],180:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;

},{"./_getNative":255,"./_root":284}],181:[function(require,module,exports){
var mapClear = require('./_mapClear'),
    mapDelete = require('./_mapDelete'),
    mapGet = require('./_mapGet'),
    mapHas = require('./_mapHas'),
    mapSet = require('./_mapSet');

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @param {Array} [values] The values to cache.
 */
function MapCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.clear();
  while (++index < length) {
    var entry = values[index];
    this.set(entry[0], entry[1]);
  }
}

// Add functions to the `MapCache`.
MapCache.prototype.clear = mapClear;
MapCache.prototype['delete'] = mapDelete;
MapCache.prototype.get = mapGet;
MapCache.prototype.has = mapHas;
MapCache.prototype.set = mapSet;

module.exports = MapCache;

},{"./_mapClear":276,"./_mapDelete":277,"./_mapGet":278,"./_mapHas":279,"./_mapSet":280}],182:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Reflect = root.Reflect;

module.exports = Reflect;

},{"./_root":284}],183:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;

},{"./_getNative":255,"./_root":284}],184:[function(require,module,exports){
var MapCache = require('./_MapCache'),
    cachePush = require('./_cachePush');

/**
 *
 * Creates a set cache object to store unique values.
 *
 * @private
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.push(values[index]);
  }
}

// Add functions to the `SetCache`.
SetCache.prototype.push = cachePush;

module.exports = SetCache;

},{"./_MapCache":181,"./_cachePush":235}],185:[function(require,module,exports){
var stackClear = require('./_stackClear'),
    stackDelete = require('./_stackDelete'),
    stackGet = require('./_stackGet'),
    stackHas = require('./_stackHas'),
    stackSet = require('./_stackSet');

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @param {Array} [values] The values to cache.
 */
function Stack(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.clear();
  while (++index < length) {
    var entry = values[index];
    this.set(entry[0], entry[1]);
  }
}

// Add functions to the `Stack` cache.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;

},{"./_stackClear":286,"./_stackDelete":287,"./_stackGet":288,"./_stackHas":289,"./_stackSet":290}],186:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":284}],187:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;

},{"./_root":284}],188:[function(require,module,exports){
/**
 * Adds the key-value `pair` to `map`.
 *
 * @private
 * @param {Object} map The map to modify.
 * @param {Array} pair The key-value pair to add.
 * @returns {Object} Returns `map`.
 */
function addMapEntry(map, pair) {
  map.set(pair[0], pair[1]);
  return map;
}

module.exports = addMapEntry;

},{}],189:[function(require,module,exports){
/**
 * Adds `value` to `set`.
 *
 * @private
 * @param {Object} set The set to modify.
 * @param {*} value The value to add.
 * @returns {Object} Returns `set`.
 */
function addSetEntry(set, value) {
  set.add(value);
  return set;
}

module.exports = addSetEntry;

},{}],190:[function(require,module,exports){
/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {...*} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  var length = args.length;
  switch (length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;

},{}],191:[function(require,module,exports){
/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;

},{}],192:[function(require,module,exports){
var baseIndexOf = require('./_baseIndexOf');

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  return !!array.length && baseIndexOf(array, value, 0) > -1;
}

module.exports = arrayIncludes;

},{"./_baseIndexOf":216}],193:[function(require,module,exports){
/**
 * A specialized version of `_.includesWith` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

module.exports = arrayIncludesWith;

},{}],194:[function(require,module,exports){
/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;

},{}],195:[function(require,module,exports){
/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;

},{}],196:[function(require,module,exports){
/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array.length;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

module.exports = arrayReduce;

},{}],197:[function(require,module,exports){
/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check, else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;

},{}],198:[function(require,module,exports){
var eq = require('./eq');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used by `_.defaults` to customize its `_.assignIn` use.
 *
 * @private
 * @param {*} objValue The destination value.
 * @param {*} srcValue The source value.
 * @param {string} key The key of the property to assign.
 * @param {Object} object The parent object of `objValue`.
 * @returns {*} Returns the value to assign.
 */
function assignInDefaults(objValue, srcValue, key, object) {
  if (objValue === undefined ||
      (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
    return srcValue;
  }
  return objValue;
}

module.exports = assignInDefaults;

},{"./eq":298}],199:[function(require,module,exports){
var eq = require('./eq');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if ((!eq(objValue, value) ||
        (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

module.exports = assignValue;

},{"./eq":298}],200:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the associative array.
 *
 * @private
 * @param {Array} array The array to query.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function assocDelete(array, key) {
  var index = assocIndexOf(array, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = array.length - 1;
  if (index == lastIndex) {
    array.pop();
  } else {
    splice.call(array, index, 1);
  }
  return true;
}

module.exports = assocDelete;

},{"./_assocIndexOf":203}],201:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Gets the associative array value for `key`.
 *
 * @private
 * @param {Array} array The array to query.
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function assocGet(array, key) {
  var index = assocIndexOf(array, key);
  return index < 0 ? undefined : array[index][1];
}

module.exports = assocGet;

},{"./_assocIndexOf":203}],202:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Checks if an associative array value for `key` exists.
 *
 * @private
 * @param {Array} array The array to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function assocHas(array, key) {
  return assocIndexOf(array, key) > -1;
}

module.exports = assocHas;

},{"./_assocIndexOf":203}],203:[function(require,module,exports){
var eq = require('./eq');

/**
 * Gets the index at which the first occurrence of `key` is found in `array`
 * of key-value pairs.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;

},{"./eq":298}],204:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Sets the associative array `key` to `value`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 */
function assocSet(array, key, value) {
  var index = assocIndexOf(array, key);
  if (index < 0) {
    array.push([key, value]);
  } else {
    array[index][1] = value;
  }
}

module.exports = assocSet;

},{"./_assocIndexOf":203}],205:[function(require,module,exports){
var copyObject = require('./_copyObject'),
    keys = require('./keys');

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

module.exports = baseAssign;

},{"./_copyObject":244,"./keys":316}],206:[function(require,module,exports){
var Stack = require('./_Stack'),
    arrayEach = require('./_arrayEach'),
    assignValue = require('./_assignValue'),
    baseAssign = require('./_baseAssign'),
    baseForOwn = require('./_baseForOwn'),
    copyArray = require('./_copyArray'),
    copySymbols = require('./_copySymbols'),
    getTag = require('./_getTag'),
    initCloneArray = require('./_initCloneArray'),
    initCloneByTag = require('./_initCloneByTag'),
    initCloneObject = require('./_initCloneObject'),
    isArray = require('./isArray'),
    isHostObject = require('./_isHostObject'),
    isObject = require('./isObject');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[boolTag] =
cloneableTags[dateTag] = cloneableTags[float32Tag] =
cloneableTags[float64Tag] = cloneableTags[int8Tag] =
cloneableTags[int16Tag] = cloneableTags[int32Tag] =
cloneableTags[mapTag] = cloneableTags[numberTag] =
cloneableTags[objectTag] = cloneableTags[regexpTag] =
cloneableTags[setTag] = cloneableTags[stringTag] =
cloneableTags[symbolTag] = cloneableTags[uint8Tag] =
cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] =
cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, isDeep, customizer, key, object, stack) {
  var result;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      if (isHostObject(value)) {
        return object ? value : {};
      }
      result = initCloneObject(isFunc ? {} : value);
      if (!isDeep) {
        return copySymbols(value, baseAssign(result, value));
      }
    } else {
      return cloneableTags[tag]
        ? initCloneByTag(value, tag, isDeep)
        : (object ? value : {});
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  // Recursively populate clone (susceptible to call stack limits).
  (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
    assignValue(result, key, baseClone(subValue, isDeep, customizer, key, value, stack));
  });
  return isArr ? result : copySymbols(value, result);
}

module.exports = baseClone;

},{"./_Stack":185,"./_arrayEach":191,"./_assignValue":199,"./_baseAssign":205,"./_baseForOwn":212,"./_copyArray":243,"./_copySymbols":246,"./_getTag":257,"./_initCloneArray":265,"./_initCloneByTag":266,"./_initCloneObject":267,"./_isHostObject":268,"./isArray":304,"./isObject":310}],207:[function(require,module,exports){
var isObject = require('./isObject');

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(prototype) {
    if (isObject(prototype)) {
      object.prototype = prototype;
      var result = new object;
      object.prototype = undefined;
    }
    return result || {};
  };
}());

module.exports = baseCreate;

},{"./isObject":310}],208:[function(require,module,exports){
var SetCache = require('./_SetCache'),
    arrayIncludes = require('./_arrayIncludes'),
    arrayIncludesWith = require('./_arrayIncludesWith'),
    arrayMap = require('./_arrayMap'),
    baseUnary = require('./_baseUnary'),
    cacheHas = require('./_cacheHas');

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of methods like `_.difference` without support for
 * excluding multiple arrays or iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      isCommon = true,
      length = array.length,
      result = [],
      valuesLength = values.length;

  if (!length) {
    return result;
  }
  if (iteratee) {
    values = arrayMap(values, baseUnary(iteratee));
  }
  if (comparator) {
    includes = arrayIncludesWith;
    isCommon = false;
  }
  else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas;
    isCommon = false;
    values = new SetCache(values);
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    if (isCommon && computed === computed) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer;
        }
      }
      result.push(value);
    }
    else if (!includes(values, computed, comparator)) {
      result.push(value);
    }
  }
  return result;
}

module.exports = baseDifference;

},{"./_SetCache":184,"./_arrayIncludes":192,"./_arrayIncludesWith":193,"./_arrayMap":194,"./_baseUnary":233,"./_cacheHas":234}],209:[function(require,module,exports){
var baseForOwn = require('./_baseForOwn'),
    createBaseEach = require('./_createBaseEach');

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

module.exports = baseEach;

},{"./_baseForOwn":212,"./_createBaseEach":248}],210:[function(require,module,exports){
var arrayPush = require('./_arrayPush'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isArrayLikeObject = require('./isArrayLikeObject');

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {boolean} [isDeep] Specify a deep flatten.
 * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, isDeep, isStrict, result) {
  result || (result = []);

  var index = -1,
      length = array.length;

  while (++index < length) {
    var value = array[index];
    if (isArrayLikeObject(value) &&
        (isStrict || isArray(value) || isArguments(value))) {
      if (isDeep) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, isDeep, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;

},{"./_arrayPush":195,"./isArguments":303,"./isArray":304,"./isArrayLikeObject":306}],211:[function(require,module,exports){
var createBaseFor = require('./_createBaseFor');

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iteratee functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;

},{"./_createBaseFor":249}],212:[function(require,module,exports){
var baseFor = require('./_baseFor'),
    keys = require('./keys');

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;

},{"./_baseFor":211,"./keys":316}],213:[function(require,module,exports){
var baseToPath = require('./_baseToPath'),
    isKey = require('./_isKey');

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path + ''] : baseToPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[path[index++]];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;

},{"./_baseToPath":232,"./_isKey":271}],214:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var getPrototypeOf = Object.getPrototypeOf;

/**
 * The base implementation of `_.has` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHas(object, key) {
  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
  // that are composed entirely of index properties, return `false` for
  // `hasOwnProperty` checks of them.
  return hasOwnProperty.call(object, key) ||
    (typeof object == 'object' && key in object && getPrototypeOf(object) === null);
}

module.exports = baseHas;

},{}],215:[function(require,module,exports){
/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return key in Object(object);
}

module.exports = baseHasIn;

},{}],216:[function(require,module,exports){
var indexOfNaN = require('./_indexOfNaN');

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return indexOfNaN(array, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = baseIndexOf;

},{"./_indexOfNaN":264}],217:[function(require,module,exports){
var baseIsEqualDeep = require('./_baseIsEqualDeep'),
    isObject = require('./isObject'),
    isObjectLike = require('./isObjectLike');

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {boolean} [bitmask] The bitmask of comparison flags.
 *  The bitmask may be composed of the following flags:
 *     1 - Unordered comparison
 *     2 - Partial comparison
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, bitmask, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
}

module.exports = baseIsEqual;

},{"./_baseIsEqualDeep":218,"./isObject":310,"./isObjectLike":311}],218:[function(require,module,exports){
var Stack = require('./_Stack'),
    equalArrays = require('./_equalArrays'),
    equalByTag = require('./_equalByTag'),
    equalObjects = require('./_equalObjects'),
    getTag = require('./_getTag'),
    isArray = require('./isArray'),
    isHostObject = require('./_isHostObject'),
    isTypedArray = require('./isTypedArray');

/** Used to compose bitmasks for comparison styles. */
var PARTIAL_COMPARE_FLAG = 2;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = getTag(object);
    if (objTag == argsTag) {
      objTag = objectTag;
    } else if (objTag != objectTag) {
      objIsArr = isTypedArray(object);
    }
  }
  if (!othIsArr) {
    othTag = getTag(other);
    if (othTag == argsTag) {
      othTag = objectTag;
    } else if (othTag != objectTag) {
      othIsArr = isTypedArray(other);
    }
  }
  var objIsObj = objTag == objectTag && !isHostObject(object),
      othIsObj = othTag == objectTag && !isHostObject(other),
      isSameTag = objTag == othTag;

  if (isSameTag && !(objIsArr || objIsObj)) {
    return equalByTag(object, other, objTag, equalFunc, customizer, bitmask);
  }
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
  if (!isPartial) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, bitmask, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, bitmask, stack);
}

module.exports = baseIsEqualDeep;

},{"./_Stack":185,"./_equalArrays":250,"./_equalByTag":251,"./_equalObjects":252,"./_getTag":257,"./_isHostObject":268,"./isArray":304,"./isTypedArray":315}],219:[function(require,module,exports){
var Stack = require('./_Stack'),
    baseIsEqual = require('./_baseIsEqual');

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack,
          result = customizer ? customizer(objValue, srcValue, key, object, source, stack) : undefined;

      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

module.exports = baseIsMatch;

},{"./_Stack":185,"./_baseIsEqual":217}],220:[function(require,module,exports){
var baseMatches = require('./_baseMatches'),
    baseMatchesProperty = require('./_baseMatchesProperty'),
    identity = require('./identity'),
    isArray = require('./isArray'),
    property = require('./property');

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  var type = typeof value;
  if (type == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (type == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

module.exports = baseIteratee;

},{"./_baseMatches":223,"./_baseMatchesProperty":224,"./identity":302,"./isArray":304,"./property":320}],221:[function(require,module,exports){
/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = Object.keys;

/**
 * The base implementation of `_.keys` which doesn't skip the constructor
 * property of prototypes or treat sparse arrays as dense.
 *
 * @private
 * @type Function
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  return nativeKeys(Object(object));
}

module.exports = baseKeys;

},{}],222:[function(require,module,exports){
var Reflect = require('./_Reflect'),
    iteratorToArray = require('./_iteratorToArray');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var enumerate = Reflect ? Reflect.enumerate : undefined,
    propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * The base implementation of `_.keysIn` which doesn't skip the constructor
 * property of prototypes or treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  object = object == null ? object : Object(object);

  var result = [];
  for (var key in object) {
    result.push(key);
  }
  return result;
}

// Fallback for IE < 9 with es6-shim.
if (enumerate && !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf')) {
  baseKeysIn = function(object) {
    return iteratorToArray(enumerate(object));
  };
}

module.exports = baseKeysIn;

},{"./_Reflect":182,"./_iteratorToArray":275}],223:[function(require,module,exports){
var baseIsMatch = require('./_baseIsMatch'),
    getMatchData = require('./_getMatchData');

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    var key = matchData[0][0],
        value = matchData[0][1];

    return function(object) {
      if (object == null) {
        return false;
      }
      return object[key] === value &&
        (value !== undefined || (key in Object(object)));
    };
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

module.exports = baseMatches;

},{"./_baseIsMatch":219,"./_getMatchData":254}],224:[function(require,module,exports){
var baseIsEqual = require('./_baseIsEqual'),
    get = require('./get'),
    hasIn = require('./hasIn');

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new function.
 */
function baseMatchesProperty(path, srcValue) {
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
  };
}

module.exports = baseMatchesProperty;

},{"./_baseIsEqual":217,"./get":300,"./hasIn":301}],225:[function(require,module,exports){
var arrayReduce = require('./_arrayReduce');

/**
 * The base implementation of `_.pick` without support for individual
 * property names.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} props The property names to pick.
 * @returns {Object} Returns the new object.
 */
function basePick(object, props) {
  object = Object(object);
  return arrayReduce(props, function(result, key) {
    if (key in object) {
      result[key] = object[key];
    }
    return result;
  }, {});
}

module.exports = basePick;

},{"./_arrayReduce":196}],226:[function(require,module,exports){
/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;

},{}],227:[function(require,module,exports){
var baseGet = require('./_baseGet');

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

module.exports = basePropertyDeep;

},{"./_baseGet":213}],228:[function(require,module,exports){
/**
 * The base implementation of `_.reduce` and `_.reduceRight`, without support
 * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} accumulator The initial value.
 * @param {boolean} initAccum Specify using the first or last element of `collection` as the initial value.
 * @param {Function} eachFunc The function to iterate over `collection`.
 * @returns {*} Returns the accumulated value.
 */
function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
  eachFunc(collection, function(value, index, collection) {
    accumulator = initAccum
      ? (initAccum = false, value)
      : iteratee(accumulator, value, index, collection);
  });
  return accumulator;
}

module.exports = baseReduce;

},{}],229:[function(require,module,exports){
/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;

},{}],230:[function(require,module,exports){
/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;

},{}],231:[function(require,module,exports){
var arrayMap = require('./_arrayMap');

/**
 * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
 * of key-value pairs for `object` corresponding to the property names of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the new array of key-value pairs.
 */
function baseToPairs(object, props) {
  return arrayMap(props, function(key) {
    return [key, object[key]];
  });
}

module.exports = baseToPairs;

},{"./_arrayMap":194}],232:[function(require,module,exports){
var isArray = require('./isArray'),
    stringToPath = require('./_stringToPath');

/**
 * The base implementation of `_.toPath` which only converts `value` to a
 * path if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Array} Returns the property path array.
 */
function baseToPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

module.exports = baseToPath;

},{"./_stringToPath":291,"./isArray":304}],233:[function(require,module,exports){
/**
 * The base implementation of `_.unary` without support for storing wrapper metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;

},{}],234:[function(require,module,exports){
var isKeyable = require('./_isKeyable');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Checks if `value` is in `cache`.
 *
 * @private
 * @param {Object} cache The set cache to search.
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function cacheHas(cache, value) {
  var map = cache.__data__;
  if (isKeyable(value)) {
    var data = map.__data__,
        hash = typeof value == 'string' ? data.string : data.hash;

    return hash[value] === HASH_UNDEFINED;
  }
  return map.has(value);
}

module.exports = cacheHas;

},{"./_isKeyable":272}],235:[function(require,module,exports){
var isKeyable = require('./_isKeyable');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the set cache.
 *
 * @private
 * @name push
 * @memberOf SetCache
 * @param {*} value The value to cache.
 */
function cachePush(value) {
  var map = this.__data__;
  if (isKeyable(value)) {
    var data = map.__data__,
        hash = typeof value == 'string' ? data.string : data.hash;

    hash[value] = HASH_UNDEFINED;
  }
  else {
    map.set(value, HASH_UNDEFINED);
  }
}

module.exports = cachePush;

},{"./_isKeyable":272}],236:[function(require,module,exports){
/**
 * Checks if `value` is a global object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
 */
function checkGlobal(value) {
  return (value && value.Object === Object) ? value : null;
}

module.exports = checkGlobal;

},{}],237:[function(require,module,exports){
var Uint8Array = require('./_Uint8Array');

/**
 * Creates a clone of `buffer`.
 *
 * @private
 * @param {ArrayBuffer} buffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneBuffer(buffer) {
  var Ctor = buffer.constructor,
      result = new Ctor(buffer.byteLength),
      view = new Uint8Array(result);

  view.set(new Uint8Array(buffer));
  return result;
}

module.exports = cloneBuffer;

},{"./_Uint8Array":187}],238:[function(require,module,exports){
var addMapEntry = require('./_addMapEntry'),
    arrayReduce = require('./_arrayReduce'),
    mapToArray = require('./_mapToArray');

/**
 * Creates a clone of `map`.
 *
 * @private
 * @param {Object} map The map to clone.
 * @returns {Object} Returns the cloned map.
 */
function cloneMap(map) {
  var Ctor = map.constructor;
  return arrayReduce(mapToArray(map), addMapEntry, new Ctor);
}

module.exports = cloneMap;

},{"./_addMapEntry":188,"./_arrayReduce":196,"./_mapToArray":281}],239:[function(require,module,exports){
/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var Ctor = regexp.constructor,
      result = new Ctor(regexp.source, reFlags.exec(regexp));

  result.lastIndex = regexp.lastIndex;
  return result;
}

module.exports = cloneRegExp;

},{}],240:[function(require,module,exports){
var addSetEntry = require('./_addSetEntry'),
    arrayReduce = require('./_arrayReduce'),
    setToArray = require('./_setToArray');

/**
 * Creates a clone of `set`.
 *
 * @private
 * @param {Object} set The set to clone.
 * @returns {Object} Returns the cloned set.
 */
function cloneSet(set) {
  var Ctor = set.constructor;
  return arrayReduce(setToArray(set), addSetEntry, new Ctor);
}

module.exports = cloneSet;

},{"./_addSetEntry":189,"./_arrayReduce":196,"./_setToArray":285}],241:[function(require,module,exports){
var Symbol = require('./_Symbol');

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = Symbol ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return Symbol ? Object(symbolValueOf.call(symbol)) : {};
}

module.exports = cloneSymbol;

},{"./_Symbol":186}],242:[function(require,module,exports){
var cloneBuffer = require('./_cloneBuffer');

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = typedArray.buffer,
      Ctor = typedArray.constructor;

  return new Ctor(isDeep ? cloneBuffer(buffer) : buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;

},{"./_cloneBuffer":237}],243:[function(require,module,exports){
/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;

},{}],244:[function(require,module,exports){
var copyObjectWith = require('./_copyObjectWith');

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property names to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object) {
  return copyObjectWith(source, props, object);
}

module.exports = copyObject;

},{"./_copyObjectWith":245}],245:[function(require,module,exports){
var assignValue = require('./_assignValue');

/**
 * This function is like `copyObject` except that it accepts a function to
 * customize copied values.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property names to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObjectWith(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index],
        newValue = customizer ? customizer(object[key], source[key], key, object, source) : source[key];

    assignValue(object, key, newValue);
  }
  return object;
}

module.exports = copyObjectWith;

},{"./_assignValue":199}],246:[function(require,module,exports){
var copyObject = require('./_copyObject'),
    getSymbols = require('./_getSymbols');

/**
 * Copies own symbol properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

module.exports = copySymbols;

},{"./_copyObject":244,"./_getSymbols":256}],247:[function(require,module,exports){
var isIterateeCall = require('./_isIterateeCall'),
    rest = require('./rest');

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return rest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = typeof customizer == 'function' ? (length--, customizer) : undefined;
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;

},{"./_isIterateeCall":270,"./rest":322}],248:[function(require,module,exports){
var isArrayLike = require('./isArrayLike');

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

module.exports = createBaseEach;

},{"./isArrayLike":305}],249:[function(require,module,exports){
/**
 * Creates a base function for methods like `_.forIn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;

},{}],250:[function(require,module,exports){
var arraySome = require('./_arraySome');

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
 * @param {Object} [stack] Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
  var index = -1,
      isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      isUnordered = bitmask & UNORDERED_COMPARE_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked) {
    return stacked == other;
  }
  var result = true;
  stack.set(array, other);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (isUnordered) {
      if (!arraySome(other, function(othValue) {
            return arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack);
          })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  return result;
}

module.exports = equalArrays;

},{"./_arraySome":197}],251:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    Uint8Array = require('./_Uint8Array'),
    mapToArray = require('./_mapToArray'),
    setToArray = require('./_setToArray');

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = Symbol ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, equalFunc, customizer, bitmask) {
  switch (tag) {
    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
      return +object == +other;

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case numberTag:
      // Treat `NaN` vs. `NaN` as equal.
      return (object != +object) ? other != +other : object == +other;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings primitives and string
      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
      convert || (convert = setToArray);

      // Recursively compare objects (susceptible to call stack limits).
      return (isPartial || object.size == other.size) &&
        equalFunc(convert(object), convert(other), customizer, bitmask | UNORDERED_COMPARE_FLAG);

    case symbolTag:
      return !!Symbol && (symbolValueOf.call(object) == symbolValueOf.call(other));
  }
  return false;
}

module.exports = equalByTag;

},{"./_Symbol":186,"./_Uint8Array":187,"./_mapToArray":281,"./_setToArray":285}],252:[function(require,module,exports){
var baseHas = require('./_baseHas'),
    keys = require('./keys');

/** Used to compose bitmasks for comparison styles. */
var PARTIAL_COMPARE_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : baseHas(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  return result;
}

module.exports = equalObjects;

},{"./_baseHas":214,"./keys":316}],253:[function(require,module,exports){
var baseProperty = require('./_baseProperty');

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

module.exports = getLength;

},{"./_baseProperty":226}],254:[function(require,module,exports){
var isStrictComparable = require('./_isStrictComparable'),
    toPairs = require('./toPairs');

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = toPairs(object),
      length = result.length;

  while (length--) {
    result[length][2] = isStrictComparable(result[length][1]);
  }
  return result;
}

module.exports = getMatchData;

},{"./_isStrictComparable":274,"./toPairs":325}],255:[function(require,module,exports){
var isNative = require('./isNative');

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

module.exports = getNative;

},{"./isNative":309}],256:[function(require,module,exports){
/** Built-in value references. */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own symbol properties of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = getOwnPropertySymbols || function() {
  return [];
};

module.exports = getSymbols;

},{}],257:[function(require,module,exports){
var Map = require('./_Map'),
    Set = require('./_Set');

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    setTag = '[object Set]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = Function.prototype.toString;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect maps and sets. */
var mapCtorString = Map ? funcToString.call(Map) : '',
    setCtorString = Set ? funcToString.call(Set) : '';

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function getTag(value) {
  return objectToString.call(value);
}

// Fallback for IE 11 providing `toStringTag` values for maps and sets.
if ((Map && getTag(new Map) != mapTag) || (Set && getTag(new Set) != setTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : null,
        ctorString = typeof Ctor == 'function' ? funcToString.call(Ctor) : '';

    if (ctorString) {
      if (ctorString == mapCtorString) {
        return mapTag;
      }
      if (ctorString == setCtorString) {
        return setTag;
      }
    }
    return result;
  };
}

module.exports = getTag;

},{"./_Map":180,"./_Set":183}],258:[function(require,module,exports){
var baseToPath = require('./_baseToPath'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isIndex = require('./_isIndex'),
    isKey = require('./_isKey'),
    isLength = require('./isLength'),
    isString = require('./isString'),
    last = require('./last'),
    parent = require('./_parent');

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  if (object == null) {
    return false;
  }
  var result = hasFunc(object, path);
  if (!result && !isKey(path)) {
    path = baseToPath(path);
    object = parent(object, path);
    if (object != null) {
      path = last(path);
      result = hasFunc(object, path);
    }
  }
  var length = object ? object.length : undefined;
  return result || (
    !!length && isLength(length) && isIndex(path, length) &&
    (isArray(object) || isString(object) || isArguments(object))
  );
}

module.exports = hasPath;

},{"./_baseToPath":232,"./_isIndex":269,"./_isKey":271,"./_parent":283,"./isArguments":303,"./isArray":304,"./isLength":308,"./isString":313,"./last":318}],259:[function(require,module,exports){
var hashHas = require('./_hashHas');

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(hash, key) {
  return hashHas(hash, key) && delete hash[key];
}

module.exports = hashDelete;

},{"./_hashHas":261}],260:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @param {Object} hash The hash to query.
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(hash, key) {
  if (nativeCreate) {
    var result = hash[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(hash, key) ? hash[key] : undefined;
}

module.exports = hashGet;

},{"./_nativeCreate":282}],261:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @param {Object} hash The hash to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(hash, key) {
  return nativeCreate ? hash[key] !== undefined : hasOwnProperty.call(hash, key);
}

module.exports = hashHas;

},{"./_nativeCreate":282}],262:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 */
function hashSet(hash, key, value) {
  hash[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
}

module.exports = hashSet;

},{"./_nativeCreate":282}],263:[function(require,module,exports){
var baseTimes = require('./_baseTimes'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isLength = require('./isLength'),
    isString = require('./isString');

/**
 * Creates an array of index keys for `object` values of arrays,
 * `arguments` objects, and strings, otherwise `null` is returned.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array|null} Returns index keys, else `null`.
 */
function indexKeys(object) {
  var length = object ? object.length : undefined;
  if (isLength(length) &&
      (isArray(object) || isString(object) || isArguments(object))) {
    return baseTimes(length, String);
  }
  return null;
}

module.exports = indexKeys;

},{"./_baseTimes":230,"./isArguments":303,"./isArray":304,"./isLength":308,"./isString":313}],264:[function(require,module,exports){
/**
 * Gets the index at which the first occurrence of `NaN` is found in `array`.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
 */
function indexOfNaN(array, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 0 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    var other = array[index];
    if (other !== other) {
      return index;
    }
  }
  return -1;
}

module.exports = indexOfNaN;

},{}],265:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;

},{}],266:[function(require,module,exports){
var cloneBuffer = require('./_cloneBuffer'),
    cloneMap = require('./_cloneMap'),
    cloneRegExp = require('./_cloneRegExp'),
    cloneSet = require('./_cloneSet'),
    cloneSymbol = require('./_cloneSymbol'),
    cloneTypedArray = require('./_cloneTypedArray');

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return cloneMap(object);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return cloneSet(object);

    case symbolTag:
      return cloneSymbol(object);
  }
}

module.exports = initCloneByTag;

},{"./_cloneBuffer":237,"./_cloneMap":238,"./_cloneRegExp":239,"./_cloneSet":240,"./_cloneSymbol":241,"./_cloneTypedArray":242}],267:[function(require,module,exports){
var baseCreate = require('./_baseCreate'),
    isFunction = require('./isFunction'),
    isPrototype = require('./_isPrototype');

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  if (isPrototype(object)) {
    return {};
  }
  var Ctor = object.constructor;
  return baseCreate(isFunction(Ctor) ? Ctor.prototype : undefined);
}

module.exports = initCloneObject;

},{"./_baseCreate":207,"./_isPrototype":273,"./isFunction":307}],268:[function(require,module,exports){
/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

module.exports = isHostObject;

},{}],269:[function(require,module,exports){
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

},{}],270:[function(require,module,exports){
var eq = require('./eq'),
    isArrayLike = require('./isArrayLike'),
    isIndex = require('./_isIndex'),
    isObject = require('./isObject');

/**
 * Checks if the provided arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
      ? (isArrayLike(object) && isIndex(index, object.length))
      : (type == 'string' && index in object)) {
    return eq(object[index], value);
  }
  return false;
}

module.exports = isIterateeCall;

},{"./_isIndex":269,"./eq":298,"./isArrayLike":305,"./isObject":310}],271:[function(require,module,exports){
var isArray = require('./isArray');

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (typeof value == 'number') {
    return true;
  }
  return !isArray(value) &&
    (reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
      (object != null && value in Object(object)));
}

module.exports = isKey;

},{"./isArray":304}],272:[function(require,module,exports){
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return type == 'number' || type == 'boolean' ||
    (type == 'string' && value !== '__proto__') || value == null;
}

module.exports = isKeyable;

},{}],273:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;

},{}],274:[function(require,module,exports){
var isObject = require('./isObject');

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

module.exports = isStrictComparable;

},{"./isObject":310}],275:[function(require,module,exports){
/**
 * Converts `iterator` to an array.
 *
 * @private
 * @param {Object} iterator The iterator to convert.
 * @returns {Array} Returns the converted array.
 */
function iteratorToArray(iterator) {
  var data,
      result = [];

  while (!(data = iterator.next()).done) {
    result.push(data.value);
  }
  return result;
}

module.exports = iteratorToArray;

},{}],276:[function(require,module,exports){
var Hash = require('./_Hash'),
    Map = require('./_Map');

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapClear() {
  this.__data__ = { 'hash': new Hash, 'map': Map ? new Map : [], 'string': new Hash };
}

module.exports = mapClear;

},{"./_Hash":179,"./_Map":180}],277:[function(require,module,exports){
var Map = require('./_Map'),
    assocDelete = require('./_assocDelete'),
    hashDelete = require('./_hashDelete'),
    isKeyable = require('./_isKeyable');

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapDelete(key) {
  var data = this.__data__;
  if (isKeyable(key)) {
    return hashDelete(typeof key == 'string' ? data.string : data.hash, key);
  }
  return Map ? data.map['delete'](key) : assocDelete(data.map, key);
}

module.exports = mapDelete;

},{"./_Map":180,"./_assocDelete":200,"./_hashDelete":259,"./_isKeyable":272}],278:[function(require,module,exports){
var Map = require('./_Map'),
    assocGet = require('./_assocGet'),
    hashGet = require('./_hashGet'),
    isKeyable = require('./_isKeyable');

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapGet(key) {
  var data = this.__data__;
  if (isKeyable(key)) {
    return hashGet(typeof key == 'string' ? data.string : data.hash, key);
  }
  return Map ? data.map.get(key) : assocGet(data.map, key);
}

module.exports = mapGet;

},{"./_Map":180,"./_assocGet":201,"./_hashGet":260,"./_isKeyable":272}],279:[function(require,module,exports){
var Map = require('./_Map'),
    assocHas = require('./_assocHas'),
    hashHas = require('./_hashHas'),
    isKeyable = require('./_isKeyable');

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapHas(key) {
  var data = this.__data__;
  if (isKeyable(key)) {
    return hashHas(typeof key == 'string' ? data.string : data.hash, key);
  }
  return Map ? data.map.has(key) : assocHas(data.map, key);
}

module.exports = mapHas;

},{"./_Map":180,"./_assocHas":202,"./_hashHas":261,"./_isKeyable":272}],280:[function(require,module,exports){
var Map = require('./_Map'),
    assocSet = require('./_assocSet'),
    hashSet = require('./_hashSet'),
    isKeyable = require('./_isKeyable');

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache object.
 */
function mapSet(key, value) {
  var data = this.__data__;
  if (isKeyable(key)) {
    hashSet(typeof key == 'string' ? data.string : data.hash, key, value);
  } else if (Map) {
    data.map.set(key, value);
  } else {
    assocSet(data.map, key, value);
  }
  return this;
}

module.exports = mapSet;

},{"./_Map":180,"./_assocSet":204,"./_hashSet":262,"./_isKeyable":272}],281:[function(require,module,exports){
/**
 * Converts `map` to an array.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the converted array.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;

},{}],282:[function(require,module,exports){
var getNative = require('./_getNative');

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;

},{"./_getNative":255}],283:[function(require,module,exports){
var baseSlice = require('./_baseSlice'),
    get = require('./get');

/**
 * Gets the parent value at `path` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} path The path to get the parent value of.
 * @returns {*} Returns the parent value.
 */
function parent(object, path) {
  return path.length == 1 ? object : get(object, baseSlice(path, 0, -1));
}

module.exports = parent;

},{"./_baseSlice":229,"./get":300}],284:[function(require,module,exports){
(function (global){
var checkGlobal = require('./_checkGlobal');

/** Used to determine if values are of the language type `Object`. */
var objectTypes = {
  'function': true,
  'object': true
};

/** Detect free variable `exports`. */
var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType) ? exports : null;

/** Detect free variable `module`. */
var freeModule = (objectTypes[typeof module] && module && !module.nodeType) ? module : null;

/** Detect free variable `global` from Node.js. */
var freeGlobal = checkGlobal(freeExports && freeModule && typeof global == 'object' && global);

/** Detect free variable `self`. */
var freeSelf = checkGlobal(objectTypes[typeof self] && self);

/** Detect free variable `window`. */
var freeWindow = checkGlobal(objectTypes[typeof window] && window);

/** Detect `this` as the global object. */
var thisGlobal = checkGlobal(objectTypes[typeof this] && this);

/**
 * Used as a reference to the global object.
 *
 * The `this` value is used if it's the global object to avoid Greasemonkey's
 * restricted `window` object, otherwise the `window` object is used.
 */
var root = freeGlobal || ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) || freeSelf || thisGlobal || Function('return this')();

module.exports = root;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./_checkGlobal":236}],285:[function(require,module,exports){
/**
 * Converts `set` to an array.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the converted array.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;

},{}],286:[function(require,module,exports){
/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = { 'array': [], 'map': null };
}

module.exports = stackClear;

},{}],287:[function(require,module,exports){
var assocDelete = require('./_assocDelete');

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      array = data.array;

  return array ? assocDelete(array, key) : data.map['delete'](key);
}

module.exports = stackDelete;

},{"./_assocDelete":200}],288:[function(require,module,exports){
var assocGet = require('./_assocGet');

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  var data = this.__data__,
      array = data.array;

  return array ? assocGet(array, key) : data.map.get(key);
}

module.exports = stackGet;

},{"./_assocGet":201}],289:[function(require,module,exports){
var assocHas = require('./_assocHas');

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  var data = this.__data__,
      array = data.array;

  return array ? assocHas(array, key) : data.map.has(key);
}

module.exports = stackHas;

},{"./_assocHas":202}],290:[function(require,module,exports){
var MapCache = require('./_MapCache'),
    assocSet = require('./_assocSet');

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache object.
 */
function stackSet(key, value) {
  var data = this.__data__,
      array = data.array;

  if (array) {
    if (array.length < (LARGE_ARRAY_SIZE - 1)) {
      assocSet(array, key, value);
    } else {
      data.array = null;
      data.map = new MapCache(array);
    }
  }
  var map = data.map;
  if (map) {
    map.set(key, value);
  }
  return this;
}

module.exports = stackSet;

},{"./_MapCache":181,"./_assocSet":204}],291:[function(require,module,exports){
var toString = require('./toString');

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
function stringToPath(string) {
  var result = [];
  toString(string).replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
}

module.exports = stringToPath;

},{"./toString":326}],292:[function(require,module,exports){
var identity = require('./identity');

/**
 * Converts `value` to a function if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Function} Returns the function.
 */
function toFunction(value) {
  return typeof value == 'function' ? value : identity;
}

module.exports = toFunction;

},{"./identity":302}],293:[function(require,module,exports){
var copyObject = require('./_copyObject'),
    createAssigner = require('./_createAssigner'),
    keys = require('./keys');

/**
 * Assigns own enumerable properties of source objects to the destination
 * object. Source objects are applied from left to right. Subsequent sources
 * overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object` and is loosely based on
 * [`Object.assign`](https://mdn.io/Object/assign).
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * function Foo() {
 *   this.c = 3;
 * }
 *
 * function Bar() {
 *   this.e = 5;
 * }
 *
 * Foo.prototype.d = 4;
 * Bar.prototype.f = 6;
 *
 * _.assign({ 'a': 1 }, new Foo, new Bar);
 * // => { 'a': 1, 'c': 3, 'e': 5 }
 */
var assign = createAssigner(function(object, source) {
  copyObject(source, keys(source), object);
});

module.exports = assign;

},{"./_copyObject":244,"./_createAssigner":247,"./keys":316}],294:[function(require,module,exports){
var copyObjectWith = require('./_copyObjectWith'),
    createAssigner = require('./_createAssigner'),
    keysIn = require('./keysIn');

/**
 * This method is like `_.assignIn` except that it accepts `customizer` which
 * is invoked to produce the assigned values. If `customizer` returns `undefined`
 * assignment is handled by the method instead. The `customizer` is invoked
 * with five arguments: (objValue, srcValue, key, object, source).
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @alias extendWith
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} sources The source objects.
 * @param {Function} [customizer] The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @example
 *
 * function customizer(objValue, srcValue) {
 *   return _.isUndefined(objValue) ? srcValue : objValue;
 * }
 *
 * var defaults = _.partialRight(_.assignInWith, customizer);
 *
 * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
 * // => { 'a': 1, 'b': 2 }
 */
var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
  copyObjectWith(source, keysIn(source), object, customizer);
});

module.exports = assignInWith;

},{"./_copyObjectWith":245,"./_createAssigner":247,"./keysIn":317}],295:[function(require,module,exports){
var baseClone = require('./_baseClone');

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, true);
}

module.exports = cloneDeep;

},{"./_baseClone":206}],296:[function(require,module,exports){
var apply = require('./_apply'),
    assignInDefaults = require('./_assignInDefaults'),
    assignInWith = require('./assignInWith'),
    rest = require('./rest');

/**
 * Assigns own and inherited enumerable properties of source objects to the
 * destination object for all destination properties that resolve to `undefined`.
 * Source objects are applied from left to right. Once a property is set,
 * additional values of the same property are ignored.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * _.defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
 * // => { 'user': 'barney', 'age': 36 }
 */
var defaults = rest(function(args) {
  args.push(undefined, assignInDefaults);
  return apply(assignInWith, undefined, args);
});

module.exports = defaults;

},{"./_apply":190,"./_assignInDefaults":198,"./assignInWith":294,"./rest":322}],297:[function(require,module,exports){
module.exports = require('./forEach');

},{"./forEach":299}],298:[function(require,module,exports){
/**
 * Performs a [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'user': 'fred' };
 * var other = { 'user': 'fred' };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;

},{}],299:[function(require,module,exports){
var arrayEach = require('./_arrayEach'),
    baseEach = require('./_baseEach'),
    isArray = require('./isArray'),
    toFunction = require('./_toFunction');

/**
 * Iterates over elements of `collection` invoking `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length" property
 * are iterated like arrays. To avoid this behavior use `_.forIn` or `_.forOwn`
 * for object iteration.
 *
 * @static
 * @memberOf _
 * @alias each
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @example
 *
 * _([1, 2]).forEach(function(value) {
 *   console.log(value);
 * });
 * // => logs `1` then `2`
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
 *   console.log(key);
 * });
 * // => logs 'a' then 'b' (iteration order is not guaranteed)
 */
function forEach(collection, iteratee) {
  return (typeof iteratee == 'function' && isArray(collection))
    ? arrayEach(collection, iteratee)
    : baseEach(collection, toFunction(iteratee));
}

module.exports = forEach;

},{"./_arrayEach":191,"./_baseEach":209,"./_toFunction":292,"./isArray":304}],300:[function(require,module,exports){
var baseGet = require('./_baseGet');

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined` the `defaultValue` is used in its place.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;

},{"./_baseGet":213}],301:[function(require,module,exports){
var baseHasIn = require('./_baseHasIn'),
    hasPath = require('./_hasPath');

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': _.create({ 'c': 3 }) }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b.c');
 * // => true
 *
 * _.hasIn(object, ['a', 'b', 'c']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return hasPath(object, path, baseHasIn);
}

module.exports = hasIn;

},{"./_baseHasIn":215,"./_hasPath":258}],302:[function(require,module,exports){
/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],303:[function(require,module,exports){
var isArrayLikeObject = require('./isArrayLikeObject');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

module.exports = isArguments;

},{"./isArrayLikeObject":306}],304:[function(require,module,exports){
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;

},{}],305:[function(require,module,exports){
var getLength = require('./_getLength'),
    isFunction = require('./isFunction'),
    isLength = require('./isLength');

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null &&
    !(typeof value == 'function' && isFunction(value)) && isLength(getLength(value));
}

module.exports = isArrayLike;

},{"./_getLength":253,"./isFunction":307,"./isLength":308}],306:[function(require,module,exports){
var isArrayLike = require('./isArrayLike'),
    isObjectLike = require('./isObjectLike');

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;

},{"./isArrayLike":305,"./isObjectLike":311}],307:[function(require,module,exports){
var isObject = require('./isObject');

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8 which returns 'object' for typed array constructors, and
  // PhantomJS 1.9 which returns 'function' for `NodeList` instances.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

module.exports = isFunction;

},{"./isObject":310}],308:[function(require,module,exports){
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],309:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isHostObject = require('./_isHostObject'),
    isObjectLike = require('./isObjectLike');

/** Used to match `RegExp` [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns). */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(funcToString.call(value));
  }
  return isObjectLike(value) &&
    (isHostObject(value) ? reIsNative : reIsHostCtor).test(value);
}

module.exports = isNative;

},{"./_isHostObject":268,"./isFunction":307,"./isObjectLike":311}],310:[function(require,module,exports){
/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],311:[function(require,module,exports){
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],312:[function(require,module,exports){
var isHostObject = require('./_isHostObject'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = Function.prototype.toString;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var getPrototypeOf = Object.getPrototypeOf;

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || objectToString.call(value) != objectTag || isHostObject(value)) {
    return false;
  }
  var proto = objectProto;
  if (typeof value.constructor == 'function') {
    proto = getPrototypeOf(value);
  }
  if (proto === null) {
    return true;
  }
  var Ctor = proto.constructor;
  return (typeof Ctor == 'function' &&
    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
}

module.exports = isPlainObject;

},{"./_isHostObject":268,"./isObjectLike":311}],313:[function(require,module,exports){
var isArray = require('./isArray'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var stringTag = '[object String]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
}

module.exports = isString;

},{"./isArray":304,"./isObjectLike":311}],314:[function(require,module,exports){
var isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

module.exports = isSymbol;

},{"./isObjectLike":311}],315:[function(require,module,exports){
var isLength = require('./isLength'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dateTag] = typedArrayTags[errorTag] =
typedArrayTags[funcTag] = typedArrayTags[mapTag] =
typedArrayTags[numberTag] = typedArrayTags[objectTag] =
typedArrayTags[regexpTag] = typedArrayTags[setTag] =
typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
function isTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
}

module.exports = isTypedArray;

},{"./isLength":308,"./isObjectLike":311}],316:[function(require,module,exports){
var baseHas = require('./_baseHas'),
    baseKeys = require('./_baseKeys'),
    indexKeys = require('./_indexKeys'),
    isArrayLike = require('./isArrayLike'),
    isIndex = require('./_isIndex'),
    isPrototype = require('./_isPrototype');

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  var isProto = isPrototype(object);
  if (!(isProto || isArrayLike(object))) {
    return baseKeys(object);
  }
  var indexes = indexKeys(object),
      skipIndexes = !!indexes,
      result = indexes || [],
      length = result.length;

  for (var key in object) {
    if (baseHas(object, key) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
        !(isProto && key == 'constructor')) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keys;

},{"./_baseHas":214,"./_baseKeys":221,"./_indexKeys":263,"./_isIndex":269,"./_isPrototype":273,"./isArrayLike":305}],317:[function(require,module,exports){
var baseKeysIn = require('./_baseKeysIn'),
    indexKeys = require('./_indexKeys'),
    isIndex = require('./_isIndex'),
    isPrototype = require('./_isPrototype');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  var index = -1,
      isProto = isPrototype(object),
      props = baseKeysIn(object),
      propsLength = props.length,
      indexes = indexKeys(object),
      skipIndexes = !!indexes,
      result = indexes || [],
      length = result.length;

  while (++index < propsLength) {
    var key = props[index];
    if (!(skipIndexes && (key == 'length' || isIndex(key, length))) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keysIn;

},{"./_baseKeysIn":222,"./_indexKeys":263,"./_isIndex":269,"./_isPrototype":273}],318:[function(require,module,exports){
/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array ? array.length : 0;
  return length ? array[length - 1] : undefined;
}

module.exports = last;

},{}],319:[function(require,module,exports){
var arrayMap = require('./_arrayMap'),
    baseDifference = require('./_baseDifference'),
    baseFlatten = require('./_baseFlatten'),
    basePick = require('./_basePick'),
    keysIn = require('./keysIn'),
    rest = require('./rest');

/**
 * The opposite of `_.pick`; this method creates an object composed of the
 * own and inherited enumerable properties of `object` that are not omitted.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [props] The property names to omit, specified
 *  individually or in arrays..
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.omit(object, ['a', 'c']);
 * // => { 'b': '2' }
 */
var omit = rest(function(object, props) {
  if (object == null) {
    return {};
  }
  props = arrayMap(baseFlatten(props), String);
  return basePick(object, baseDifference(keysIn(object), props));
});

module.exports = omit;

},{"./_arrayMap":194,"./_baseDifference":208,"./_baseFlatten":210,"./_basePick":225,"./keysIn":317,"./rest":322}],320:[function(require,module,exports){
var baseProperty = require('./_baseProperty'),
    basePropertyDeep = require('./_basePropertyDeep'),
    isKey = require('./_isKey');

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': { 'c': 2 } } },
 *   { 'a': { 'b': { 'c': 1 } } }
 * ];
 *
 * _.map(objects, _.property('a.b.c'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
}

module.exports = property;

},{"./_baseProperty":226,"./_basePropertyDeep":227,"./_isKey":271}],321:[function(require,module,exports){
var arrayReduce = require('./_arrayReduce'),
    baseEach = require('./_baseEach'),
    baseIteratee = require('./_baseIteratee'),
    baseReduce = require('./_baseReduce'),
    isArray = require('./isArray');

/**
 * Reduces `collection` to a value which is the accumulated result of running
 * each element in `collection` through `iteratee`, where each successive
 * invocation is supplied the return value of the previous. If `accumulator`
 * is not provided the first element of `collection` is used as the initial
 * value. The iteratee is invoked with four arguments:
 * (accumulator, value, index|key, collection).
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `_.reduce`, `_.reduceRight`, and `_.transform`.
 *
 * The guarded methods are:
 * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
 * and `sortBy`
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @returns {*} Returns the accumulated value.
 * @example
 *
 * _.reduce([1, 2], function(sum, n) {
 *   return sum + n;
 * }, 0);
 * // => 3
 *
 * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
 *   (result[value] || (result[value] = [])).push(key);
 *   return result;
 * }, {});
 * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
 */
function reduce(collection, iteratee, accumulator) {
  var func = isArray(collection) ? arrayReduce : baseReduce,
      initAccum = arguments.length < 3;

  return func(collection, baseIteratee(iteratee, 4), accumulator, initAccum, baseEach);
}

module.exports = reduce;

},{"./_arrayReduce":196,"./_baseEach":209,"./_baseIteratee":220,"./_baseReduce":228,"./isArray":304}],322:[function(require,module,exports){
var apply = require('./_apply'),
    toInteger = require('./toInteger');

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that invokes `func` with the `this` binding of the
 * created function and arguments from `start` and beyond provided as an array.
 *
 * **Note:** This method is based on the [rest parameter](https://mdn.io/rest_parameters).
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var say = _.rest(function(what, names) {
 *   return what + ' ' + _.initial(names).join(', ') +
 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
 * });
 *
 * say('hello', 'fred', 'barney', 'pebbles');
 * // => 'hello fred, barney, & pebbles'
 */
function rest(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  start = nativeMax(start === undefined ? (func.length - 1) : toInteger(start), 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    switch (start) {
      case 0: return func.call(this, array);
      case 1: return func.call(this, args[0], array);
      case 2: return func.call(this, args[0], args[1], array);
    }
    var otherArgs = Array(start + 1);
    index = -1;
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

module.exports = rest;

},{"./_apply":190,"./toInteger":323}],323:[function(require,module,exports){
var toNumber = require('./toNumber');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to an integer.
 *
 * **Note:** This function is loosely based on [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3');
 * // => 3
 */
function toInteger(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  var remainder = value % 1;
  return value === value ? (remainder ? value - remainder : value) : 0;
}

module.exports = toInteger;

},{"./toNumber":324}],324:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isObject = require('./isObject');

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3);
 * // => 3
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3');
 * // => 3
 */
function toNumber(value) {
  if (isObject(value)) {
    var other = isFunction(value.valueOf) ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;

},{"./isFunction":307,"./isObject":310}],325:[function(require,module,exports){
var baseToPairs = require('./_baseToPairs'),
    keys = require('./keys');

/**
 * Creates an array of own enumerable key-value pairs for `object`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the new array of key-value pairs.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.toPairs(new Foo);
 * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
 */
function toPairs(object) {
  return baseToPairs(object, keys(object));
}

module.exports = toPairs;

},{"./_baseToPairs":231,"./keys":316}],326:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = Symbol ? symbolProto.toString : undefined;

/**
 * Converts `value` to a string if it's not one. An empty string is returned
 * for `null` and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (value == null) {
    return '';
  }
  if (isSymbol(value)) {
    return Symbol ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toString;

},{"./_Symbol":186,"./isSymbol":314}],327:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],328:[function(require,module,exports){
'use strict';

var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};

},{}],329:[function(require,module,exports){
'use strict';

var stringify = require('./stringify');
var parse = require('./parse');
var formats = require('./formats');

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};

},{"./formats":328,"./parse":330,"./stringify":331}],330:[function(require,module,exports){
'use strict';

var utils = require('./utils');

var has = Object.prototype.hasOwnProperty;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    parameterLimit: 1000,
    plainObjects: false,
    strictNullHandling: false
};

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);

    for (var i = 0; i < parts.length; ++i) {
        var part = parts[i];
        var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos));
            val = options.decoder(part.slice(pos + 1));
        }
        if (has.call(obj, key)) {
            obj[key] = [].concat(obj[key]).concat(val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function parseObjectRecursive(chain, val, options) {
    if (!chain.length) {
        return val;
    }

    var root = chain.shift();

    var obj;
    if (root === '[]') {
        obj = [];
        obj = obj.concat(parseObject(chain, val, options));
    } else {
        obj = options.plainObjects ? Object.create(null) : {};
        var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
        var index = parseInt(cleanRoot, 10);
        if (
            !isNaN(index) &&
            root !== cleanRoot &&
            String(index) === cleanRoot &&
            index >= 0 &&
            (options.parseArrays && index <= options.arrayLimit)
        ) {
            obj = [];
            obj[index] = parseObject(chain, val, options);
        } else {
            obj[cleanRoot] = parseObject(chain, val, options);
        }
    }

    return obj;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys
        // that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

module.exports = function (str, opts) {
    var options = opts || {};

    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;
    options.parseArrays = options.parseArrays !== false;
    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;
    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults.allowDots;
    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;
    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;
    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};

},{"./utils":332}],331:[function(require,module,exports){
'use strict';

var utils = require('./utils');
var formats = require('./formats');

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
        return prefix;
    }
};

var toISO = Date.prototype.toISOString;

var defaults = {
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify( // eslint-disable-line func-name-matching
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter,
    encodeValuesOnly
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix);
            return [formatter(keyValue) + '=' + formatter(encoder(obj))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (Array.isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (Array.isArray(obj)) {
            values = values.concat(stringify(
                obj[key],
                generateArrayPrefix(prefix, key),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        } else {
            values = values.concat(stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        }
    }

    return values;
};

module.exports = function (object, opts) {
    var obj = object;
    var options = opts || {};

    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
    var encoder = typeof options.encoder === 'function' ? options.encoder : defaults.encoder;
    var sort = typeof options.sort === 'function' ? options.sort : null;
    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;
    var encodeValuesOnly = typeof options.encodeValuesOnly === 'boolean' ? options.encodeValuesOnly : defaults.encodeValuesOnly;
    if (typeof options.format === 'undefined') {
        options.format = formats.default;
    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
        throw new TypeError('Unknown format option provided.');
    }
    var formatter = formats.formatters[options.format];
    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (Array.isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (options.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = options.arrayFormat;
    } else if ('indices' in options) {
        arrayFormat = options.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (sort) {
        objKeys.sort(sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        keys = keys.concat(stringify(
            obj[key],
            key,
            generateArrayPrefix,
            strictNullHandling,
            skipNulls,
            encode ? encoder : null,
            filter,
            sort,
            allowDots,
            serializeDate,
            formatter,
            encodeValuesOnly
        ));
    }

    return keys.join(delimiter);
};

},{"./formats":328,"./utils":332}],332:[function(require,module,exports){
'use strict';

var has = Object.prototype.hasOwnProperty;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

exports.arrayToObject = function (source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

exports.merge = function (target, source, options) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (Array.isArray(target)) {
            target.push(source);
        } else if (typeof target === 'object') {
            if (options.plainObjects || options.allowPrototypes || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (Array.isArray(target) && !Array.isArray(source)) {
        mergeTarget = exports.arrayToObject(target, options);
    }

    if (Array.isArray(target) && Array.isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                if (target[i] && typeof target[i] === 'object') {
                    target[i] = exports.merge(target[i], item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (Object.prototype.hasOwnProperty.call(acc, key)) {
            acc[key] = exports.merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

exports.decode = function (str) {
    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};

exports.encode = function (str) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D || // -
            c === 0x2E || // .
            c === 0x5F || // _
            c === 0x7E || // ~
            (c >= 0x30 && c <= 0x39) || // 0-9
            (c >= 0x41 && c <= 0x5A) || // a-z
            (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)] + hexTable[0x80 | ((c >> 12) & 0x3F)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]; // eslint-disable-line max-len
    }

    return out;
};

exports.compact = function (obj, references) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    var refs = references || [];
    var lookup = refs.indexOf(obj);
    if (lookup !== -1) {
        return refs[lookup];
    }

    refs.push(obj);

    if (Array.isArray(obj)) {
        var compacted = [];

        for (var i = 0; i < obj.length; ++i) {
            if (obj[i] && typeof obj[i] === 'object') {
                compacted.push(exports.compact(obj[i], refs));
            } else if (typeof obj[i] !== 'undefined') {
                compacted.push(obj[i]);
            }
        }

        return compacted;
    }

    var keys = Object.keys(obj);
    keys.forEach(function (key) {
        obj[key] = exports.compact(obj[key], refs);
    });

    return obj;
};

exports.isRegExp = function (obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

exports.isBuffer = function (obj) {
    if (obj === null || typeof obj === 'undefined') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

},{}],333:[function(require,module,exports){

function editTrack (){

    // contentful-management.js v3.x.x
    const contentful = require('contentful-management')

    const client = contentful.createClient({
        accessToken: 'b60f393ec836a43747cb5a238cdc49e379361c7d7a0a96012191fb3745e2532b',
        //  Space: '59mi8sr8zemv',
        resolveLinks: true
    })

    /*

    //  function getLink (client){
    console.log("hej")
    // getting a specific Post
    client.getSpace('59mi8sr8zemv')
       .then((space) => space.getEntries({include: 5, 'content_type': 'datesForShowDo'})).then((entries) => {
        //.then((space) => space.getEntries({include: 5,'sys.id': '4MT7iMgIcwOEI2gcsyWmcE'})).then((entries) => { //5mai
       // .then((space) => space.getEntries({include: 5,'sys.id': '4ZBsibjyqETi1J2agzRLU2'})).then((entries) => {
        // output the author name
        //  for (var i = 0; i < entries.items.length; i++){
        //    console.log(entries.items[i].fields.title)
        //    }


        //finner ett datum
        var eventsInDate = entries.items[0].fields.link; //events
        if(eventsInDate != null || eventsInDate == true){
            console.log('All events in this date', eventsInDate);//[0]);

            //loop through events in one date
            for(var i = 0; i < eventsInDate.length; i++){
                var oneEvent = eventsInDate[i];
                console.log(eventsInDate[i]);
            }//end for
            console.log("end", JSON.stringify(oneEvent));
        }//end if
    })//end get entries

    */




    //Html-objekter (riktiga)

    //   var JSeditPrevDateOne;
    //    var JSeditPrevDateTwo;
    //  var JSeditThisDate;
    //  var JSeditNextDateOne;
    //    var JSeditNextDateTwo;

    var JSeditTitle;
    var JSeditHosts;
    var JSeditPrereq;
    //    var JSeditStartOne; //tidsformatet 2017-05-05T13:00
    //  var JSeditStartTwo;
    //    var JSeditStartthree;
    //  var JSeditHourOne;
    //  var JSeditHourTwo:
    //var JSeditHourthree;
    var JSeditNrOfPart;
    var JSeditExpect;
    var JSeditJoin;
    //    var JSeditImage;
    //    var JSeditStockOne;
    //    var JSeditStockTwo;
    //    var JSeditStockThree;
    var JSeditElse;
    // var JSeditStatus;


    var init = function (){



        JSeditTitle = document.getElementById("JSeditTitle");
        JSeditHosts = document.getElementById("JSeditHosts");
        JSeditPrereq = document.getElementById("JSeditPrereq");
        //  JSeditStartOne = document.getElementById("JSeditStartOne");
        //    JSeditStartTwo = document.getElementById("JSeditStartTwo");
        //      JSeditStartthree = document.getElementById("JSeditStartthree");
        //        JSeditHourOne = document.getElementById("JSeditHourOne");
        //      JSeditHourthree = document.getElementById("JSeditHourthree");
        JSeditNrOfPart = document.getElementById("JSeditNrOfPart");
        JSeditExpect = document.getElementById("JSeditExpect");
        JSeditJoin = document.getElementById("JSeditJoin");
        //      JSeditImage = document.getElementById("JSeditImage");
        //        JSeditStockOne = document.getElementById("JSeditStockOne");
        //      JSeditStockTwo = document.getElementById("JSeditStockTwo");
        //    JSeditStockThree = document.getElementById("JSeditStockThree");
        JSeditElse = document.getElementById("JSeditElse");
        //  JSeditStatus = document.getElementById("JSeditStatus");
        // JSeditTitle = document.getElementById("JSeditTitle");


        editEvent();


    }(); /*--end init--*/


    //the function that creates a new event, and post it to contentful
    function editEvent (){

        // This API call will request a space with the specified ID
        client.getSpace('59mi8sr8zemv')
            .then((space) => {



            //  Now that we have a space, we can get entries from that space
            space.getEntry('6p5G9RnGdUOmQe8QWs4mYM') //Defining-tone-of-vice
            //   space.getEntries('datesForShowDo')
            //     .then((entries) => {
            //console.log(entry.items[4])
            //    })//end get entries




            //This function is finding the correct contenttype in contentful and add new data to that space

                .then((entry) => {

                console.log(entry.fields.time)

                //    function cutString(JShost){
                //    var left = '{"en-US":"'
                //    s.substring(len(left), len(s)-2-len(left))
                    //  theString.substring(2);
            //    }


            //    function newValue (){

                    //document.getElementById('pandaEdit').setAttribute('value', JSON.stringify(entry.fields.title));
                    document.getElementById('JSeditTitle').setAttribute('value', toLocaleString(entry.fields.title).substr(10));

                    document.getElementById('JSeditHosts').setAttribute('value', JSON.stringify(entry.fields.host).substr(10));
                    document.getElementById('JSeditPrereq').setAttribute('value', JSON.stringify(entry.fields.prerequisites).substr(10));
                    //  document.getElementById('JSeditStartOne').setAttribute('value', JSON.stringify(entry.fields.time))
                    //document.getElementById('JSeditStartTwo').setAttribute('value', JSON.stringify(entry.fields.time))
                    //document.getElementById('JSeditStartthree').setAttribute('value', JSON.stringify(entry.fields.time))
                    //   document.getElementById('JSeditHourOne').setAttribute('value', JSON.stringify(entry.fields.size))
                    //document.getElementById('JSeditHourTwo').setAttribute('value', JSON.stringify(entry.fields.size))
                    //document.getElementById('JSeditHourthree').setAttribute('value', JSON.stringify(entry.fields.size))
                    document.getElementById('JSeditNrOfPart').setAttribute('value', JSON.stringify(entry.fields.numberOfParticipants).substr(10));
                    document.getElementById('JSeditExpect').setAttribute('value', JSON.stringify(entry.fields.whatToExpect).substr(10));
                    document.getElementById('JSeditJoin').setAttribute('value', JSON.stringify(entry.fields.whoShouldJoin).substr(10));
                    document.getElementById('JSeditElse').setAttribute('value', JSON.stringify(entry.fields.anythingElse).substr(10));
                    //document.getElementById('JSeditStatus').setAttribute('value', JSON.stringify(entry.fields.JSeditStatus));



                })//end entry



        })//end getSpace

    }//end EditEvent
    //getLink();

}//end EditTrack




exports.editTrack = editTrack

},{"contentful-management":9}],334:[function(require,module,exports){
var edit = require('./editTrack.js')
edit.editTrack();

},{"./editTrack.js":333}]},{},[334]);
