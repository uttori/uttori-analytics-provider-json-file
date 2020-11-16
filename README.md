[![view on npm](https://img.shields.io/npm/v/@uttori/plugin-analytics-json-file.svg)](https://www.npmjs.org/package/@uttori/plugin-analytics-json-file)
[![npm module downloads](https://img.shields.io/npm/dt/@uttori/plugin-analytics-json-file.svg)](https://www.npmjs.org/package/@uttori/plugin-analytics-json-file)
[![Build Status](https://travis-ci.org/uttori/uttori-plugin-analytics-json-file.svg?branch=master)](https://travis-ci.org/uttori/uttori-plugin-analytics-json-file)
[![Dependency Status](https://david-dm.org/uttori/uttori-plugin-analytics-json-file.svg)](https://david-dm.org/uttori/uttori-plugin-analytics-json-file)
[![Coverage Status](https://coveralls.io/repos/uttori/uttori-plugin-analytics-json-file/badge.svg?branch=master)](https://coveralls.io/r/uttori/uttori-plugin-analytics-json-file?branch=master)

# Uttori Analytics Provider - JSON File

Uttori analytics provider using JSON files on disk.

## Install

```bash
npm install --save @uttori/plugin-analytics-json-file
```

## Config

```js
{
  // Registration Events
  events: {
    getCount: ['document-view-count'],
    getPopularDocuments: ['popular-documents'],
    updateDocument: ['document-save', 'document-delete'],
    validateConfig: ['validate-config'],
  },

  // Directory files will be uploaded to.
  directory: '',

  // Name of the JSON file.
  name: 'visits',

  // File extension to use for the JSON file.
  extension: 'json',
}
```

* * *

## API Reference

<a name="AnalyticsPlugin"></a>

## AnalyticsPlugin
Page view analytics for Uttori documents using JSON files stored on the local file system.

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | The configuration object. |


* [AnalyticsPlugin](#AnalyticsPlugin)
    * [.configKey](#AnalyticsPlugin.configKey) ⇒ <code>string</code>
    * [.defaultConfig()](#AnalyticsPlugin.defaultConfig) ⇒ <code>object</code>
    * [.validateConfig(config, _context)](#AnalyticsPlugin.validateConfig)
    * [.register(context)](#AnalyticsPlugin.register)
    * [.updateDocument(analytics)](#AnalyticsPlugin.updateDocument) ⇒ <code>object</code>
    * [.getCount(analytics)](#AnalyticsPlugin.getCount) ⇒ <code>object</code>
    * [.getPopularDocuments(analytics)](#AnalyticsPlugin.getPopularDocuments) ⇒ <code>object</code>

<a name="AnalyticsPlugin.configKey"></a>

### AnalyticsPlugin.configKey ⇒ <code>string</code>
The configuration key for plugin to look for in the provided configuration.

**Kind**: static property of [<code>AnalyticsPlugin</code>](#AnalyticsPlugin)  
**Returns**: <code>string</code> - The configuration key.  
**Example** *(AnalyticsPlugin.configKey)*  
```js
const config = { ...AnalyticsPlugin.defaultConfig(), ...context.config[AnalyticsPlugin.configKey] };
```
<a name="AnalyticsPlugin.defaultConfig"></a>

### AnalyticsPlugin.defaultConfig() ⇒ <code>object</code>
The default configuration.

**Kind**: static method of [<code>AnalyticsPlugin</code>](#AnalyticsPlugin)  
**Returns**: <code>object</code> - The configuration.  
**Example** *(AnalyticsPlugin.defaultConfig())*  
```js
const config = { ...AnalyticsPlugin.defaultConfig(), ...context.config[AnalyticsPlugin.configKey] };
```
<a name="AnalyticsPlugin.validateConfig"></a>

### AnalyticsPlugin.validateConfig(config, _context)
Validates the provided configuration for required entries.

**Kind**: static method of [<code>AnalyticsPlugin</code>](#AnalyticsPlugin)  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | A configuration object. |
| config.configKey | <code>object</code> | A configuration object specifically for this plugin. |
| config.configKey.urls | <code>Array.&lt;object&gt;</code> | A collection of Uttori documents. |
| config.configKey.url_filters | <code>Array.&lt;RegExp&gt;</code> | A collection of Regular Expression URL filters. |
| config.configKey.base_url | <code>string</code> | The base URL (ie https://domain.tld) for all documents. |
| config.configKey.directory | <code>string</code> | The path to the location you want the sitemap file to be writtent to. |
| _context | <code>object</code> | A Uttori-like context (unused). |

**Example** *(AnalyticsPlugin.validateConfig(config, _context))*  
```js
AnalyticsPlugin.validateConfig({ ... });
```
<a name="AnalyticsPlugin.register"></a>

### AnalyticsPlugin.register(context)
Register the plugin with a provided set of events on a provided Hook system.

**Kind**: static method of [<code>AnalyticsPlugin</code>](#AnalyticsPlugin)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | A Uttori-like context. |
| context.hooks | <code>object</code> | An event system / hook system to use. |
| context.hooks.on | <code>function</code> | An event registration function. |
| context.config | <code>object</code> | A provided configuration to use. |
| context.config.events | <code>object</code> | An object whose keys correspong to methods, and contents are events to listen for. |

**Example** *(AnalyticsPlugin.register(context))*  
```js
const context = {
  hooks: {
    on: (event, callback) => { ... },
  },
  config: {
    [AnalyticsPlugin.configKey]: {
      ...,
      events: {
        updateDocument: ['document-save', 'document-delete'],
        validateConfig: ['validate-config'],
      },
    },
  },
};
AnalyticsPlugin.register(context);
```
<a name="AnalyticsPlugin.updateDocument"></a>

### AnalyticsPlugin.updateDocument(analytics) ⇒ <code>object</code>
Wrapper function for calling update.

**Kind**: static method of [<code>AnalyticsPlugin</code>](#AnalyticsPlugin)  
**Returns**: <code>object</code> - The provided document.  

| Param | Type | Description |
| --- | --- | --- |
| analytics | <code>object</code> | An AnalyticsProvider instance. |

**Example** *(AnalyticsPlugin.updateDocument(analytics))*  
```js
const context = {
  config: {
    [AnalyticsPlugin.configKey]: {
      ...,
    },
  },
};
AnalyticsPlugin.updateDocument(document, null);
```
<a name="AnalyticsPlugin.getCount"></a>

### AnalyticsPlugin.getCount(analytics) ⇒ <code>object</code>
Wrapper function for calling update.

**Kind**: static method of [<code>AnalyticsPlugin</code>](#AnalyticsPlugin)  
**Returns**: <code>object</code> - The provided document.  

| Param | Type | Description |
| --- | --- | --- |
| analytics | <code>object</code> | An AnalyticsProvider instance. |

**Example** *(AnalyticsPlugin.getCount(analytics, slug))*  
```js
const context = {
  config: {
    [AnalyticsPlugin.configKey]: {
      ...,
    },
  },
};
AnalyticsPlugin.getCount(analytics, slug);
```
<a name="AnalyticsPlugin.getPopularDocuments"></a>

### AnalyticsPlugin.getPopularDocuments(analytics) ⇒ <code>object</code>
Wrapper function for calling update.

**Kind**: static method of [<code>AnalyticsPlugin</code>](#AnalyticsPlugin)  
**Returns**: <code>object</code> - The provided document.  

| Param | Type | Description |
| --- | --- | --- |
| analytics | <code>object</code> | An AnalyticsProvider instance. |

**Example** *(AnalyticsPlugin.updateDocument(analytics))*  
```js
const context = {
  config: {
    [AnalyticsPlugin.configKey]: {
      ...,
    },
  },
};
AnalyticsPlugin.getPopularDocuments(analytics);
```

* * *

## Tests

To run the test suite, first install the dependencies, then run `npm test`:

```bash
npm install
npm test
DEBUG=Uttori* npm test
```

## Contributors

* [Matthew Callis](https://github.com/MatthewCallis)

## License

* [MIT](LICENSE)
