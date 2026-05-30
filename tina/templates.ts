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
      required: true,
    },
    {
      type: "string",
      name: "timezone",
      label: "Timezone",
      description: "IANA timezone name, e.g. America/Chicago — used to display dates correctly",
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
        itemProps: (item) => ({ label: item?.date ? item.date.substring(0, 10) : 'New date' }),
      },
      fields: [
        {
          type: "string",
          name: "date",
          label: "Date (ISO UTC)",
          description: "e.g. 2026-07-12T21:00:00Z — display is auto-formatted from this using the event timezone",
          required: true,
        },
        {
          type: "number",
          name: "duration_hours",
          label: "Duration (hours)",
          description: "How long the event runs — defaults to 2 if not set. Used for calendar download.",
        },
        {
          type: "string",
          name: "note",
          label: "Note (optional)",
          description: "Small italic note shown under this date (e.g. 'runs until 8 pm', 'venue may change')",
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
