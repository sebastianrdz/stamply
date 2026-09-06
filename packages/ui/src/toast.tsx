"use client";

import { Toaster as SonnerToaster } from "sonner";

/** Re-export so app code never imports `sonner` directly — see @stamply/ui/toast. */
export { toast } from "sonner";

/**
 * Themed `<Toaster />` — maps our HSL design tokens (theme.css) onto sonner's
 * own CSS variable names (verified against sonner's dist/styles.css; sonner's
 * types don't enumerate them, they're just `style?: React.CSSProperties`).
 * Mounted once per app root layout.
 */
export function Toaster() {
  return (
    <SonnerToaster
      position="top-center"
      style={
        {
          "--normal-bg": "hsl(var(--card))",
          "--normal-text": "hsl(var(--card-foreground))",
          "--normal-border": "hsl(var(--border))",
          "--success-bg": "hsl(var(--success))",
          "--success-text": "hsl(var(--success-foreground))",
          "--success-border": "hsl(var(--success))",
          "--error-bg": "hsl(var(--destructive))",
          "--error-text": "hsl(var(--destructive-foreground))",
          "--error-border": "hsl(var(--destructive))",
        } as React.CSSProperties
      }
    />
  );
}
