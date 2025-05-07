import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'question',
  title: 'Question',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'identifier',
      title: 'Identifier',
      type: 'string',
      description: 'Optional identifier for this question to be used to enforce specific logic within the app e.g. if this is a question that fills out a field on the supabase.users table it should be something like intro-assessment-name so we can programmatically fill out the users name',
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      description: 'Additional context or notes about this question',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'reference',
      to: [{ type: 'source' }],
      description: 'Research source or origin of this question',
    }),
    defineField({
      name: 'answerType',
      title: 'Answer Type',
      type: 'string',
      options: {
        list: [
          { title: 'Multiple Choice (Single)', value: 'multiple-choice-single' },
          { title: 'Multiple Choice (Multiple)', value: 'multiple-choice-multiple' },
          { title: 'Rating Scale', value: 'rating-scale' },
          { title: 'Journal Entry', value: 'journal-entry' },
          { title: 'Text Input', value: 'text-input' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answers',
      title: 'Answers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Display text for this answer',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'value',
              title: 'Value',
              type: 'number',
              description: 'Numeric value (required for rating scales, optional for others)',
              validation: (Rule) => Rule.custom((value, context) => {
                if (context.document?.answerType === 'rating-scale' && typeof value !== 'number') {
                  return 'Rating scale answers must have a numeric value'
                }
                return true
              }),
            },
            {
              name: 'unlocksNodes',
              title: 'Unlocks Nodes',
              type: 'array',
              of: [{ type: 'reference', to: [{ type: 'node' }] }],
              description: 'Nodes that this answer choice unlocks when selected',
            },
            {
              name: 'addsUnlockPointsToNodes',
              title: 'Adds Unlock Points To Nodes',
              type: 'array',
              of: [{ type: 'reference', to: [{ type: 'node' }] }],
              description: 'Nodes that this answer choice adds unlock points to when selected',
            }
          ],
          preview: {
            select: {
              label: 'label',
              value: 'value',
              nodes: 'unlocksNodes',
            },
            prepare({ label, value, nodes = [] }) {
              return {
                title: label,
                subtitle: `${value ? `Value: ${value}, ` : ''}Unlocks: ${nodes.length} node${nodes.length === 1 ? '' : 's'}`,
              }
            },
          },
        },
      ],
      description: 'Available answers for this question. Structure depends on answer type.',
      validation: (Rule) => Rule.custom((answers, context) => {
        const type = context.document?.answerType as string | undefined
        if (!answers?.length && ['multiple-choice-single', 'multiple-choice-multiple', 'rating-scale'].includes(type ?? '')) {
          return 'This question type requires at least one answer'
        }
        if (type === 'rating-scale' && Array.isArray(answers)) {
          const values = answers
            .map(a => (a as { value?: number }).value)
            .filter((v): v is number => typeof v === 'number')
            .sort((a, b) => a - b)

          if (values.length !== answers.length) {
            return 'All rating scale answers must have numeric values'
          }

          for (let i = 1; i < values.length; i++) {
            if (values[i] !== values[i - 1] + 1) {
              return 'Rating scale values must be sequential numbers'
            }
          }
        }
        return true
      }),
      hidden: ({ document }) => ['journal-entry', 'text-input'].includes((document?.answerType as string) ?? ''),
    }),
    defineField({
      name: 'skipLogic',
      title: 'Skip Logic',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'reason',
              title: 'Reason',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      description: 'Reasons a user might choose to skip this question',
    }),
    defineField({
      name: 'weight',
      title: 'Weight',
      type: 'number',
      description: 'The weight/importance of this question (used for node unlocking calculations)',
    }),
    defineField({
      name: 'similarQuestions',
      title: 'Similar Questions',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'question' }],
        weak: true
      }],
      description: 'Questions that are similar to this one (to prevent overlap)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      domain: 'domain.title',
      node: 'parentNode.title',
      type: 'answerType',
    },
    prepare(selection) {
      const { title, domain, node, type } = selection
      return {
        title,
        subtitle: `${domain ? domain + ' - ' : ''}${node ? node + ' - ' : ''}${type || ''}`
      }
    }
  },
}) 