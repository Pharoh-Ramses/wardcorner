# Vercel Blob Storage Setup

This document explains how to configure Vercel Blob storage for media uploads in the ward website.

## Overview

Vercel Blob storage is used to store uploaded media files (images, documents) in production instead of local filesystem storage. This ensures files persist across deployments and work properly in Vercel's serverless environment.

## Configuration

### 1. Automatic Setup

The Vercel Blob storage adapter is already configured in `src/payload.config.ts`:

```typescript
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

// In plugins array:
vercelBlobStorage({
  enabled: process.env.NODE_ENV === 'production', // Only enable in production
  collections: {
    media: true, // Enable for media collection
  },
  token: process.env.BLOB_READ_WRITE_TOKEN,
  addRandomSuffix: false, // Keep original filenames
  cacheControlMaxAge: 365 * 24 * 60 * 60, // 1 year cache
}),
```

### 2. Vercel Project Setup

To enable Vercel Blob storage:

1. **Go to your Vercel project dashboard**
2. **Navigate to Storage tab**
3. **Click "Create Blob Store"**
4. **Choose your region** (select closest to your users)
5. **Confirm creation**

Vercel will automatically set the `BLOB_READ_WRITE_TOKEN` environment variable in your project.

### 3. Environment Variables

The required environment variable is:

```env
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token-here
```

This is automatically set by Vercel when you add Blob storage to your project.

## Development vs Production

### Development (Local)

- Uses local filesystem storage
- Files stored in `media` directory
- No configuration needed

### Production (Vercel)

- Uses Vercel Blob storage
- Files stored in Vercel's cloud storage
- Automatic CDN distribution
- Persistent across deployments

## Usage

### For Ward Clerks/Admins

1. **Access Payload Admin** at `/admin`
2. **Navigate to "Media" collection** to upload files
3. **Or edit Events** and add images to the gallery
4. **Files are automatically stored** in Vercel Blob storage

### For Developers

The storage adapter works transparently - no code changes needed when uploading or displaying media. The same Payload API calls work in both development and production.

## Benefits

- **Persistent Storage**: Files survive deployments and restarts
- **CDN Delivery**: Automatic global distribution via Vercel's CDN
- **Scalability**: No storage limits on Vercel's platform
- **Performance**: Optimized delivery with caching
- **Security**: Access control maintained through Payload

## Troubleshooting

### Upload Issues

- Ensure `BLOB_READ_WRITE_TOKEN` is set in Vercel environment
- Check that Blob storage is enabled in your Vercel project
- Verify the storage adapter is enabled in production

### File Not Found

- Check that the file was uploaded successfully
- Verify the media relationship is properly set in the collection
- Ensure the file exists in the Vercel Blob storage dashboard

### Performance Issues

- Files are automatically cached for 1 year
- Consider optimizing images before upload
- Use appropriate file formats (WebP for images)

## Cost Considerations

Vercel Blob storage pricing includes:

- **Storage**: $0.15/GB per month
- **Bandwidth**: $0.40/GB for North America & Europe
- **Operations**: Included in the free tier

For most ward websites, the usage will be minimal and likely fall within Vercel's free tier limits.

## Migration

If you have existing media files in local storage:

1. **Export existing media** from local storage
2. **Upload to Vercel Blob storage** via Payload admin
3. **Update database references** if needed
4. **Deploy to production** with Blob storage enabled

The storage adapter will handle all new uploads automatically once configured.
