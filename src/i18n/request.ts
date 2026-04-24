import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value as "en" | "es" | "zh") ?? "en";
  const supported = ["en", "es", "zh"] as const;
  const resolved = supported.includes(locale) ? locale : "en";

  return {
    locale: resolved,
    messages: (await import(`../../messages/${resolved}.json`)).default,
  };
});
