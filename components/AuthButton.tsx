
import { createClient } from "@/utils/supabase/server";
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
import getAvatarProfile from "@/lib/get-user-profile";
import DynamicAvatarProfile from "./ui/DynamicAvatarProfile";


export default async function AuthButton({ isMobile }: {isMobile: boolean}) {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    // console.log(user);
    const signOut = async () => {
      "use server";

      const supabase = createClient();
      await supabase.auth.signOut();
      return redirect("auth/signin");
    };

    return user ? (
        <div className="flex items-center gap-4">
          {!isMobile ?
            (<DropdownMenu>
              <DropdownMenuTrigger className="flex justify-center items-center gap-2">
                <span>Hey, <strong>{user.user_metadata.first_name} {user.user_metadata.last_name}</strong>!</span>
                <DynamicAvatarProfile userid={user.id} />  
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button asChild>
                    <Link href={`/update-profile?userid=${user.id}`}>update profile</Link>
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
                <span>Hey, <strong>{user.user_metadata.first_name} {user.user_metadata.last_name}</strong>!</span>
                <DynamicAvatarProfile userid={user.id} />
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                <Button asChild className="w-full px-4">
                  <Link href={`/auth/update-profile?userid=${user.id}`}>update profile</Link>
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


