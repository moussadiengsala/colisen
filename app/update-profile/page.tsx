"use client"
import { ChangeEvent, useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { SubmitButton } from '@/components/ui/submit-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Image } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useAvatarProfile from '@/lib/get-user-profile'

export default function AvatarProfile({ searchParams }: { searchParams: { userid: string} }) {
    if (!searchParams?.userid) {
        return redirect("signin");
    }

    const size = 200
    const [avatarUrl, setAvatarUrl] = useAvatarProfile(searchParams?.userid)
    const [url, setUrl] = useState<string|null>(null)
    const [uploading, setUploading] = useState(false)
    
    async function uploadAvatar(event : ChangeEvent<HTMLInputElement>) {
        const supabase = createClient();
        try {

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.')
            }

            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            const { data, error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }
            const url = URL.createObjectURL(file)
            setAvatarUrl(url)
            setUrl(data.path)

        } catch (error) {
            alert(error)
        }
    }

    async function updateProfile() {
        const supabase = createClient();

        setUploading(true)

        const updates = {
            id: searchParams?.userid,
            avatar_url: url,
        }

        const { error } = await supabase.from('profiles').upsert(updates)

        if (error) {
            alert(error.message)
        } else {
            // setAvatarUrl(avatarUrl)
        }
        setUploading(false)
    }

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">Upload profile</CardTitle>
                <CardDescription>
                    changer votre photo de profile
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div>
                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt="Avatar"
                            className="avatar image"
                            style={{ height: size, width: size }}
                        />
                    ) : (
                        <div className="avatar no-image" style={{ height: size, width: size }} />
                    )}
                </div>
                <form className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="single">
                            {/* <Button className='p-6 space-x-2 w-full'> */}
                                <Image />
                                <span>upload</span>
                            {/* </Button> */}
                        </Label>
                        <Input 
                            style={{
                                visibility: 'hidden',
                                position: 'absolute',
                            }}
                            type="file"
                            id="single"
                            accept="image/*"
                            onChange={uploadAvatar}
                            disabled={uploading}
                            required />
                    </div>
                    <SubmitButton formAction={updateProfile} className="w-full" pendingText="uploadding..." >
                        enregistrer
                    </SubmitButton>
                </form>
            </CardContent>
        </Card>
    )
}
