import { defineCollection } from 'astro:content'
import { docsLoader } from '@astrojs/starlight/loaders'
import { docsSchema } from '@astrojs/starlight/schema'

// German is Starlight's root locale and it ships German UI strings, so no
// i18n collection is needed. Starlight logs a harmless "collection i18n does
// not exist" notice for that; declaring an empty one only adds a second warning.
export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
}
