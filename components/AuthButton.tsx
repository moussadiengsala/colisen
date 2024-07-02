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

type AuthButtonProps = {
  data: {
    user: User | undefined,
    isLoading: boolean,
    isError: boolean,
  }, 
  isMobile: boolean
}
export default function AuthButton({ isMobile, data }: AuthButtonProps) {
    const {user, isLoading, isError} = data;

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
        {!isMobile ?
          (<DropdownMenu>
            <DropdownMenuTrigger className="flex justify-center items-center gap-2">
              <span>Hey, <strong>{user.profile.first_name} {user.profile.last_name}</strong>!</span>
              <DynamicAvatarProfile avatar_url={user.profile.avatar_url} />  
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button asChild>
                  <Link href={`/update-profile?userid=${user.profile.id}`}>update profile</Link>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <form action={signOut} className="w-full">
                  <Button type="submit" className="w-full bg-custom-sky-50 hover:bg-custom-sky-60">
                    Logout
                  </Button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>) :
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="flex justify-center items-center space-x-2">
              <span>Hey, <strong>{user.profile.first_name} {user.profile.last_name}</strong>!</span>
              <DynamicAvatarProfile avatar_url={user.profile.avatar_url} />
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <Button asChild className="w-full px-4">
                <Link href={`/auth/update-profile?userid=${user.profile.id}`}>update profile</Link>
              </Button>
              <form action={signOut} className="w-full">
                <Button type="submit" className="w-full px-4 bg-custom-sky-50 hover:bg-custom-sky-60">
                  Logout
                </Button>
              </form>
            </div>
          </div>
        }
      </div>
    ) : (
        <div className='flex flex-col gap-2 tablet:flex-row'>
          <Button asChild className='px-4 bg-custom-sky-50 hover:bg-custom-sky-60'>
              <Link href="auth/signin">Connexion</Link>
          </Button>
          <Button asChild className='px-4 hover:bg-custom-dark-40'>
              <Link href="auth/signup">Inscription</Link>
          </Button>
        </div>
  );
}


