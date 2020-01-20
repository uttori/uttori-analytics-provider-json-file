const debug = require('debug')('Uttori.Plugin.AnalyticsPlugin');
const AnalyticsProvider = require('./analytics-provider');

/**
  * Page view analytics for Uttori documents using JSON files stored on the local file system.
  * @property {Object} config - The configuration object.
  * @example <caption>Init AnalyticsProvider</caption>
  * const analyticsProvider = new AnalyticsProvider({ directory: 'data' });
  * @class
  */
class AnalyticsPlugin {
  /**
   * The configuration key for plugin to look for in the provided configuration.
   * @return {String} The configuration key.
   * @example <caption>AnalyticsPlugin.configKey</caption>
   * const config = { ...AnalyticsPlugin.defaultConfig(), ...context.config[AnalyticsPlugin.configKey] };
   * @static
   */
  static get configKey() {
    return 'uttori-plugin-analytics-json-file';
  }

  /**
   * The default configuration.
   * @return {Object} The configuration.
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
   * @param {Object} config - A configuration object.
   * @param {Object} config[AnalyticsPlugin.configKey] - A configuration object specifically for this plugin.
   * @param {Object[]} config[AnalyticsPlugin.configKey].urls - A collection of Uttori documents.
   * @param {RegExp[]} config[AnalyticsPlugin.configKey].url_filters - A collection of Regular Expression URL filters.
   * @param {String} config[AnalyticsPlugin.configKey].base_url - The base URL (ie https://domain.tld) for all documents.
   * @param {String} config[AnalyticsPlugin.configKey].directory - The path to the location you want the sitemap file to be writtent to.
   * @param {Object} _context - A Uttori-like context (unused).
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
   * @param {Object} context - A Uttori-like context.
   * @param {Object} context.hooks - An event system / hook system to use.
   * @param {Function} context.hooks.on - An event registration function.
   * @param {Object} context.config - A provided configuration to use.
   * @param {Object} context.config.events - An object whose keys correspong to methods, and contents are events to listen for.
   * @example <caption>AnalyticsPlugin.register(context)</caption>
   * const context = {
   *   hooks: {
   *     on: (event, callback) => { ... },
   *   },
   *   config: {
   *     [AnalyticsPlugin.configKey]: {
   *       ...,
   *       events: {
   *         callback: ['document-save', 'document-delete'],
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
      if (method === 'updateDocument') {
        config.events[method].forEach((event) => context.hooks.on(event, AnalyticsPlugin.updateDocument(analytics)));
      } else if (typeof AnalyticsPlugin[method] === 'function') {
        config.events[method].forEach((event) => context.hooks.on(event, AnalyticsPlugin[method]));
      }
    });
  }

  /**
   * Wrapper function for calling update.
   * @param {Object} document - A Uttori document.
   * @param {Object} _context - A Uttori-like context (unused).
   * @return {Object} The provided document.
   * @example <caption>AnalyticsPlugin.callback(_document, context)</caption>
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
}

module.exports = AnalyticsPlugin;
