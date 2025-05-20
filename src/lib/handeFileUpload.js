'use server'
import { writeFile } from 'fs/promises'

export default async function handleUploadChange(imageRef) {
    console.log('imageRef:', imageRef)
    const imageFile = imageRef // Get file from event
    console.log('Image file:', imageFile)

    console.log('imageRef type:', typeof imageRef)

    const buffer = await imageFile.arrayBuffer()
    const imageBuffer = Buffer.from(buffer)

    const filePath = `./uploads/${imageFile.name}`
    await writeFile(filePath, imageBuffer)
}
