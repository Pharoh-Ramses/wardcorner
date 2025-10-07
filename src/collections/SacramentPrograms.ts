import type { CollectionConfig } from 'payload'

export const SacramentPrograms: CollectionConfig = {
  slug: 'sacrament-programs',
  admin: {
    useAsTitle: 'date',
  },
  fields: [
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'presiding',
      type: 'text',
    },
    {
      name: 'conducting',
      type: 'text',
    },
    {
      name: 'speakers',
      type: 'array',
      fields: [
        {
          name: 'speaker',
          type: 'relationship',
          relationTo: 'members',
          required: true,
        },
        {
          name: 'topic',
          type: 'text',
        },
      ],
    },
    {
      name: 'musicalNumbers',
      type: 'array',
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Opening Hymn', value: 'opening-hymn' },
            { label: 'Sacrament Hymn', value: 'sacrament-hymn' },
            { label: 'Intermediate Hymn', value: 'intermediate-hymn' },
            { label: 'Closing Hymn', value: 'closing-hymn' },
            { label: 'Special Musical Number', value: 'special' },
          ],
          required: true,
        },
        {
          name: 'performer',
          type: 'relationship',
          relationTo: 'members',
        },
        {
          name: 'song',
          type: 'text',
        },
      ],
    },
    {
      name: 'announcements',
      type: 'relationship',
      relationTo: 'announcements',
      hasMany: true,
    },
  ],
}
