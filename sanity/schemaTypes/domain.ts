import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'domain',
  title: 'Domain',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Domain Color',
      type: 'string',
      description: 'Hex color code for this domain (used in UI)',
    }),
    defineField({
      name: 'icon',
      title: 'Domain Icon',
      type: 'string',
      description: 'Icon identifier for this domain (used in UI)',
    }),
    defineField({
      name: 'relatedDomains',
      title: 'Related Domains',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'domain' }] }],
    }),
  ],
}) 