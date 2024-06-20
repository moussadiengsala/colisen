
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


export default async function AuthButton() {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    
    const signOut = async () => {
      "use server";

      const supabase = createClient();
      await supabase.auth.signOut();
      return redirect("auth/signin");
    };

    return user ? (
        <div className="flex items-center gap-4">
          Hey, {user.email}!
          <DropdownMenu>
            <DropdownMenuTrigger>
              
              <DynamicAvatarProfile userid={user.id} />
             
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button asChild>
                  <Link href={`/auth/update-profile?userid=${user.id}`}>update profile</Link>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>Reset Password</DropdownMenuItem>
              <DropdownMenuItem>
                <form action={signOut}>
                  <Button type="submit" className="bg-custom-sky-50 hover:bg-custom-sky-60">
                    Logout
                  </Button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
          <div className='flex gap-2'>
            <Button asChild className='px-4 bg-custom-sky-50 hover:bg-custom-sky-60'>
                <Link href="auth/signin">Connexion</Link>
            </Button>
            <Button asChild className='px-4 hover:bg-custom-dark-40'>
                <Link href="auth/signup">Inscription</Link>
            </Button>
          </div>
    );
}


