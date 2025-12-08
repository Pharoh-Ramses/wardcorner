import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Members } from './collections/Members'
import { AssignmentsCallings } from './collections/AssignmentsCallings'
import { Announcements } from './collections/Announcements'
import { Events } from './collections/Events'
import { SacramentPrograms } from './collections/SacramentPrograms'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Members,
    AssignmentsCallings,
    Announcements,
    Events,
    SacramentPrograms,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    formBuilderPlugin({
      fields: {
        text: true,
        textarea: true,
        select: true,
        email: true,
        checkbox: true,
        number: true,
        date: true,
        radio: true,
      },
    }),
    ...(process.env.NODE_ENV === 'production'
      ? [
          vercelBlobStorage({
            collections: {
              media: true,
            },
            token: process.env.BLOB_READ_WRITE_TOKEN,
            addRandomSuffix: false,
            cacheControlMaxAge: 365 * 24 * 60 * 60,
          }),
        ]
      : []),
  ],
})
