
'use client';

import { Shield, Home, Package, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import { useUser } from '@/firebase/provider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const ADMIN_UID = process.env.NEXT_PUBLIC_ADMIN_UID;

function AdminSidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarImage src={user?.photoURL ?? ''} alt={user?.displayName ?? 'Admin'} />
            <AvatarFallback>{user?.displayName?.charAt(0) ?? 'A'}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-semibold text-primary">Admin Panel</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === '/admin'}
              tooltip="Dashboard"
            >
              <Link href="/admin">
                <Shield />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith('/admin/products')}
              tooltip="Products"
            >
              <Link href="/admin/products">
                <Package />
                <span>Products</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Back to site">
                    <Link href="/">
                        <Home />
                        <span>Back to Site</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!ADMIN_UID) {
        console.error("Critical: NEXT_PUBLIC_ADMIN_UID is not set. Admin access is disabled.");
    }
    // If loading is complete and there's no user, redirect to login.
    if (!isUserLoading && !user) {
      router.replace('/login');
    }
  }, [isUserLoading, user, router]);

  // While the authentication state is being determined, show a full-page loader.
  if (isUserLoading) {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-background">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    );
  }

  // After loading, if there's still no user, render null. The useEffect above will handle the redirect.
  if (!user) {
    return null;
  }

  // If the admin UID is not configured or the logged-in user is not the admin, show access denied.
  if (!ADMIN_UID || user.uid !== ADMIN_UID) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-background text-center p-4">
        <Shield className="size-16 text-destructive mb-4" />
        <h1 className="text-2xl font-bold text-foreground">Access Denied</h1>
        <p className="text-muted-foreground mt-2 max-w-md">
          You do not have permission to view this page. Please contact the site administrator if you believe this is an error.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Go to Homepage</Link>
        </Button>
      </div>
    );
  }

  // If the user is authenticated and is the admin, render the admin layout.
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
