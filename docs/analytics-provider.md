<a name="AnalyticsProvider"></a>

## AnalyticsProvider
Page view analytics for Uttori documents using JSON files stored on the local file system.

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| config | <code>Object</code> | The configuration object. |


* [AnalyticsProvider](#AnalyticsProvider)
    * [new AnalyticsProvider(config)](#new_AnalyticsProvider_new)
    * [.update(slug, [value])](#AnalyticsProvider+update)
    * [.get(slug)](#AnalyticsProvider+get) ⇒ <code>Number</code>
    * [.getPopularDocuments(limit)](#AnalyticsProvider+getPopularDocuments) ⇒ <code>Array</code>

<a name="new_AnalyticsProvider_new"></a>

### new AnalyticsProvider(config)
Creates an instance of AnalyticsProvider.


| Param | Type | Description |
| --- | --- | --- |
| config | <code>Object</code> | A configuration object. |
| config.directory | <code>string</code> | The directory to store the JSON file containing the page view analytics. |
| [config.name] | <code>string</code> | The file name of the file containing the page view analytics. |
| [config.extension] | <code>string</code> | The file extension of the file containing the page view analytics. |

**Example** *(Init AnalyticsProvider)*  
```js
const analyticsProvider = new AnalyticsProvider({ directory: 'data' });
```
<a name="AnalyticsProvider+update"></a>

### analyticsProvider.update(slug, [value])
Updates the view count for a given document slug.

**Kind**: instance method of [<code>AnalyticsProvider</code>](#AnalyticsProvider)  

| Param | Type | Description |
| --- | --- | --- |
| slug | <code>string</code> | The slug of the document to be updated. |
| [value] | <code>string</code> | An optional value to set the count to exactly. |

**Example**  
```js
analyticsProvider.update('faq');
```
<a name="AnalyticsProvider+get"></a>

### analyticsProvider.get(slug) ⇒ <code>Number</code>
Returns the view count for a given document slug.

**Kind**: instance method of [<code>AnalyticsProvider</code>](#AnalyticsProvider)  
**Returns**: <code>Number</code> - View count for the given slug.  

| Param | Type | Description |
| --- | --- | --- |
| slug | <code>string</code> | The slug of the document to be looked up. |

**Example**  
```js
analyticsProvider.get('faq');
➜ 10
```
<a name="AnalyticsProvider+getPopularDocuments"></a>

### analyticsProvider.getPopularDocuments(limit) ⇒ <code>Array</code>
Returns the most popular documents.

**Kind**: instance method of [<code>AnalyticsProvider</code>](#AnalyticsProvider)  
**Returns**: <code>Array</code> - View count for the given slug.  

| Param | Type | Description |
| --- | --- | --- |
| limit | <code>limit</code> | The number of documents to return. |

**Example**  
```js
analyticsProvider.getPopularDocuments(10);
➜ [ { 'faq': 10 } ]
```
