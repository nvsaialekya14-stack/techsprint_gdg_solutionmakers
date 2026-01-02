'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import {
  LayoutDashboard,
  Star,
  BookCopy,
  CalendarCheck,
  ScanLine,
  PenSquare,
  MessageSquare,
  FileText,
  Book,
  ChevronLeft,
} from 'lucide-react'

const menuItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/popular', label: 'Popular & Limited', icon: Star },
  { href: '/books', label: 'Books', icon: BookCopy },
  { href: '/reservations', label: 'Reservations', icon: CalendarCheck },
  { href: '/scan-search', label: 'Scan & Search', icon: ScanLine },
  { href: '/writings', label: 'Writings', icon: PenSquare },
  { href: '/feedback', label: 'Feedback', icon: MessageSquare },
  { href: '/reports', label: 'Reports', icon: FileText },
]

export default function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left">
      <SidebarHeader>
        {/* Header content can be added here if needed */}
      </SidebarHeader>
      <Separator className="my-2" />
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label, side: 'right' }}
                >
                  <a>
                    <item.icon />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <Separator className="my-2" />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
             <SidebarMenuButton tooltip={{ children: 'Collapse', side: 'right' }}>
              <ChevronLeft />
              <span>Collapse</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
