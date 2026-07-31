'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import {
  homeSubMenus,
  servicesSubMenus,
  productSubMenus,
  aboutSubMenus,
} from './menus';

// Smooth-scroll to a section without putting a hash in the URL.
const handleSectionClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
) => {
  const url = new URL(href, window.location.origin);
  const section = url.searchParams.get('section');
  const isSectionLink = Boolean(section);

  if (isSectionLink) {
    e.preventDefault();
    const element = document.getElementById(section!);

    if (element) {
      const headerOffset = 75;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      window.history.pushState(null, '', url.pathname);
    } else {
      window.location.assign(url.pathname);
    }
  }
};

// --- Main Navigation ---
export default function HeaderNavDesktop() {
  const pathname = usePathname();

  return (
    <NavigationMenu className="ml-auto">
      <NavigationMenuList className="flex space-x-2">
        {[
          { title: 'Home', items: homeSubMenus },
          { title: 'Services', items: servicesSubMenus },
          { title: 'Products', items: productSubMenus },
          { title: 'About', items: aboutSubMenus },
        ].map((menu) => (
          <NavigationMenuItem key={menu.title}>
            <NavigationMenuTrigger
              onClick={(e) => e.preventDefault()}
              className="
                bg-white font-semibold
                text-primary hover:bg-slate-50 hover:text-primary
                data-state-open:bg-slate-50 data-state-open:text-primary
                dark:bg-primary dark:text-slate-50 dark:hover:bg-primary dark:hover:text-white
                dark:data-state-open:bg-primary dark:data-state-open:text-white
                transition-colors duration-200 rounded-md px-3 py-2
              "
            >
              {menu.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-96 gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {menu.items.map((item) => (
                  <ListItem
                    key={item.title}
                    title={item.title}
                    href={item.href}
                    icon={item.icon}
                  >
                    {item.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}

        {/* Contact - no submenu */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/contact"
              className={cn(
                navigationMenuTriggerStyle(),
                'bg-white text-primary hover:bg-slate-50 hover:text-primary data-state-open:bg-slate-50 data-state-open:text-primary dark:bg-primary dark:text-slate-50 dark:hover:bg-primary dark:hover:text-white dark:data-state-open:bg-primary dark:data-state-open:text-white rounded-md px-3 py-2 font-semibold',
              )}
            >
              Contact
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

// --- Submenu List Item ---
const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & {
    title: string;
    icon?: React.ElementType;
  }
>(({ className, title, children, href, icon: Icon, ...props }, ref) => {
  const pathname = usePathname();
  const section = href ? new URL(href, 'http://localhost').searchParams.get('section') : null;
  const isSectionLink = Boolean(section);

  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={href || '/'}
          onClick={(e) => {
            if (href) {
              // Scroll locally when the target section belongs to this page.
              if (new URL(href, window.location.origin).pathname === pathname && isSectionLink) {
                handleSectionClick(e, href);
              }
              // Otherwise, Next.js Link will handle routing normally
            }
          }}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/10 dark:hover:bg-primary/20',
            className,
          )}
          // SEO: Use prefetch for better performance
          prefetch={!isSectionLink}
          {...props}
        >
          <div className="flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4 text-primary dark:text-white" />}
            <div className="text-sm font-medium leading-none text-primary dark:text-white">
              {title}
            </div>
          </div>
          {children && (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground dark:text-muted-foreground">
              {children}
            </p>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
