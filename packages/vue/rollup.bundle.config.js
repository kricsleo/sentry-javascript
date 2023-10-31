import { makeBaseBundleConfig, makeBundleConfigVariants } from '../../rollup/index.js';

const builds = [];

const targets = process.env.JS_VERSION ? [process.env.JS_VERSION] : ['es5', 'es6'];

if (targets.some(target => target !== 'es5' && target !== 'es6')) {
  throw new Error('JS_VERSION must be either "es5" or "es6"');
}

targets.forEach(jsVersion => {
  const baseBundleConfig = makeBaseBundleConfig({
    bundleType: 'standalone',
    entrypoints: ['src/index.bundle.ts'],
    jsVersion,
    licenseTitle: '@sentry/vue',
    outputFileBase: () => `bundles/sentry-vue${jsVersion === 'es5' ? '.es5' : ''}`,
  });

  const tracingBaseBundleConfig = makeBaseBundleConfig({
    bundleType: 'standalone',
    entrypoints: ['src/index.bundle.tracing.ts'],
    jsVersion,
    licenseTitle: '@sentry/vue & @sentry/tracing',
    outputFileBase: () => `bundles/sentry-vue.tracing${jsVersion === 'es5' ? '.es5' : ''}`,
  });

  builds.push(...makeBundleConfigVariants(baseBundleConfig), ...makeBundleConfigVariants(tracingBaseBundleConfig));
});

if (targets.includes('es6')) {
  // Replay bundles only available for es6
  const replayBaseBundleConfig = makeBaseBundleConfig({
    bundleType: 'standalone',
    entrypoints: ['src/index.bundle.replay.ts'],
    jsVersion: 'es6',
    licenseTitle: '@sentry/vue & @sentry/replay',
    outputFileBase: () => 'bundles/sentry-vue.replay',
  });

  const tracingReplayBaseBundleConfig = makeBaseBundleConfig({
    bundleType: 'standalone',
    entrypoints: ['src/index.bundle.tracing.replay.ts'],
    jsVersion: 'es6',
    licenseTitle: '@sentry/vue & @sentry/tracing & @sentry/replay',
    outputFileBase: () => 'bundles/sentry-vue.tracing.replay',
  });

  builds.push(
    ...makeBundleConfigVariants(replayBaseBundleConfig),
    ...makeBundleConfigVariants(tracingReplayBaseBundleConfig),
  );
}

export default builds;
