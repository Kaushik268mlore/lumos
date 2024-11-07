// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://76394e5699229a0f4e58242a390028bb@o4508253448699904.ingest.us.sentry.io/4508253461741568",

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
