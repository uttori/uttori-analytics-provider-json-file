/**
 * Creates an instance of AnalyticsProvider.
 * @example
 * <caption>Init AnalyticsProvider</caption>
 * const analyticsProvider = new AnalyticsProvider({ directory: 'data' });
 * @property config - The configuration object.
 * @param config - A configuration object.
 * @param config.directory - The directory to store the JSON file containing the page view analytics.
 * @param [config.name] - The file name of the file containing the page view analytics.
 * @param [config.extension] - The file extension of the file containing the page view analytics.
 */
declare class AnalyticsProvider {
    constructor(config: {
        directory: string;
        name?: string;
        extension?: string;
    });
    /**
     * Updates the view count for a given document slug.
     * @param slug - The slug of the document to be updated.
     * @param [value] - An optional value to set the count to exactly.
     * @returns The number of hits for a given slug after updating.
     */
    update(slug: string, value?: string): Promise<number>;
    /**
     * Returns the view count for a given document slug.
     * @example
     * analyticsProvider.get('faq');
     * ➜ 10
     * @param slug - The slug of the document to be looked up.
     * @returns View count for the given slug.
     */
    get(slug: string): number;
    /**
     * Returns the most popular documents.
     * @example
     * analyticsProvider.getPopularDocuments(10);
     * ➜ [ { 'faq': 10 } ]
     * @param limit - The number of documents to return.
     * @returns View count for the given slug.
     */
    getPopularDocuments(limit: number): Promise<any[]>;
    /**
     * The configuration object.
    */
    config: any;
}

/**
 * Page view analytics for Uttori documents using JSON files stored on the local file system.
 * @example
 * <caption>Init AnalyticsProvider</caption>
 * const analyticsProvider = new AnalyticsProvider({ directory: 'data' });
 * @property config - The configuration object.
 */
declare class AnalyticsPlugin {
    /**
     * The configuration key for plugin to look for in the provided configuration.
     * @example
     * <caption>AnalyticsPlugin.configKey</caption>
     * const config = { ...AnalyticsPlugin.defaultConfig(), ...context.config[AnalyticsPlugin.configKey] };
     */
    static configKey: string;
    /**
     * The default configuration.
     * @example
     * <caption>AnalyticsPlugin.defaultConfig()</caption>
     * const config = { ...AnalyticsPlugin.defaultConfig(), ...context.config[AnalyticsPlugin.configKey] };
     * @returns The configuration.
     */
    static defaultConfig(): any;
    /**
     * Validates the provided configuration for required entries.
     * @example
     * <caption>AnalyticsPlugin.validateConfig(config, _context)</caption>
     * AnalyticsPlugin.validateConfig({ ... });
     * @param config - A configuration object.
     * @param config.configKey - A configuration object specifically for this plugin.
     * @param config.configKey.urls - A collection of Uttori documents.
     * @param config.configKey.url_filters - A collection of Regular Expression URL filters.
     * @param config.configKey.base_url - The base URL (ie https://domain.tld) for all documents.
     * @param config.configKey.directory - The path to the location you want the sitemap file to be writtent to.
     * @param _context - A Uttori-like context (unused).
     */
    static validateConfig(config: {
        configKey: {
            urls: object[];
            url_filters: RegExp[];
            base_url: string;
            directory: string;
        };
    }, _context: any): void;
    /**
     * Register the plugin with a provided set of events on a provided Hook system.
     * @example
     * <caption>AnalyticsPlugin.register(context)</caption>
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
     * @param context - A Uttori-like context.
     * @param context.hooks - An event system / hook system to use.
     * @param context.hooks.on - An event registration function.
     * @param context.config - A provided configuration to use.
     * @param context.config.events - An object whose keys correspong to methods, and contents are events to listen for.
     */
    static register(context: {
        hooks: {
            on: (...params: any[]) => any;
        };
        config: {
            events: any;
        };
    }): void;
    /**
     * Wrapper function for calling update.
     * @example
     * <caption>AnalyticsPlugin.updateDocument(analytics)</caption>
     * const context = {
     *   config: {
     *     [AnalyticsPlugin.configKey]: {
     *       ...,
     *     },
     *   },
     * };
     * AnalyticsPlugin.updateDocument(document, null);
     * @param analytics - An AnalyticsProvider instance.
     * @returns The provided document.
     */
    static updateDocument(analytics: any): any;
    /**
     * Wrapper function for calling update.
     * @example
     * <caption>AnalyticsPlugin.getCount(analytics, slug)</caption>
     * const context = {
     *   config: {
     *     [AnalyticsPlugin.configKey]: {
     *       ...,
     *     },
     *   },
     * };
     * AnalyticsPlugin.getCount(analytics, slug);
     * @param analytics - An AnalyticsProvider instance.
     * @returns The provided document.
     */
    static getCount(analytics: any): any;
    /**
     * Wrapper function for calling update.
     * @example
     * <caption>AnalyticsPlugin.updateDocument(analytics)</caption>
     * const context = {
     *   config: {
     *     [AnalyticsPlugin.configKey]: {
     *       ...,
     *     },
     *   },
     * };
     * AnalyticsPlugin.getPopularDocuments(analytics);
     * @param analytics - An AnalyticsProvider instance.
     * @returns The provided document.
     */
    static getPopularDocuments(analytics: any): any;
    /**
     * The configuration object.
    */
    config: any;
}

