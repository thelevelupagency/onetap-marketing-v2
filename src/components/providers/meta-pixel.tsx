"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type MutableRefObject } from "react";
import { useMarketingConsent } from "@/components/providers/consent-provider";
import { getMetaPixelId, trackMetaEvent, trackViewContentForPath } from "@/lib/meta-pixel";

function syncConsentAndTrack(
  consent: "granted" | "denied" | null,
  pathname: string,
  lastTrackedPath: MutableRefObject<string | null>,
): void {
  if (consent === "granted") {
    window.fbq?.("consent", "grant");
    if (lastTrackedPath.current !== pathname) {
      trackMetaEvent("PageView");
      trackViewContentForPath(pathname);
      lastTrackedPath.current = pathname;
    }
    return;
  }

  window.fbq?.("consent", "revoke");
  if (consent === "denied") {
    lastTrackedPath.current = null;
  }
}

export function MetaPixel() {
  const pixelId = getMetaPixelId();
  const pathname = usePathname();
  const { consent } = useMarketingConsent();
  const lastTrackedPath = useRef<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);

  const handleScriptReady = useCallback(() => {
    setScriptReady(true);
  }, []);

  useEffect(() => {
    if (!pixelId || !scriptReady || typeof window.fbq !== "function") {
      return;
    }
    syncConsentAndTrack(consent, pathname, lastTrackedPath);
  }, [consent, pathname, pixelId, scriptReady]);

  if (!pixelId) {
    return null;
  }

  return (
    <Script
      id="meta-pixel"
      strategy="afterInteractive"
      onReady={handleScriptReady}
      dangerouslySetInnerHTML={{
        __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('consent', 'revoke');
fbq('set', 'autoConfig', false, '${pixelId}');
fbq('init', '${pixelId}');
`,
      }}
    />
  );
}
