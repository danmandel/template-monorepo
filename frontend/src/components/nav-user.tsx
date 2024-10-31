'use client';

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogIn,
  LogOut,
  Moon,
  Sparkles,
  SunMoon,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { AuthDialog } from './auth/auth-dialog';
import firebase from 'firebase/auth';
import { auth } from '@/lib/firebase';

const signOut = async () => {
  try {
    await auth.signOut();
    // TODO: signout auth event
  } catch (error) {
    console.error('Error signing out: ', error);
  }
};

export const NavUser = ({ user }: { user: Partial<firebase.User> | null | undefined }) => {
  const { isMobile } = useSidebar();

  const isLoggedIn = !!user;
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const { setTheme, theme } = useTheme();
  const isDarkMode = theme === 'dark';
  console.log({ isDarkMode, theme });

  if (!user)
    user = {
      // name: 'Guest',
      email: 'guest@gmail.com',
      displayName: 'Guest314159',
      photoURL: '/avatars/guest.jpg',
    };

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size='lg'
                className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
              >
                <Avatar className='size-8 rounded-lg'>
                  <AvatarImage src={user.photoURL || ''} alt={user.displayName || ''} />
                  <AvatarFallback className='rounded-lg'>CN</AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>{user.displayName}</span>
                  <span className='truncate text-xs'>@{'user.displayName'}</span>
                </div>
                <ChevronsUpDown className='ml-auto size-4' />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
              side={isMobile ? 'bottom' : 'right'}
              align='end'
              sideOffset={4}
            >
              <DropdownMenuLabel className='p-0 font-normal'>
                <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                  <Avatar className='size-8 rounded-lg'>
                    <AvatarImage src={user.photoURL || ''} alt={'user.name'} />
                    <AvatarFallback className='rounded-lg'>CN</AvatarFallback>
                  </Avatar>
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <span className='truncate font-semibold'>{user.displayName}</span>
                    <span className='truncate text-xs'>@{user.displayName + '2'}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                {isDarkMode ? <SunMoon /> : <Moon />}
                Enable {isDarkMode ? 'Light' : 'Dark'} Mode
              </DropdownMenuItem>

              {isLoggedIn ? (
                <>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Sparkles />
                      Upgrade to Pro
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <BadgeCheck />
                      Account
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bell />
                      Notifications
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut />
                    Log out
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem onClick={() => setIsAuthOpen(true)}>
                  <LogIn />
                  Sign In / Register
                  {/* TODO: Make these separate buttons that affect which tab is opened */}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <AuthDialog isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};
