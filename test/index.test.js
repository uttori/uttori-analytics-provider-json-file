const fs = require('fs-extra');
const test = require('ava');
const { EventDispatcher, FileUtility } = require('uttori-utilities');
const AnalyticsPlugin = require('../src');

test.beforeEach(async () => {
  await fs.remove('test/site');
  await fs.ensureDir('test/site/data', { recursive: true });
  await fs.writeFile('test/site/data/visits.json', '{"test":1,"zero":0,"two":2}');
});

test.afterEach.always(async () => {
  await fs.remove('test/site');
});

test('AnalyticsPlugin.defaultConfig(): can return a default config', (t) => {
  t.notThrows(AnalyticsPlugin.defaultConfig);
});

test('AnalyticsPlugin.validateConfig(config, _context): throws when sitemaps key is missing', (t) => {
  t.throws(() => {
    AnalyticsPlugin.validateConfig({});
  }, { message: 'Config Error: \'uttori-plugin-analytics-json-file\' configuration key is missing.' });
});

test('AnalyticsPlugin.validateConfig(config, _context): throws when directory is missing', (t) => {
  t.throws(() => {
    AnalyticsPlugin.validateConfig({
      [AnalyticsPlugin.configKey]: {},
    });
  }, { message: 'directory is required should be the path to the location you want the JSON file to be writtent to.' });
});

test('AnalyticsPlugin.validateConfig(config, _context): throws when directory is not a string', (t) => {
  t.throws(() => {
    AnalyticsPlugin.validateConfig({
      [AnalyticsPlugin.configKey]: {
        directory: {},
      },
    });
  }, { message: 'directory is required should be the path to the location you want the JSON file to be writtent to.' });
});

test('AnalyticsPlugin.validateConfig(config, _context): can validate', (t) => {
  t.notThrows(() => {
    AnalyticsPlugin.validateConfig({
      [AnalyticsPlugin.configKey]: {
        directory: './',
      },
    });
  });
});

test('AnalyticsPlugin.register(context): errors without event dispatcher', (t) => {
  t.throws(() => {
    AnalyticsPlugin.register({ hooks: {} });
  }, { message: 'Missing event dispatcher in \'context.hooks.on(event, callback)\' format.' });
});

test('AnalyticsPlugin.register(context): errors without events', (t) => {
  t.throws(() => {
    AnalyticsPlugin.register({ hooks: { on: () => {} }, config: { [AnalyticsPlugin.configKey]: { } } });
  }, { message: 'Missing events to listen to for in \'config.events\'.' });
});

test('AnalyticsPlugin.register(context): can register', (t) => {
  t.notThrows(() => {
    AnalyticsPlugin.register({ hooks: { on: () => {} }, config: { [AnalyticsPlugin.configKey]: { events: { updateDocument: [] }, directory: './', } } });
  });
});

test('AnalyticsPlugin: E2E', async (t) => {
  const hooks = new EventDispatcher();
  const context = {
    hooks,
    config: {
      [AnalyticsPlugin.configKey]: {
        directory: 'test/site/data',
        events: {
          get: ['get'],
          getPopularDocuments: ['getPopularDocuments'],
          updateDocument: ['updateDocument'],
          validateConfig: ['validate-config'],
        },
      },
    },
  };

  AnalyticsPlugin.register(context);

  let output = await FileUtility.readFile('test/site/data', 'visits', 'json');
  t.is(output, '{"test":1,"zero":0,"two":2}');

  // hooks.dispatch('updateDocument', { slug: 'test' });
  // output = await FileUtility.readFile('test/site/data', 'visits', 'json');
  // t.is(output, '{"test":2,"zero":0,"two":2}');

  await hooks.filter('updateDocument', { slug: 'new' });
  output = await FileUtility.readFile('test/site/data', 'visits', 'json');
  t.is(output, '{"test":1,"zero":0,"two":2,"new":1}');

  await hooks.filter('updateDocument', { slug: 'new' });
  output = await FileUtility.readFile('test/site/data', 'visits', 'json');
  t.is(output, '{"test":1,"zero":0,"two":2,"new":2}');

  await hooks.validate('updateDocument', { slug: 'test' });
  output = await FileUtility.readFile('test/site/data', 'visits', 'json');
  t.is(output, '{"test":2,"zero":0,"two":2,"new":2}');

  await hooks.validate('updateDocument', {});
  output = await FileUtility.readFile('test/site/data', 'visits', 'json');
  t.is(output, '{"test":2,"zero":0,"two":2,"new":2}');

  await hooks.filter('updateDocument', { slug: 'new' });
  output = await FileUtility.readFile('test/site/data', 'visits', 'json');
  t.is(output, '{"test":2,"zero":0,"two":2,"new":3}');
});
