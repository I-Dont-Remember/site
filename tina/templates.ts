import type { TinaField } from "tinacms";
export function blog_postFields() {
  return [
    {
      type: "string",
      name: "title",
      label: "title",
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
