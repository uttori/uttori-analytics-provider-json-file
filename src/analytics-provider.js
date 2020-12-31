const debug = require('debug')('Uttori.Plugin.AnalyticsProvider');
const R = require('ramda');
const { FileUtility } = require('uttori-utilities');

/**
 * Page view analytics for Uttori documents using JSON files stored on the local file system.
 *
 * @property {object} config - The configuration object.
 * @example <caption>Init AnalyticsProvider</caption>
 * const analyticsProvider = new AnalyticsProvider({ directory: 'data' });
 * @class
 */
class AnalyticsProvider {
  /**
   * Creates an instance of AnalyticsProvider.
   *
   * @param {object} config - A configuration object.
   * @param {string} config.directory - The directory to store the JSON file containing the page view analytics.
   * @param {string} [config.name] - The file name of the file containing the page view analytics.
   * @param {string} [config.extension] - The file extension of the file containing the page view analytics.
   * @class
   */
  constructor(config) {
    debug('constructor');
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

    FileUtility.ensureDirectorySync(this.config.directory);
    this.pageVisits = FileUtility.readJSONSync(this.config.directory, this.config.name, this.config.extension);
  }

  /**
   * Updates the view count for a given document slug.
   *
   * @async
   * @param {string} slug - The slug of the document to be updated.
   * @param {string} [value] - An optional value to set the count to exactly.
   * @returns {Promise<number>} The number of hits for a given slug after updating.
   */
  async update(slug, value) {
    debug('update:', slug, value);
    if (!slug) {
      debug('Missing:', slug, value);
      return 0;
    }

    if (Number.isInteger(this.pageVisits[slug])) {
      debug('Existing');
      this.pageVisits[slug] += 1;
    } else {
      debug('New');
      this.pageVisits[slug] = 1;
    }
    if (Number.isInteger(value)) {
      this.pageVisits[slug] = value;
    }

    await FileUtility.writeFile(this.config.directory, this.config.name, this.config.extension, JSON.stringify(this.pageVisits));

    debug('Updated:', slug, this.pageVisits[slug]);
    return this.pageVisits[slug];
  }

  /**
   * Returns the view count for a given document slug.
   *
   * @param {string} slug - The slug of the document to be looked up.
   * @returns {number} View count for the given slug.
   * @example
   * analyticsProvider.get('faq');
   * ➜ 10
   */
  get(slug) {
    debug('get:', slug);
    if (!slug || !Number.isInteger(this.pageVisits[slug])) {
      debug('Missing:', slug, this.pageVisits[slug]);
      return 0;
    }

    debug('Got:', slug, this.pageVisits[slug]);
    return this.pageVisits[slug];
  }

  /**
   * Returns the most popular documents.
   *
   * @param {number} limit - The number of documents to return.
   * @returns {Promise<Array>} View count for the given slug.
   * @example
   * analyticsProvider.getPopularDocuments(10);
   * ➜ [ { 'faq': 10 } ]
   */
  async getPopularDocuments(limit) {
    debug('getPopularDocuments:', limit);
    if (!limit || !Number.isInteger(limit)) {
      debug('Missing or invalid limit.', limit);
      throw new Error('Missing or invalid limit.');
    }
    const popular = R.map((slug) => ({ slug }),
      R.pluck(0,
        R.take(limit,
          R.reverse(
            R.sortBy(R.prop(1))(R.toPairs(this.pageVisits)),
          ))));

    debug('Found:', popular);
    return R.flatten(popular);
  }
}

module.exports = AnalyticsProvider;
