// @ts-nocheck
const fs = require('fs-extra');
const test = require('ava');
const AnalyticsProvider = require('../src/analytics-provider');

test.beforeEach(async () => {
  await fs.remove('test/site');
  await fs.ensureDir('test/site/data', { recursive: true });
  await fs.writeFile('test/site/data/visits.json', '{"test":1,"zero":0,"two":2}');
});

test.afterEach.always(async () => {
  await fs.remove('test/site');
});

const config = {
  directory: 'test/site/data',
};

test('constructor(config): does not error', (t) => {
  t.notThrows(() => new AnalyticsProvider(config));
});

test('constructor(config): throws an error when missing config', (t) => {
  t.throws(() => new AnalyticsProvider(), { message: 'No config provided.' });
});

test('constructor(config): throws an error when missing config directory', (t) => {
  t.throws(() => new AnalyticsProvider({}), { message: 'No directory provided.' });
});

test('update(slug): handles empty slug', async (t) => {
  const ap = new AnalyticsProvider(config);
  await t.notThrowsAsync(() => ap.update());
});

test('update(slug): properly stores new view count', async (t) => {
  const ap = new AnalyticsProvider(config);
  await ap.update('new', 0);
  await ap.update('new');
  const out = ap.get('new');
  t.is(out, 1);
});

test('update(slug): properly updates existing view count', async (t) => {
  const ap = new AnalyticsProvider(config);
  await ap.update('new', 0);
  await ap.update('new');
  await ap.update('new');
  const out = ap.get('new');
  t.is(out, 2);
});

test('get(slug): returns correct view count', async (t) => {
  const ap = new AnalyticsProvider(config);
  await ap.update('test', 0);
  let out = ap.get('test');
  t.is(out, 0);

  await ap.update('test');
  await ap.update('test');
  out = ap.get('test');
  t.is(out, 2);

  await ap.update('test');
  await ap.update('test');
  out = ap.get('test');
  t.is(out, 4);
});

test('get(slug): returns 0 when requesting view count of missing document', (t) => {
  const ap = new AnalyticsProvider(config);
  const out = ap.get('missing');
  t.is(out, 0);
});

test('getPopularDocuments(limit): returns the requested number of popular documents', async (t) => {
  const pageVisits = {
    '65816-reference': 7722,
    '65c816-code-snippets': 707,
    aaendi: 114,
    'aretha-2': 361,
    'asm-hacking-for-dummies': 677,
    'asm-tutorial-part-1': 1934,
    'asm-tutorial-part-2': 752,
    backgrounds: 1510,
    'basic-ca65-usage-for-snes-programming': 669,
  };

  const ap = new AnalyticsProvider(config);
  ap.pageVisits = { ...pageVisits };
  const out = await ap.getPopularDocuments(1);
  t.deepEqual(out, [{ slug: '65816-reference' }]);
});

test('getPopularDocuments(limit): throws an error with invalid limit', async (t) => {
  t.plan(1);
  const ap = new AnalyticsProvider(config);
  await t.throwsAsync(async () => ap.getPopularDocuments('1'), { message: 'Missing or invalid limit.' });
});

test('getPopularDocuments(limit): throws an error with missing limit', async (t) => {
  t.plan(1);
  const ap = new AnalyticsProvider(config);
  await t.throwsAsync(async () => ap.getPopularDocuments(), { message: 'Missing or invalid limit.' });
});
