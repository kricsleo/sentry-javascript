import { BrowserTracing } from '@sentry/browser'
import { Integrations as BrowserIntegrations, WINDOW } from '@sentry/browser';

let windowIntegrations = {};

// This block is needed to add compatibility with the integrations packages when used with a CDN
if (WINDOW.Sentry && WINDOW.Sentry.Integrations) {
  windowIntegrations = WINDOW.Sentry.Integrations;
}

const INTEGRATIONS = {
  ...windowIntegrations,
  ...BrowserIntegrations,
  BrowserTracing
};


export * from './index.bundle.base'

// add `BrowserTracing` export
// align with `@sentry/browser`
export { BrowserTracing } from '@sentry/browser'

export { INTEGRATIONS as Integrations };
