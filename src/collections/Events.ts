import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'startDateTime',
      type: 'date',
      required: true,
    },
    {
      name: 'endDateTime',
      type: 'date',
    },
    {
      name: 'location',
      type: 'group',
      fields: [
        {
          name: 'venueName',
          type: 'text',
          label: 'Venue Name',
        },
        {
          name: 'streetAddress',
          type: 'text',
          label: 'Street Address',
        },
        {
          name: 'city',
          type: 'text',
          label: 'City',
        },
        {
          name: 'state',
          type: 'text',
          label: 'State/Province',
        },
        {
          name: 'zipCode',
          type: 'text',
          label: 'ZIP/Postal Code',
        },
        {
          name: 'country',
          type: 'text',
          label: 'Country',
          defaultValue: 'United States',
        },
      ],
    },
    {
      name: 'eventType',
      type: 'select',
      options: [
        { label: 'Meeting', value: 'meeting' },
        { label: 'Activity', value: 'activity' },
        { label: 'Service', value: 'service' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
    },
    {
      name: 'rsvpRequired',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'contactPerson',
      type: 'relationship',
      relationTo: 'assignments-callings',
      hasMany: false,
    },
    {
      name: 'gallery',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      admin: {
        description: 'Add event photos to the gallery',
      },
    },
  ],
}
