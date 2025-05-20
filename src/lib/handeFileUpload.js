'use server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export default async function handleUploadChange(imageFile) {
    try {
        // Convert file to Buffer
        const buffer = await imageFile.arrayBuffer()

        // Ensure uploads directory exists
        const uploadDir = path.join(process.cwd(), 'public/uploads')
        await mkdir(uploadDir, { recursive: true })

        const timestamp = Date.now() // Simple millisecond timestamp
        const fileExtension = path.extname(imageFile.name)
        const fileName = `${path.basename(imageFile.name, fileExtension)}_${timestamp}${fileExtension}`
        // Save the file
        const filePath = path.join(uploadDir, fileName)
        await writeFile(filePath, Buffer.from(buffer))

        // Return public URL path
        return `/uploads/${fileName}`
    } catch (error) {
        console.error('Upload error:', error)
        throw new Error('File upload failed')
    }
}
