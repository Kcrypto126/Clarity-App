import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'edge',
  title: 'Edge',
  type: 'document',
  fields: [
    defineField({
      name: 'sourceNode',
      title: 'Source Node',
      type: 'reference',
      to: [{ type: 'node' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'targetNode',
      title: 'Target Node',
      type: 'reference',
      to: [{ type: 'node' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'relationshipType',
      title: 'Relationship Type',
      type: 'string',
      options: {
        list: [
          {
            title: 'Unlocks',
            value: 'unlocks'
          },
          {
            title: 'Related',
            value: 'related'
          }
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Optional explanation of how these nodes relate to each other',
    }),
  ],
  preview: {
    select: {
      sourceNodeTitle: 'sourceNode.title',
      relationshipType: 'relationshipType',
      targetNodeTitle: 'targetNode.title',
    },
    prepare(selection) {
      const { sourceNodeTitle, relationshipType, targetNodeTitle } = selection
      return {
        title: `${sourceNodeTitle} → ${targetNodeTitle}`,
        subtitle: `Relationship: ${relationshipType}`,
      }
    },
  },
}) 