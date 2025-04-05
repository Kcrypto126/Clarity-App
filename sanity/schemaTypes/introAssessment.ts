import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'introAssessment',
  title: 'Introductory Assessment',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'questions',
      title: 'Questions',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'question' }],
          options: {
            filter: 'isInIntroductoryAssessment == true',
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'version',
      title: 'Version',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Whether this version of the introductory assessment is currently active',
    }),
    defineField({
      name: 'unlockRules',
      title: 'Unlock Rules',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'reference',
              to: [{ type: 'question' }],
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'nodesToUnlock',
              title: 'Nodes to Unlock',
              type: 'array',
              of: [{ type: 'reference', to: [{ type: 'node' }] }],
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      description: 'Rules for which nodes to unlock based on answers to introductory questions',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      version: 'version',
      active: 'isActive',
    },
    prepare(selection) {
      const { title, version, active } = selection
      return {
        title,
        subtitle: `Version: ${version} ${active ? '(Active)' : '(Inactive)'}`,
      }
    },
  },
}) 