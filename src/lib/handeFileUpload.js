'use server'
import path from 'path'
import { put } from '@vercel/blob'

export default async function handleUploadChange(imageFile) {
    try {
        if (!imageFile || imageFile.size === 0) {
            throw new Error('No file provided')
        }

        const maxSize = 5 * 1024 * 1024 // 5MB
        if (imageFile.size > maxSize) {
            throw new Error('File too large')
        }

        if (!imageFile.type.startsWith('image/')) {
            throw new Error('File must be an image')
        }

        const timestamp = Date.now()
        const fileExtension = path.extname(imageFile.name)
        const fileName = `${path.basename(imageFile.name, fileExtension)}_${timestamp}${fileExtension}`
        const blob = await put(fileName, imageFile, {
            access: 'public',
        })

        console.log('Upload successful:', blob.url)

        return blob.url
    } catch (error) {
        console.error('Upload error:', error)
        throw new Error('File upload failed')
    }
}
