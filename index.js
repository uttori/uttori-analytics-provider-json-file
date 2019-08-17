const debug = require('debug')('Uttori.AnalyticsProvider.JSON');
const R = require('ramda');
const { FileUtility } = require('uttori-utilities');

/**
  * Page view analytics for Uttori documents using JSON files stored on the local file system.
  * @property {Object} config - The configuration object.
  * @example <caption>Init AnalyticsProvider</caption>
  * const analyticsProvider = new AnalyticsProvider({ directory: 'data' });
  * @class
  */
class AnalyticsProvider {
  /**
  * Creates an instance of AnalyticsProvider.
  * @param {Object} config - A configuration object.
  * @param {string} config.directory - The directory to store the JSON file containing the page view analytics.
  * @param {string} [config.name] - The file name of the file containing the page view analytics.
  * @param {string} [config.param] - The file extension of the file containing the page view analytics.
  * @constructor
  */
  constructor(config) {
    if (!config) {
      debug('No config provided.');
      throw new Error('No config provided.');
    }
    if (!config.directory) {
      debug('No directory provided.');
      throw new Error('No directory provided.');
    }

    this.config = {
      name: 'visits',
      extension: 'json',
      ...config,
    };

    this.pageVisits = FileUtility.readJSON(this.config.directory, this.config.name, this.config.extension);
  }

  /**
   * Updates the view count for a given document slug.
   * @param {string} slug - The slug ofthe document to be updated.
   * @example
   * analyticsProvider.update('faq');
   * @memberof AnalyticsProvider
   */
  update(slug) {
    if (!slug) {
      debug('Missing slug.');
      return;
    }

    if (this.pageVisits[slug]) {
      this.pageVisits[slug]++;
    } else {
      this.pageVisits[slug] = 1;
    }

    FileUtility.writeFile(this.config.directory, this.config.name, this.config.extension, JSON.stringify(this.pageVisits));
  }

  /**
   * Returns the view count for a given document slug.
   * @param {string} slug - The slug of the document to be looked up.
   * @returns {Number} View count for the given slug.
   * @example
   * analyticsProvider.get('faq');
   * ➜ 10
   * @memberof AnalyticsProvider
   */
  get(slug) {
    if (!slug || !this.pageVisits[slug]) {
      return 0;
    }
    return this.pageVisits[slug];
  }

  /**
   * Returns the most popular documents.
   * @param {limit} limit - The number of documents to return.
   * @returns {Array} View count for the given slug.
   * @example
   * analyticsProvider.getPopularDocuments(10);
   * ➜ [ { 'faq': 10 }}
   * @memberof AnalyticsProvider
   */
  async getPopularDocuments(limit) {
    debug('getPopularDocuments:', limit);
    if (!limit || !Number.isInteger(limit)) {
      debug('Missing or invalid limit.', limit);
      throw new Error('Missing or invalid limit.');
    }

    return R.map((slug) => ({ slug }),
      R.pluck(0,
        R.take(limit,
          R.reverse(
            R.sortBy(R.prop(1))(R.toPairs(this.pageVisits)),
          )
        )
      )
    );
  }
}

module.exports = AnalyticsProvider;
