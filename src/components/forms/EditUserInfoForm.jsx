import Input from '@/components/Input'
import Button from '@/components/Button'

export default function EditUserInfoForm() {
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
