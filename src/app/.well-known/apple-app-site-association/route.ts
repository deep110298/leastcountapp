import { NextResponse } from 'next/server';

// Enables Universal Links: iOS opens the app directly (instead of Safari)
// when a user taps a /room/* link, as long as the app is installed and the
// "Associated Domains" capability (applinks:leastcountapp.com) is added in
// Xcode. Must be served with no redirects; NextResponse.json() covers that.
const APPLE_APP_SITE_ASSOCIATION = {
  applinks: {
    apps: [],
    details: [
      {
        appID: 'UKX2LHA74L.com.leastcountapp.app',
        paths: ['/room/*'],
      },
    ],
  },
};

export function GET() {
  return NextResponse.json(APPLE_APP_SITE_ASSOCIATION);
}
