import { makeBaseBundleConfig, makeBundleConfigVariants } from '../../rollup/index.js';

const targets = process.env.JS_VERSION ? [process.env.JS_VERSION] : ['es5', 'es6'];

if (targets.some(target => target !== 'es5' && target !== 'es6')) {
  throw new Error('JS_VERSION must be either "es5" or "es6"');
}
const builds = targets.map(jsVersion => {
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

  return [...makeBundleConfigVariants(baseBundleConfig), ...makeBundleConfigVariants(tracingBaseBundleConfig)];
}).flat();

export default builds;
