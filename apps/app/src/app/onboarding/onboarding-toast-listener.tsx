"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "@stamply/i18n/provider";
import { toast } from "@stamply/ui/toast";

/**
 * Fires the "business deleted" toast for `?deleted=1` (set when
 * deleteBusiness redirects here because the owner had no other business
 * left), then strips it via `router.replace`. `add` is a distinct, unrelated
 * param this page already reads server-side — left untouched.
 */
function OnboardingToastListenerInner() {
  const dict = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams.has("deleted")) return;

    toast.success(dict.dashboard.toasts.businessDeleted);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("deleted");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }, [searchParams, pathname, router, dict]);

  return null;
}

export function OnboardingToastListener() {
  return (
    <Suspense>
      <OnboardingToastListenerInner />
    </Suspense>
  );
}
