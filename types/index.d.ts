declare module "analytics-provider" {
    export = AnalyticsProvider;
    class AnalyticsProvider {
        constructor(config: {
            directory: string;
            name: string;
            extension: string;
        });
        config: {
            directory: string;
            name: string;
            extension: string;
        };
        pageVisits: any;
        update(slug: string, value?: string): Promise<number>;
        get(slug: string): number;
        getPopularDocuments(limit: number): Promise<any[]>;
    }
}
declare module "index" {
    export = AnalyticsPlugin;
    class AnalyticsPlugin {
        static get configKey(): string;
        static defaultConfig(): object;
        static validateConfig(config: {
            configKey: {
                urls: object[];
                url_filters: RegExp[];
                base_url: string;
                directory: string;
            };
        }, _context: object): void;
        static register(context: {
            hooks: {
                on: Function;
            };
            config: {
                events: object;
            };
        }): void;
        static updateDocument(analytics: object): object;
        static getCount(analytics: object): object;
        static getPopularDocuments(analytics: object): object;
    }
}
