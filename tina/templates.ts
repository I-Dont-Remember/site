import type { TinaField } from "tinacms";

export function event_postFields(): TinaField[] {
  return [
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    {
      type: "datetime",
      name: "date",
      label: "Page Created Date",
    },
    {
      type: "boolean",
      name: "draft",
      label: "Draft",
    },
    {
      type: "boolean",
      name: "noindex",
      label: "Hide from search engines",
    },
    {
      type: "string",
      name: "event_key",
      label: "Event Key",
      description: "Secret key guests need in the URL hash to view this page",
    },
    {
      type: "string",
      name: "emoji",
      label: "Hero Emoji",
      description: "Displayed large at the top when no cover image is set",
    },
    {
      type: "image",
      name: "cover_image",
      label: "Cover Image (optional)",
      description: "Full-bleed hero image; overrides the emoji hero when set",
    },
    {
      type: "string",
      name: "location",
      label: "Location",
    },
    {
      type: "string",
      name: "location_url",
      label: "Location URL (optional)",
      description: "Google Maps link or any URL — makes the location text a link",
    },
    {
      type: "object",
      name: "event_dates",
      label: "Dates",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.label || "New date" }),
      },
      fields: [
        {
          type: "string",
          name: "date",
          label: "Date (ISO UTC)",
          description: "e.g. 2026-07-12T21:00:00Z — used by the date highlighter and calendar download",
          required: true,
        },
        {
          type: "string",
          name: "label",
          label: "Display Label",
          description: "e.g. Saturday, July 12 · 4pm–8pm",
          required: true,
        },
        {
          type: "string",
          name: "note",
          label: "Note (optional)",
          description: "Small italic note shown next to this date",
        },
      ],
    },
  ] as TinaField[];
}

export function stream_postFields(): TinaField[] {
  return [
    {
      type: "datetime",
      name: "date",
      label: "date",
    },
    {
      type: "string",
      name: "tags",
      label: "tags",
      list: true,
      ui: {
        component: "tags",
      },
    },
  ];
}
export function blog_postFields() {
  return [
    {
      type: "string",
      name: "title",
      label: "title",
    },
    {
      type: "boolean",
      name: "draft",
      label: "draft",
    },
    {
      type: "boolean",
      name: "featured",
      label: "featured",
    },
    {
      type: "boolean",
      name: "toc",
      label: "toc",
    },
    {
      type: "datetime",
      name: "date",
      label: "date",
    },
    {
      type: "string",
      name: "categories",
      label: "categories",
      list: true,
      ui: {
        component: "tags",
      },
    },
    {
      type: "string",
      name: "tags",
      label: "tags",
      list: true,
      ui: {
        component: "tags",
      },
    },
    {
      type: "string",
      name: "description",
      label: "description",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "image",
      name: "images",
      label: "images",
      list: true,
    },
  ] as TinaField[];
}
