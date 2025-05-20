'use client'
import { useState, useEffect, useRef } from 'react'
import axios from '@/lib/axios'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Label from '../Label'
import handleUploadChange from '@/lib/handeFileUpload'

export default function EditUserInfoForm() {
    const [form, setForm] = useState({
        image_url: '',
        github: '',
        url: '',
    })
    const [loading, setLoading] = useState(true)

    const imageRef = useRef()

    useEffect(() => {
        axios
            .get('/api/user')
            .then(res => {
                console.log(res)
                setForm({
                    image_url: res.data.image_url || '',
                    github: res.data.github || '',
                    url: res.data.url || '',
                })
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    const handleChange = e => {
        const { name, value } = e.target
        setForm(f => ({ ...f, [name]: value }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        // console.log(form['image_url']);
        // const file = form['image_url']

        try {
            // Start with the current form state
            let updatedForm = { ...form }

            const file = imageRef.current?.files?.[0]
            if (file) {
                // Upload the file and get the path
                const imagePath = await handleUploadChange(file)
                console.log('Image uploaded to:', imagePath)

                // Update our local copy of the form data
                updatedForm = {
                    ...updatedForm,
                    image_url: imagePath,
                }

                // Also update the React state (but don't wait for it)
                setForm(updatedForm)
            }
            const res = await axios.patch('/api/user', updatedForm, {
                headers: { 'Content-Type': 'application/json' },
            })
            console.log('Updated User:', res.data.data)
            // Show success message
        } catch (err) {
            console.error('Validation or server err', err.response?.data)
            // Show error message
        }
    }

    if (loading) return <p>Loading…</p>

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Edit User Info</h2>
            <p className="text-gray-500">You can edit your information here.</p>
            <Label>Image url</Label>
            <Input
                name="image_url"
                type="file"
                label="Link to your profile image"
                placeholder="Image URL"
                ref={imageRef}
            />
            <Label>Github url</Label>
            <Input
                name="github"
                type="text"
                label="Link to your GitHub"
                placeholder="GitHub URL"
                value={form.github}
                onChange={handleChange}
            />
            <Label>Porfolio URL</Label>
            <Input
                name="url"
                type="text"
                label="Other webpage you want to add"
                placeholder="Personal URL"
                value={form.url}
                onChange={handleChange}
            />
            {/* Add input for group_id? */}
            <Button>Save Profile</Button>
        </form>
    )
}
