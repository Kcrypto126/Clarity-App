import { defineMigration, at, setIfMissing, append, unset } from 'sanity/migrate'

export default defineMigration({
  title: 'Migrate single source to sources array',
  documentTypes: ['question'],
  filter: 'defined(source) && !defined(sources)',
  migrate: {
    document(doc) {
      return [
        // Initialize sources array if it doesn't exist
        at('sources', setIfMissing([])),
        // Add the existing source reference to the sources array
        at('sources', append(doc.source)),
        // Remove the old source field
        at('source', unset()),
      ]
    },
  },
})
