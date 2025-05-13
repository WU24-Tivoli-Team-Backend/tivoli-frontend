'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Input from '@/components/Input'
import Button from '@/components/Button'

export default function EditUserInfoForm() {
    const [form, setForm] = useState({
        image_url: '',
        github: '',
        url: '',
        // group_id: '',
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios
            .get('/api/user')
            .then(res => {
                setForm({
                    image_url: res.data.data.image_url || '',
                    github: res.data.data.github || '',
                    url: res.data.data.url || '',
                    //   group_id:  res.data.data.group_id?.toString() || '',
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
        try {
            const res = await axios.patch('/api/user/profile', form, {
                headers: { 'Content-Type': 'application/json' },
            })
            console.log('Uppdaterad user:', res.data.data)
            // Show success message
        } catch (err) {
            console.error('Valideringsfel eller serverfel', err.response.data)
            // Show error message
        }
    }

    if (loading) return <p>Loading…</p>

    return (
        <form className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Edit User Info</h2>
            <p className="text-gray-500">You can edit your information here.</p>
            <Input
                name="image_url"
                type="text"
                label="Link to your profile image"
                placeholder="Image URL"
            />
            <Input
                name="github"
                type="text"
                label="Link to your GitHub"
                placeholder="GitHub URL"
            />
            <Input
                name="url"
                type="text"
                label="Other webpage you want to add"
                placeholder="Personal URL"
            />
            <Button>Save Profile</Button>
        </form>
    )
}
