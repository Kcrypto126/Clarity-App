import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'answer',
  title: 'Answer',
  type: 'document',
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'unlocksNodes',
      title: 'Unlocks Nodes',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'node' }] }],
      description: 'Nodes that this answer choice unlocks when selected',
    }),
  ],
  preview: {
    select: {
      title: 'label',
      value: 'value',
    },
    prepare(selection) {
      const { title, value } = selection
      return {
        title,
        subtitle: `Value: ${value}`,
      }
    },
  },
}) 