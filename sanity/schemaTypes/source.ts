import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'source',
  title: 'Source',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Academic Paper', value: 'academic_paper' },
          { title: 'Institution', value: 'institution' },
          { title: 'Research Study', value: 'research_study' },
          { title: 'Assessment Tool', value: 'assessment_tool' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'institution',
      title: 'Institution',
      type: 'string',
      description: 'Associated institution or organization',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Link to the source if available',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of the source and its relevance',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      institution: 'institution',
    },
    prepare(selection) {
      const { title, type, institution } = selection
      return {
        title,
        subtitle: `${type}${institution ? ` - ${institution}` : ''}`,
      }
    },
  },
}) 