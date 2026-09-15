import type { JsonLdRecord } from "@/lib/seo/json-ld";

export function JsonLd({ data }: { data: JsonLdRecord | JsonLdRecord[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((entry, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
    </>
  );
}
