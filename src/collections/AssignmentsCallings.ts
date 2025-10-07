import type { CollectionConfig } from 'payload'

export const AssignmentsCallings: CollectionConfig = {
  slug: 'assignments-callings',
  admin: {
    useAsTitle: 'calling',
  },
  fields: [
    {
      name: 'member',
      type: 'relationship',
      relationTo: 'members',
      required: true,
      hasMany: false,
    },
    {
      name: 'calling',
      type: 'text',
      required: true,
    },
    {
      name: 'organization',
      type: 'select',
      options: [
        { label: 'Bishopric', value: 'bishopric' },
        { label: 'Relief Society', value: 'relief-society' },
        { label: 'Elders Quorum', value: 'elders-quorum' },
        { label: 'Young Men', value: 'young-men' },
        { label: 'Young Women', value: 'young-women' },
        { label: 'Primary', value: 'primary' },
        { label: 'Sunday School', value: 'sunday-school' },
        { label: 'Ward Mission', value: 'ward-mission' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
  ],
}
