export * from './index.bundle.base'

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
