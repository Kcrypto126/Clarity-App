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
          { title: 'Prerequisite', value: 'prerequisite' },
          { title: 'Related', value: 'related' },
          { title: 'Expands On', value: 'expands-on' },
          { title: 'Contrasts With', value: 'contrasts-with' },
          { title: 'Leads To', value: 'leads-to' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'strength',
      title: 'Relationship Strength',
      type: 'number',
      description: 'A number between 0-10 indicating the strength of this relationship',
      validation: (Rule) => Rule.min(0).max(10),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Explanation of how these nodes relate to each other',
    }),
    defineField({
      name: 'unlockRequirements',
      title: 'Unlock Requirements',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Source Node Question',
              type: 'reference',
              to: [{ type: 'question' }],
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'requiredAnswers',
              title: 'Required Answers',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      description: 'Requirements for this edge to unlock the target node',
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