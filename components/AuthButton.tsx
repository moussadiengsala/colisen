"use client"
import { getSupabaseBrowserClient } from "@/utils/supabase/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DynamicAvatarProfile from "./ui/DynamicAvatarProfile";
import { useEffect } from "react";
import useUserQuery from "@/hooks/use-user";
import { Skeleton } from "@/components/ui/skeleton"
import { User } from "@/types/user";
import { SubmitButton } from "./ui/submit-button";

type AuthButtonProps = { isMobile: boolean }

export default function AuthButton({ isMobile }: AuthButtonProps) {

    const { 
        data: user, 
        isLoading, 
        isError 
    } = useUserQuery();
  
    const signOut = async () => {
      const supabase = getSupabaseBrowserClient();
      await supabase.auth.signOut();
      return redirect("auth/signin");
    };

    return isLoading ? (
        <div className="flex justify-center items-center gap-2">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full" />
        </div>
    ) : user ? (
      <div className="flex items-center gap-4">

        <div className="hidden tablet:block">
          <DropdownMenu>
              <DropdownMenuTrigger className="flex justify-center items-center gap-2">
                <span>Hey, <strong>{user.profile.first_name} {user.profile.last_name}</strong>!</span>
                <DynamicAvatarProfile avatar_url={user.profile.avatar_url} />  
              </DropdownMenuTrigger>
              <DropdownMenuContent className="my-5 tablet:flex flex-col hidden">
                <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex-1">
                  <Button asChild className="w-full bg-blue-900 hover:bg-blue-800 font-bold">
                    <Link href={`/update-profile?userid=${user.profile.id}`} >update profile</Link>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex-1">
                  <form className="w-full">
                    <SubmitButton formAction={signOut} pendingText="Déconexion..." className="h-10 w-full">
                      Déconncter
                    </SubmitButton>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
          
          <div className="flex flex-col justify-center items-center gap-2 tablet:hidden">
            <div className="flex justify-center items-center space-x-2">
              <span>Hey, <strong>{user.profile.first_name} {user.profile.last_name}</strong>!</span>
              <DynamicAvatarProfile avatar_url={user.profile.avatar_url} />
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <Button asChild className="w-full px-4 font-bold bg-blue-900 hover:bg-blue-800">
                <Link href={`/auth/update-profile?userid=${user.profile.id}`}>update profile</Link>
              </Button>
              <form className="w-full">
                <SubmitButton formAction={signOut} pendingText="Déconexion..." className="w-full h-10 text-sm">
                  Déconncter
                </SubmitButton>
              </form>
            </div>
          </div>
        
      </div>
    ) : (
        <div className='flex flex-col gap-2 tablet:flex-row'>
          <Button asChild className='px-4 bg-blue-900 hover:bg-blue-800 font-bold'>
              <Link href="/auth/signin">Connexion</Link>
          </Button>
          <Button asChild className='px-4 hover:bg-custom-dark-40 font-bold'>
              <Link href="/auth/signup">Inscription</Link>
          </Button>
        </div>
  );
}


