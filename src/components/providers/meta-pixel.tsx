"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useMarketingConsent } from "@/components/providers/consent-provider";
import { getMetaPixelId, trackMetaEvent, trackViewContentForPath } from "@/lib/meta-pixel";

function whenFbqReady(callback: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }
  if (window.fbq) {
    callback();
    return () => {};
  }
  const intervalId = window.setInterval(() => {
    if (window.fbq) {
      window.clearInterval(intervalId);
      callback();
    }
  }, 50);
  const timeoutId = window.setTimeout(() => window.clearInterval(intervalId), 4000);
  return () => {
    window.clearInterval(intervalId);
    window.clearTimeout(timeoutId);
  };
}

export function MetaPixel() {
  const pixelId = getMetaPixelId();
  const pathname = usePathname();
  const { consent } = useMarketingConsent();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pixelId) {
      return;
    }

    return whenFbqReady(() => {
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
    });
  }, [consent, pathname, pixelId]);

  if (!pixelId) {
    return null;
  }

  return (
    <Script
      id="meta-pixel"
      strategy="afterInteractive"
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
