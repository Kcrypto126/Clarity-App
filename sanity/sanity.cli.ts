import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  studioHost: 'clarity',
  api: {
    projectId: 'nbicm0cg',
    dataset: 'production',
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  deployment: {autoUpdates: true},
})
