import { getMetaPixelBootstrapScript, getMetaPixelId } from "@/lib/meta-pixel";

/**
 * Server-rendered pixel stub so `fbq` exists before React hydrates.
 * Tracking stays off until Accept (`fbq('consent', 'revoke')` in the snippet).
 */
export function MetaPixelBootstrap() {
  const pixelId = getMetaPixelId();
  if (!pixelId) {
    return null;
  }

  return (
    <script
      id="meta-pixel"
      dangerouslySetInnerHTML={{ __html: getMetaPixelBootstrapScript(pixelId) }}
    />
  );
}
