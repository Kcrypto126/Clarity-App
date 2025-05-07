import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'node',
  title: 'Node',
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
      name: 'nodeType',
      title: 'Node Type',
      type: 'string',
      options: {
        list: [
          { title: 'Clarity Node', value: 'clarity_node' },
          { title: 'Introductory Assessment', value: 'intro_assessment' },
        ],
      },
      validation: (Rule) => Rule.required(),
      description: 'Type of node - clarity node or introductory assessment',
    }),
    defineField({
      name: 'domain',
      title: 'Domain',
      type: 'reference',
      to: [{ type: 'domain' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metadata',
      title: 'Metadata',
      type: 'object',
      fields: [
        {
          name: 'minAge',
          title: 'Minimum Age',
          type: 'number',
        },
        {
          name: 'maxAge',
          title: 'Maximum Age',
          type: 'number',
        },
        {
          name: 'targetGender',
          title: 'Target Gender',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: 'Male', value: 'male' },
              { title: 'Female', value: 'female' },
              { title: 'Non-binary', value: 'non-binary' },
              { title: 'All', value: 'all' },
            ],
          },
        },
        {
          name: 'lifeStage',
          title: 'Life Stage',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: 'Student', value: 'student' },
              { title: 'Early Career', value: 'early-career' },
              { title: 'Mid Career', value: 'mid-career' },
              { title: 'Late Career', value: 'late-career' },
              { title: 'Parent', value: 'parent' },
              { title: 'Retiree', value: 'retiree' },
              { title: 'All', value: 'all' },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    }),
    defineField({
      name: 'unlockCriteria',
      title: 'Unlock Criteria',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'prerequisiteNode',
              title: 'Prerequisite Node',
              type: 'reference',
              to: [{ type: 'node' }],
              weak: true
            },
            {
              name: 'prerequisiteQuestion',
              title: 'Prerequisite Question',
              type: 'reference',
              to: [{ type: 'question' }],
              weak: true
            },
            {
              name: 'requiredAnswers',
              title: 'Required Answers',
              type: 'array',
              of: [{ type: 'string' }],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'questions',
      title: 'Questions',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'question' }] }],
    }),
    defineField({
      name: 'resources',
      title: 'Resources',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'resource' }] }],
    }),
    defineField({
      name: 'assessmentTemplate',
      title: 'Assessment Template',
      type: 'text',
      description: 'Document outlining how the node will be assessed to give users relevant resources',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      domain: 'domain.title',
      nodeType: 'nodeType',
    },
    prepare(selection) {
      const { title, domain, nodeType } = selection
      return {
        title,
        subtitle: `${nodeType ? `Type: ${nodeType}` : ''} ${domain ? `Domain: ${domain}` : ''}`,
      }
    },
  },
}) 