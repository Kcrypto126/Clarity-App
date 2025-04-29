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
      name: 'notes',
      title: 'Notes',
      type: 'text',
      description: 'Additional context or notes about this question',
    }),
    defineField({
      name: 'section',
      title: 'Section',
      type: 'string',
      description: 'The section this question belongs to within a node',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'domain',
      title: 'Domain',
      type: 'reference',
      to: [{ type: 'domain' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'parentNode',
      title: 'Parent Node',
      type: 'reference',
      to: [{ type: 'node' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
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
      of: [{ type: 'reference', to: [{ type: 'answer' }] }],
      description: 'Available answers for this question',
    }),
    defineField({
      name: 'minRating',
      title: 'Minimum Rating',
      type: 'number',
      description: 'For rating scale questions, the minimum value',
    }),
    defineField({
      name: 'maxRating',
      title: 'Maximum Rating',
      type: 'number',
      description: 'For rating scale questions, the maximum value',
    }),
    defineField({
      name: 'ratingLabels',
      title: 'Rating Labels',
      type: 'object',
      fields: [
        {
          name: 'min',
          title: 'Minimum Label',
          type: 'string',
          description: 'Label for minimum rating (e.g., "Strongly Disagree")',
        },
        {
          name: 'max',
          title: 'Maximum Label',
          type: 'string',
          description: 'Label for maximum rating (e.g., "Strongly Agree")',
        },
      ],
      description: 'Labels for the endpoints of rating scales',
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
      of: [{ type: 'reference', to: [{ type: 'question' }] }],
      description: 'Questions that are similar to this one (to prevent overlap)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      domain: 'domain.title',
      node: 'parentNode.title',
    },
    prepare(selection) {
      const { title, domain, node } = selection
      return {
        title,
        subtitle: `${node ? `Node: ${node}` : ''} ${domain ? `Domain: ${domain}` : ''}`,
      }
    },
  },
}) 