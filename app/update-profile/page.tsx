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
import { Image } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useUserQuery from '@/hooks/use-user'
import useSupabase from '@/hooks/use-supabase'

export default function AvatarProfile({ searchParams }: { searchParams: { userid: string} }) {
    const client = useSupabase()
    const {
        data,
        isLoading,
        isError
    } = useUserQuery()

    if (isError && !data) {
        return redirect("signin");
    }

    const size = 200
    const [avatarUrl, setAvatarUrl] = useState(data?.profile.avatar_url)
    const [url, setUrl] = useState<string|null>(null)
    const [uploading, setUploading] = useState(false)
    
    async function uploadAvatar(event : ChangeEvent<HTMLInputElement>) {
        try {

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.')
            }

            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            const { data, error: uploadError } = await client.storage.from('avatars').upload(filePath, file)

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

        setUploading(true)

        const updates = {
            id: searchParams?.userid,
            avatar_url: url,
        }

        const { error } = await client.from('profiles').upsert(updates)

        if (error) {
            alert(error.message)
        } else {
            // setAvatarUrl(avatarUrl)
        }
        setUploading(false)
    }

    return (
        <div className="flex items-center justify-center my-auto w-full max-w-7xl px-3 py-10 text-sm space-y-10 desktop:justify-around relative">
            <Card className="mx-auto w-full max-w-xl min-w-sm desktop:w-1/2">
                <CardHeader>
                    <CardTitle className="text-xl">Upload profile</CardTitle>
                    <CardDescription>
                        changer votre photo de profile
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='w-full flex justify-center items-center'>
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
                    <form className="grid gap-4 my-4">
                        <div className="grid gap-2">
                            <Label htmlFor="single">
                                <Button asChild className='p-6 space-x-2 w-full bg-custom-sky-50 hover:bg-custom-sky-40'>
                                    <span>
                                        <Image />
                                        <span>upload</span>
                                    </span>
                                </Button>
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
        </div>
    )
}
