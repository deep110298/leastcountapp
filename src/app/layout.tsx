import type { Metadata } from "next";
import { Outfit, IBM_Plex_Mono } from "next/font/google";
import NativeBootVeilClear from "@/components/NativeBootVeilClear";
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
            detects the native shell, and swaps in the real native screen.
            This mirrors Capacitor's own isNativePlatform() bridge check
            (see useIsNativePlatform) but runs synchronously before first
            paint, same trick as the theme script above — flag it now so CSS
            can hide the wrong content until the real component swap lands.
            NativeBootVeilClear below removes the flag once that's done; it
            has to run on every page, not just "/", since a plain <a href>
            tap (see GameLauncher) is a full navigation that reruns this
            script fresh on whatever page it lands on. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if((window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers.bridge)||window.androidBridge){document.documentElement.setAttribute("data-native-boot","1")}}catch(e){}})()`,
          }}
        />
        {/* This app no longer registers a service worker (src/sw.ts is now
            just a kill switch — see its own comment for why), but a device
            that installed the old caching one still has it active until the
            browser's own update check notices the new file and swaps it in.
            That check happens on its own, but isn't guaranteed to run on
            every single load, so this forces it immediately on every page
            view instead of leaving an already-broken device waiting on it. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if('serviceWorker' in navigator){navigator.serviceWorker.getRegistrations().then(function(regs){regs.forEach(function(r){r.update()})})}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-canvas text-ink font-sans">
        <div id="native-boot-veil" />
        <NativeBootVeilClear />
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
