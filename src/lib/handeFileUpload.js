'use server'
import path from 'path'
import { put } from '@vercel/blob'

export default async function handleUploadChange(imageFile) {
    try {
        // Convert file to Buffer
        // const buffer = await imageFile.arrayBuffer()

        // Ensure uploads directory exists
        // const uploadDir = path.join(process.cwd(), 'public/uploads')
        // await mkdir(uploadDir, { recursive: true })

        if (!imageFile || imageFile.size === 0) {
            throw new Error('No file provided')
        }

        // Optional: Check file size (e.g., 5MB limit)
        const maxSize = 5 * 1024 * 1024 // 5MB
        if (imageFile.size > maxSize) {
            throw new Error('File too large')
        }

        // Optional: Check file type
        if (!imageFile.type.startsWith('image/')) {
            throw new Error('File must be an image')
        }

        const timestamp = Date.now() // Simple millisecond timestamp
        const fileExtension = path.extname(imageFile.name)
        const fileName = `${path.basename(imageFile.name, fileExtension)}_${timestamp}${fileExtension}`
        // // Save the file
        // const filePath = path.join(uploadDir, fileName)
        // await writeFile(filePath, Buffer.from(buffer))
        const blob = await put(fileName, imageFile, {
            access: 'public',
        })

        console.log('Upload successful:', blob.url)

        // Return the URL directly
        return blob.url
        
    } catch (error) {
        console.error('Upload error:', error)
        throw new Error('File upload failed')
    }
}
