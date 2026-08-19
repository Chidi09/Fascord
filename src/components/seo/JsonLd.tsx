import React from "react";
import {
  OrganizationJsonLd as NextSeoOrgJsonLd,
  LocalBusinessJsonLd as NextSeoLocalBusinessJsonLd,
} from "next-seo";
import type { WithContext, WebSite, Service, FAQPage } from "schema-dts";

export function OrganizationJsonLd() {
  return (
    <>
      <NextSeoOrgJsonLd
        scriptKey="fascord-organization"
        name="Fascord Limited"
        legalName="Fascord Limited"
        url="https://fascord.co.uk"
        logo="https://fascord.co.uk/images/fascord-logo.png"
        telephone="+44 333 052 6786"
        email="Enquiries@fascord.co.uk"
        contactPoint={[
          {
            telephone: "+44 333 052 6786",
            contactType: "customer service",
            email: "Enquiries@fascord.co.uk",
          },
        ]}
        address={{
          streetAddress: "London Logistics Depot, Imperial Way",
          addressLocality: "London",
          postalCode: "E16 2QJ",
          addressCountry: "GB",
        }}
        sameAs={[
          "https://www.facebook.com/fascord",
          "https://twitter.com/fascord",
          "https://www.linkedin.com/company/fascord",
        ]}
      />
      <NextSeoLocalBusinessJsonLd
        scriptKey="fascord-localbusiness"
        name="Fascord Limited Logistics Depot"
        description="UK domestic express courier and worldwide air & sea freight forwarding logistics hub."
        url="https://fascord.co.uk"
        telephone="+44 333 052 6786"
        address={{
          streetAddress: "London Logistics Depot, Imperial Way",
          addressLocality: "London",
          postalCode: "E16 2QJ",
          addressCountry: "GB",
        }}
        geo={{
          latitude: 51.5074,
          longitude: 0.1278,
        }}
      />
    </>
  );
}

export function WebSiteJsonLd() {
  const schema: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Fascord Limited",
    url: "https://fascord.co.uk",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://fascord.co.uk/track?id={search_term_string}",
      query: "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LogisticsServiceJsonLd() {
  const schema: WithContext<Service> = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "International Courier and Freight Forwarding",
    provider: {
      "@type": "Organization",
      name: "Fascord Limited",
      url: "https://fascord.co.uk",
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Logistics Shipping Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Fascord Priority Express",
            description:
              "Fastest door-to-door expedited delivery with priority customs clearance.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Fascord Standard Cargo",
            description:
              "Reliable scheduled air and road freight forwarding across Europe and worldwide.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Fascord Economy Saver",
            description:
              "Cost-effective consolidated cargo for non-urgent shipments.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Same-Day Dedicated Courier",
            description:
              "Dedicated vehicle point-to-point UK immediate direct collection and delivery.",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FaqJsonLd({ faqs }: { faqs: { q: string; a: string }[] }) {
  const schema: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
