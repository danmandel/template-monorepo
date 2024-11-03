'use client';
import {
  Atom,
  BookOpen,
  Bot,
  CircleUserRound,
  Command,
  Frame,
  Home,
  LayoutDashboardIcon,
  LayoutGrid,
  LifeBuoy,
  Map,
  PieChart,
  Search,
  Send,
  Settings2,
  SquareTerminal,
  Store,
} from 'lucide-react';
import * as React from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { auth } from '@/lib/firebase';
import { useFbUserOrGuest } from '@/modules/User/hooks';
import { project } from '@/project';

const data = {
  user: {
    // name: 'Dan',
    email: 'danmandel@gmail.com',
    displayName: 'Dan94',
    photoURL: '/avatars/default_avatar.png',
  },
  guest: {
    name: 'Guest',
    email: 'guest@gmail.com',
    displayName: 'Guest314159',
    photoURL: '/avatars/guest.jpg',
  },
  navMain: [
    {
      title: 'Home',
      url: '/home',
      icon: Home,
    },
    {
      title: 'Projects',
      url: '/projects',
      icon: LayoutGrid,
    },
    {
      title: 'About',
      url: '/about',
      icon: Home,
    },
    {
      title: 'Store',
      url: '/store',
      icon: Store,
    },
    {
      title: 'Contact',
      url: '/contact',
      icon: Home,
    },
    // {
    //   title: 'Dashboard',
    //   url: '/dashboard',
    //   icon: LayoutDashboardIcon,
    //   isActive: true,
    // },
    // {
    //   title: 'Explore',
    //   url: '/explore',
    //   icon: Search,
    // },
    // {
    //   title: 'Account',
    //   url: '#',
    //   icon: CircleUserRound,
    //   items: [
    //     {
    //       title: 'Inventory',
    //       url: '#',
    //     },
    //     {
    //       title: 'History',
    //       url: '#',
    //     },
    //     {
    //       title: 'Inbox',
    //       url: '#',
    //     },
    //     {
    //       title: 'Friends',
    //       url: '#',
    //     },
    //     {
    //       title: 'Favorites',
    //       url: '#',
    //     },
    //   ],
    // },
    // {
    //   title: 'Documentation',
    //   url: '#',
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: 'Introduction',
    //       url: '#',
    //     },
    //     {
    //       title: 'Get Started',
    //       url: '#',
    //     },
    //     {
    //       title: 'Tutorials',
    //       url: '#',
    //     },
    //     {
    //       title: 'Changelog',
    //       url: '#',
    //     },
    //   ],
    // },
    // {
    //   title: 'Settings',
    //   url: '#',
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: 'General',
    //       url: '#',
    //     },
    //     {
    //       title: 'Team',
    //       url: '#',
    //     },
    //     {
    //       title: 'Billing',
    //       url: '#',
    //     },
    //     {
    //       title: 'Limits',
    //       url: '#',
    //     },
    //     {
    //       title: 'Security',
    //       url: '#',
    //     },
    //   ],
    // },
  ],
  navSecondary: [
    {
      title: 'Support',
      url: '#',
      icon: LifeBuoy,
    },
    {
      title: 'Feedback',
      url: '#',
      icon: Send,
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
};

export const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const { user } = useFbUserOrGuest();

  return (
    <Sidebar variant='inset' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <a href='#'>
                <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                  <Atom className='size-4' />
                </div>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>{project.title}</span>
                  <span className='truncate text-xs'>{project.subtitle}</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <NavUser user={user} />
            </SidebarMenuButton>
          </SidebarMenuItem>
          {/* <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <NavUser user={data.user} />
            </SidebarMenuButton>
          </SidebarMenuItem> */}
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        <NavSecondary items={data.navSecondary} className='mt-auto' />
      </SidebarContent>
      {/* <SidebarFooter><NavUser user={data.user} /></SidebarFooter> */}
    </Sidebar>
  );
};
