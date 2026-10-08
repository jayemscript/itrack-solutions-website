"use client";

import React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { mainMenus } from "./menus";

const handleSectionClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
) => {
  const url = new URL(href, window.location.origin);
  const section = url.hash.slice(1);

  if (!section || url.pathname !== window.location.pathname) return;

  const element = document.getElementById(section);
  if (!element) return;

  e.preventDefault();
  const headerOffset = 90;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  window.history.pushState(null, "", url.href);
};

export default function HeaderNavDesktop() {
  return (
    <NavigationMenu className="ml-auto">
      <NavigationMenuList className="flex space-x-2">
        {mainMenus.map((item) => (
          <NavigationMenuItem key={item.title}>
            <NavigationMenuLink asChild>
              <Link
                href={item.href}
                onClick={(e) => handleSectionClick(e, item.href)}
                className={cn(
                  navigationMenuTriggerStyle(),
                  "rounded-md bg-white px-3 py-2 font-semibold text-primary transition-colors duration-200 hover:bg-slate-50 hover:text-primary dark:bg-primary dark:text-slate-50 dark:hover:bg-primary dark:hover:text-white",
                )}
              >
                {item.title}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
