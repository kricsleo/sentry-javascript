export * from '@sentry/browser';

export { init } from './sdk';
export { vueRouterInstrumentation } from './router';
export { attachErrorHandler } from './errorhandler';
export { createTracingMixins } from './tracing';
export { VueIntegration } from './integration';

import { Integrations as BrowserIntegrations, WINDOW } from '@sentry/browser';

let windowIntegrations = {};

// This block is needed to add compatibility with the integrations packages when used with a CDN
if (WINDOW.Sentry && WINDOW.Sentry.Integrations) {
  windowIntegrations = WINDOW.Sentry.Integrations;
}
const INTEGRATIONS = {
  ...windowIntegrations,
  ...BrowserIntegrations,
};
export { INTEGRATIONS as Integrations };
