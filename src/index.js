const debug = require('debug')('Uttori.Plugin.AnalyticsPlugin');
const AnalyticsProvider = require('./analytics-provider');

/**
 * Page view analytics for Uttori documents using JSON files stored on the local file system.
 *
 * @property {object} config - The configuration object.
 * @example <caption>Init AnalyticsProvider</caption>
 * const analyticsProvider = new AnalyticsProvider({ directory: 'data' });
 * @class
 */
class AnalyticsPlugin {
  /**
   * The configuration key for plugin to look for in the provided configuration.
   *
   * @type {string}
   * @returns {string} The configuration key.
   * @example <caption>AnalyticsPlugin.configKey</caption>
   * const config = { ...AnalyticsPlugin.defaultConfig(), ...context.config[AnalyticsPlugin.configKey] };
   * @static
   */
  static get configKey() {
    return 'uttori-plugin-analytics-json-file';
  }

  /**
   * The default configuration.
   *
   * @returns {object} The configuration.
   * @example <caption>AnalyticsPlugin.defaultConfig()</caption>
   * const config = { ...AnalyticsPlugin.defaultConfig(), ...context.config[AnalyticsPlugin.configKey] };
   * @static
   */
  static defaultConfig() {
    return {
      name: 'visits',
      extension: 'json',
    };
  }

  /**
   * Validates the provided configuration for required entries.
   *
   * @param {object} config - A configuration object.
   * @param {object} config.configKey - A configuration object specifically for this plugin.
   * @param {object[]} config.configKey.urls - A collection of Uttori documents.
   * @param {RegExp[]} config.configKey.url_filters - A collection of Regular Expression URL filters.
   * @param {string} config.configKey.base_url - The base URL (ie https://domain.tld) for all documents.
   * @param {string} config.configKey.directory - The path to the location you want the sitemap file to be writtent to.
   * @param {object} _context - A Uttori-like context (unused).
   * @example <caption>AnalyticsPlugin.validateConfig(config, _context)</caption>
   * AnalyticsPlugin.validateConfig({ ... });
   * @static
   */
  static validateConfig(config, _context) {
    debug('Validating config...');
    if (!config[AnalyticsPlugin.configKey]) {
      debug(`Config Error: '${AnalyticsPlugin.configKey}' configuration key is missing.`);
      throw new Error(`Config Error: '${AnalyticsPlugin.configKey}' configuration key is missing.`);
    }
    if (!config[AnalyticsPlugin.configKey].directory || typeof config[AnalyticsPlugin.configKey].directory !== 'string') {
      debug('Config Error: `directory` is required should be the path to the location you want the JSON file to be writtent to.');
      throw new Error('directory is required should be the path to the location you want the JSON file to be writtent to.');
    }
    debug('Validated config.');
  }

  /**
   * Register the plugin with a provided set of events on a provided Hook system.
   *
   * @param {object} context - A Uttori-like context.
   * @param {object} context.hooks - An event system / hook system to use.
   * @param {Function} context.hooks.on - An event registration function.
   * @param {object} context.config - A provided configuration to use.
   * @param {object} context.config.events - An object whose keys correspong to methods, and contents are events to listen for.
   * @example <caption>AnalyticsPlugin.register(context)</caption>
   * const context = {
   *   hooks: {
   *     on: (event, callback) => { ... },
   *   },
   *   config: {
   *     [AnalyticsPlugin.configKey]: {
   *       ...,
   *       events: {
   *         updateDocument: ['document-save', 'document-delete'],
   *         validateConfig: ['validate-config'],
   *       },
   *     },
   *   },
   * };
   * AnalyticsPlugin.register(context);
   * @static
   */
  static register(context) {
    if (!context || !context.hooks || typeof context.hooks.on !== 'function') {
      debug("Missing event dispatcher in 'context.hooks.on(event, callback)' format.");
      throw new Error("Missing event dispatcher in 'context.hooks.on(event, callback)' format.");
    }
    const config = { ...AnalyticsPlugin.defaultConfig(), ...context.config[AnalyticsPlugin.configKey] };
    if (!config.events) {
      debug("Missing events to listen to for in 'config.events'.");
      throw new Error("Missing events to listen to for in 'config.events'.");
    }
    const analytics = new AnalyticsProvider(config);
    Object.keys(config.events).forEach((method) => {
      if (method === 'updateDocument' || method === 'getPopularDocuments' || method === 'getCount') {
        config.events[method].forEach((event) => {
          context.hooks.on(event, AnalyticsPlugin[method](analytics));
        });
      }
    });
  }

  /**
   * Wrapper function for calling update.
   *
   * @param {object} analytics - An AnalyticsProvider instance.
   * @returns {object} The provided document.
   * @example <caption>AnalyticsPlugin.updateDocument(analytics)</caption>
   * const context = {
   *   config: {
   *     [AnalyticsPlugin.configKey]: {
   *       ...,
   *     },
   *   },
   * };
   * AnalyticsPlugin.updateDocument(document, null);
   * @static
   */
  static updateDocument(analytics) {
    return async (document, _context) => {
      debug('updateDocument');
      if (document && document.slug) {
        await analytics.update(document.slug);
      }
      return document;
    };
  }

  /**
   * Wrapper function for calling update.
   *
   * @param {object} analytics - An AnalyticsProvider instance.
   * @returns {object} The provided document.
   * @example <caption>AnalyticsPlugin.getCount(analytics, slug)</caption>
   * const context = {
   *   config: {
   *     [AnalyticsPlugin.configKey]: {
   *       ...,
   *     },
   *   },
   * };
   * AnalyticsPlugin.getCount(analytics, slug);
   * @static
   */
  static getCount(analytics) {
    return async (document, _context) => {
      debug('getCount');
      let count = 0;
      if (document && document.slug) {
        count = await analytics.get(document.slug);
      }
      return count;
    };
  }

  /**
   * Wrapper function for calling update.
   *
   * @param {object} analytics - An AnalyticsProvider instance.
   * @returns {object} The provided document.
   * @example <caption>AnalyticsPlugin.updateDocument(analytics)</caption>
   * const context = {
   *   config: {
   *     [AnalyticsPlugin.configKey]: {
   *       ...,
   *     },
   *   },
   * };
   * AnalyticsPlugin.getPopularDocuments(analytics);
   * @static
   */
  static getPopularDocuments(analytics) {
    return async (config, _context) => {
      debug('getPopularDocuments');
      let documents = [];
      const limit = (config && config.limit) || 10;
      documents = await analytics.getPopularDocuments(limit);
      return documents;
    };
  }
}

module.exports = AnalyticsPlugin;
