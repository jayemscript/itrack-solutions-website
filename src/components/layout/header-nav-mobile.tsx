"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainMenus } from "./menus";

interface HeaderNavMobileProps {
  onNavigate?: () => void;
}

export default function HeaderNavMobile({ onNavigate }: HeaderNavMobileProps) {
  const pathname = usePathname();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const url = new URL(href, window.location.origin);
    const section = url.hash.slice(1);

    if (!section || url.pathname !== pathname) {
      onNavigate?.();
      return;
    }

    const element = document.getElementById(section);
    if (!element) {
      onNavigate?.();
      return;
    }

    e.preventDefault();
    const headerOffset = 140;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    requestAnimationFrame(() => {
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    });
    window.history.pushState({}, "", url.href);
    window.setTimeout(() => onNavigate?.(), 300);
  };

  return (
    <nav aria-label="Main navigation" className="flex w-full flex-col gap-1">
      {mainMenus.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.title}
            href={item.href}
            onClick={(e) => handleClick(e, item.href)}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-white transition-colors hover:bg-primary/20"
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="text-sm font-medium">{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
