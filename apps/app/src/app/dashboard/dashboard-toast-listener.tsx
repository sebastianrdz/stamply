"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "@stamply/i18n/provider";
import { interpolate } from "@stamply/i18n/format";
import { toast } from "@stamply/ui/toast";

/**
 * Fires the welcome/joined/deleted toast for `?welcome=1` / `?joined=1` /
 * `?deleted=1` (set by createBusiness / acceptInvitation / deleteBusiness),
 * then strips just those params via `router.replace`. `businessName` is
 * passed in from the server (membership.business.name) rather than read from
 * the URL — putting the business name in the query string would be spoofable.
 */
function DashboardToastListenerInner({
  businessName,
}: {
  businessName: string;
}) {
  const dict = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const welcome = searchParams.has("welcome");
    const joined = searchParams.has("joined");
    const deleted = searchParams.has("deleted");
    if (!welcome && !joined && !deleted) return;

    if (welcome) toast.success(dict.dashboard.toasts.businessCreated);
    else if (joined)
      toast.success(
        interpolate(dict.dashboard.toasts.teamJoined, {
          business: businessName,
        }),
      );
    else if (deleted) toast.success(dict.dashboard.toasts.businessDeleted);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("welcome");
    params.delete("joined");
    params.delete("deleted");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }, [searchParams, pathname, router, dict, businessName]);

  return null;
}

export function DashboardToastListener({
  businessName,
}: {
  businessName: string;
}) {
  return (
    <Suspense>
      <DashboardToastListenerInner businessName={businessName} />
    </Suspense>
  );
}
