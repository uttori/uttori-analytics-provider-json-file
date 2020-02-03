[![view on npm](http://img.shields.io/npm/v/uttori-plugin-analytics-json-file.svg)](https://www.npmjs.org/package/uttori-plugin-analytics-json-file)
[![npm module downloads](http://img.shields.io/npm/dt/uttori-plugin-analytics-json-file.svg)](https://www.npmjs.org/package/uttori-plugin-analytics-json-file)
[![Build Status](https://travis-ci.org/uttori/uttori-plugin-analytics-json-file.svg?branch=master)](https://travis-ci.org/uttori/uttori-plugin-analytics-json-file)
[![Dependency Status](https://david-dm.org/uttori/uttori-plugin-analytics-json-file.svg)](https://david-dm.org/uttori/uttori-plugin-analytics-json-file)
[![Coverage Status](https://coveralls.io/repos/uttori/uttori-plugin-analytics-json-file/badge.svg?branch=master)](https://coveralls.io/r/uttori/uttori-plugin-analytics-json-file?branch=master)

# Uttori Analytics Provider - JSON File

Uttori analytics provider using JSON files on disk.

## Install

```bash
npm install --save uttori-plugin-analytics-json-file
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
| config | <code>Object</code> | The configuration object. |


* [AnalyticsPlugin](#AnalyticsPlugin)
    * [.configKey](#AnalyticsPlugin.configKey) ⇒ <code>String</code>
    * [.defaultConfig()](#AnalyticsPlugin.defaultConfig) ⇒ <code>Object</code>
    * [.validateConfig(config, _context)](#AnalyticsPlugin.validateConfig)
    * [.register(context)](#AnalyticsPlugin.register)
    * [.updateDocument(analytics)](#AnalyticsPlugin.updateDocument) ⇒ <code>Object</code>
    * [.getCount(analytics)](#AnalyticsPlugin.getCount) ⇒ <code>Object</code>
    * [.getPopularDocuments(analytics)](#AnalyticsPlugin.getPopularDocuments) ⇒ <code>Object</code>

<a name="AnalyticsPlugin.configKey"></a>

### AnalyticsPlugin.configKey ⇒ <code>String</code>
The configuration key for plugin to look for in the provided configuration.

**Kind**: static property of [<code>AnalyticsPlugin</code>](#AnalyticsPlugin)  
**Returns**: <code>String</code> - The configuration key.  
**Example** *(AnalyticsPlugin.configKey)*  
```js
const config = { ...AnalyticsPlugin.defaultConfig(), ...context.config[AnalyticsPlugin.configKey] };
```
<a name="AnalyticsPlugin.defaultConfig"></a>

### AnalyticsPlugin.defaultConfig() ⇒ <code>Object</code>
The default configuration.

**Kind**: static method of [<code>AnalyticsPlugin</code>](#AnalyticsPlugin)  
**Returns**: <code>Object</code> - The configuration.  
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
| config | <code>Object</code> | A configuration object. |
| config[AnalyticsPlugin.configKey | <code>Object</code> | A configuration object specifically for this plugin. |
| config[AnalyticsPlugin.configKey].urls | <code>Array.&lt;Object&gt;</code> | A collection of Uttori documents. |
| config[AnalyticsPlugin.configKey].url_filters | <code>Array.&lt;RegExp&gt;</code> | A collection of Regular Expression URL filters. |
| config[AnalyticsPlugin.configKey].base_url | <code>String</code> | The base URL (ie https://domain.tld) for all documents. |
| config[AnalyticsPlugin.configKey].directory | <code>String</code> | The path to the location you want the sitemap file to be writtent to. |
| _context | <code>Object</code> | A Uttori-like context (unused). |

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
| context | <code>Object</code> | A Uttori-like context. |
| context.hooks | <code>Object</code> | An event system / hook system to use. |
| context.hooks.on | <code>function</code> | An event registration function. |
| context.config | <code>Object</code> | A provided configuration to use. |
| context.config.events | <code>Object</code> | An object whose keys correspong to methods, and contents are events to listen for. |

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

### AnalyticsPlugin.updateDocument(analytics) ⇒ <code>Object</code>
Wrapper function for calling update.

**Kind**: static method of [<code>AnalyticsPlugin</code>](#AnalyticsPlugin)  
**Returns**: <code>Object</code> - The provided document.  

| Param | Type | Description |
| --- | --- | --- |
| analytics | <code>Object</code> | An AnalyticsProvider instance. |

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

### AnalyticsPlugin.getCount(analytics) ⇒ <code>Object</code>
Wrapper function for calling update.

**Kind**: static method of [<code>AnalyticsPlugin</code>](#AnalyticsPlugin)  
**Returns**: <code>Object</code> - The provided document.  

| Param | Type | Description |
| --- | --- | --- |
| analytics | <code>Object</code> | An AnalyticsProvider instance. |

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

### AnalyticsPlugin.getPopularDocuments(analytics) ⇒ <code>Object</code>
Wrapper function for calling update.

**Kind**: static method of [<code>AnalyticsPlugin</code>](#AnalyticsPlugin)  
**Returns**: <code>Object</code> - The provided document.  

| Param | Type | Description |
| --- | --- | --- |
| analytics | <code>Object</code> | An AnalyticsProvider instance. |

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
