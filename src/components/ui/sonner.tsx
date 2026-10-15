"use client";

import { useTheme } from "next-themes";
import type * as React from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

function Toaster(props: ToasterProps) {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      // On phones toasts would land on the tab bar, so they lift above it and
      // the home indicator.
      mobileOffset={{
        bottom: "calc(var(--spacing-tab-bar) + env(safe-area-inset-bottom) + 8px)",
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "14px",
        } as React.CSSProperties
      }
      {...props}
    />
  );
}

export { Toaster };
