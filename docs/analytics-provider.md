<a name="AnalyticsProvider"></a>

## AnalyticsProvider
Page view analytics for Uttori documents using JSON files stored on the local file system.

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | The configuration object. |


* [AnalyticsProvider](#AnalyticsProvider)
    * [new AnalyticsProvider(config)](#new_AnalyticsProvider_new)
    * [.update(slug, [value])](#AnalyticsProvider+update) ⇒ <code>Promise.&lt;number&gt;</code>
    * [.get(slug)](#AnalyticsProvider+get) ⇒ <code>number</code>
    * [.getPopularDocuments(limit)](#AnalyticsProvider+getPopularDocuments) ⇒ <code>Promise.&lt;Array&gt;</code>

<a name="new_AnalyticsProvider_new"></a>

### new AnalyticsProvider(config)
Creates an instance of AnalyticsProvider.


| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | A configuration object. |
| config.directory | <code>string</code> | The directory to store the JSON file containing the page view analytics. |
| [config.name] | <code>string</code> | The file name of the file containing the page view analytics. |
| [config.extension] | <code>string</code> | The file extension of the file containing the page view analytics. |

**Example** *(Init AnalyticsProvider)*  
```js
const analyticsProvider = new AnalyticsProvider({ directory: 'data' });
```
<a name="AnalyticsProvider+update"></a>

### analyticsProvider.update(slug, [value]) ⇒ <code>Promise.&lt;number&gt;</code>
Updates the view count for a given document slug.

**Kind**: instance method of [<code>AnalyticsProvider</code>](#AnalyticsProvider)  
**Returns**: <code>Promise.&lt;number&gt;</code> - The number of hits for a given slug after updating.  

| Param | Type | Description |
| --- | --- | --- |
| slug | <code>string</code> | The slug of the document to be updated. |
| [value] | <code>string</code> | An optional value to set the count to exactly. |

<a name="AnalyticsProvider+get"></a>

### analyticsProvider.get(slug) ⇒ <code>number</code>
Returns the view count for a given document slug.

**Kind**: instance method of [<code>AnalyticsProvider</code>](#AnalyticsProvider)  
**Returns**: <code>number</code> - View count for the given slug.  

| Param | Type | Description |
| --- | --- | --- |
| slug | <code>string</code> | The slug of the document to be looked up. |

**Example**  
```js
analyticsProvider.get('faq');
➜ 10
```
<a name="AnalyticsProvider+getPopularDocuments"></a>

### analyticsProvider.getPopularDocuments(limit) ⇒ <code>Promise.&lt;Array&gt;</code>
Returns the most popular documents.

**Kind**: instance method of [<code>AnalyticsProvider</code>](#AnalyticsProvider)  
**Returns**: <code>Promise.&lt;Array&gt;</code> - View count for the given slug.  

| Param | Type | Description |
| --- | --- | --- |
| limit | <code>number</code> | The number of documents to return. |

**Example**  
```js
analyticsProvider.getPopularDocuments(10);
➜ [ { 'faq': 10 } ]
```
