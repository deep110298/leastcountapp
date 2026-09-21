import type { Metadata } from "next";
import { Outfit, IBM_Plex_Mono } from "next/font/google";
import { SerwistProvider } from "@serwist/next/react";
import OfflineBanner from "@/components/OfflineBanner";
import ThemeToggle from "@/components/ThemeToggle";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const DESCRIPTION =
  "Play Least Count against the computer: keep your hand low, call it, and win.";

export const metadata: Metadata = {
  metadataBase: new URL("https://leastcountapp.com"),
  title: "Least Count App",
  description: DESCRIPTION,
  openGraph: {
    title: "Least Count App",
    description: DESCRIPTION,
    url: "https://leastcountapp.com",
    siteName: "Least Count App",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Least Count App",
    description: DESCRIPTION,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  // Lets full-bleed backgrounds (Story Mode's felt table) paint under the
  // notch/status-bar safe area instead of leaving it as an uncovered gap —
  // see ThemeToggle's safe-area-aware top offset for the other half of this.
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="dark"||t==="light")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`,
          }}
        />
        {/* The published iOS app loads this exact page as its whole UI, but
            the HTML shipped over the wire is always the marketing markup
            (the server can't know it's native ahead of time). Without this,
            that marketing HTML paints for a frame before client JS hydrates,
            detects the native shell, and swaps in GameLauncher. This mirrors
            Capacitor's own isNativePlatform() bridge check (see page.tsx)
            but runs synchronously before first paint, same trick as the
            theme script above — flag it now so CSS can hide the wrong
            content until the real component swap lands. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if((window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers.bridge)||window.androidBridge){document.documentElement.setAttribute("data-native-boot","1")}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-canvas text-ink font-sans">
        {/* reloadOnOnline is off on purpose: the default reloads the page the
            moment connectivity returns, which would wipe an in-progress
            vs-Computer or Story Mode hand (in-memory React state, not
            persisted mid-round) the instant WiFi flickers back on. */}
        <SerwistProvider swUrl="/sw.js" reloadOnOnline={false}>
          <div id="native-boot-veil" />
          <ThemeToggle />
          {children}
          <OfflineBanner />
        </SerwistProvider>
      </body>
    </html>
  );
}
