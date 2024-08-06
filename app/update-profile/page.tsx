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
import { Image, ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useUserQuery from '@/hooks/use-user'
import useSupabase from '@/hooks/use-supabase'
import { InfoLog } from '@/components/ui/info-log'

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
    const [error, setError] = useState<{message: string, isError: boolean}>({message: "", isError: false});
    const [avatarUrl, setAvatarUrl] = useState(data?.profile.avatar_url)
    const [uploading, setUploading] = useState(false)
    const [ uploadedFile, setUploadedFile ] = useState<{file: File | null, filePath: string}>({file: null, filePath: ""})
    
    async function uploadAvatar(event : ChangeEvent<HTMLInputElement>) {
        setError({message: "", isError: false}); // Reset error state
        console.log(uploading);
        if (!event.target.files || event.target.files.length === 0) {
            setError({message: "Vous devez sélectionner une image.", isError: true});
            return;
        }

        const file = event.target.files[0]
        const fileExt = file.name.split('.').pop()
        const allowedExtensions = ['png', 'jpg', 'jpeg'];
        const maxSizeInKB = 500;

        if (!allowedExtensions.includes(fileExt || '')) {
            setError({ message: "Seules les images 'png', 'jpg', 'jpeg' sont autorisées.", isError: true });
            return;
        }

        if (file.size > maxSizeInKB * 1024) {
            setError({ message: `La taille du fichier ne doit pas dépasser ${maxSizeInKB}KB.`, isError: true });
            return;
        }
        const fileName = `${Math.random()}.${fileExt}`

        const fileUrl = URL.createObjectURL(file)
        setAvatarUrl(fileUrl)
        setUploadedFile({file: file, filePath: fileName})
    }

    const updateProfile = async () => {
        if (!uploadedFile.file) {
            setError({message: "Vous devez sélectionner une image d'abord.", isError: true});
            return
        };
        
        try {
            setUploading(() => true)
            const { data: uploadData, error: uploadError } = await client.storage.from('avatars').upload(uploadedFile.filePath, uploadedFile.file)
            if (uploadError) {
                throw uploadError
            }

            const updates = {
                id: searchParams?.userid,
                avatar_url: uploadData.path,
            };
        
            const { error: updateError } = await client.from("profiles").upsert(updates);
        
            if (updateError) {
                throw updateError;
            }

            setError({message: "Votre profil a été mis à jour avec succès.", isError: false});
        } catch (error: any) {
            setError({message: error.message, isError: true});
        } finally {
            setUploading(false)
            console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
        }
    };

    useEffect(() => {
        console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", uploading)
    }, [uploading])

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
                            <div className="avatar no-image flex justify-center items-center" style={{ height: size, width: size }} >
                                <ImageIcon />
                            </div>
                        )}
                    </div>
                    <form className="grid gap-4 my-4">
                        <div className="grid gap-2">
                            <Label htmlFor="single">
                                <Button asChild disabled={uploading} className='cursor-pointer w-full p-7 text-white rounded-md bg-black hover:bg-black/80 font-bold space-x-2'>
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
                        <SubmitButton formAction={updateProfile} pendingText="enregistrement..." >
                            enregistrer
                        </SubmitButton>
                    </form>
                    {error.message != "" && (
                        <InfoLog message={error.message} error={error.isError} />
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
