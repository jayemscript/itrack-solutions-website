import { notFound, redirect } from "next/navigation";

const serviceAnchors: Record<string, string> = {
  "custom-development": "service-custom-development",
  "customize-system": "service-custom-development",
  "web-development": "service-custom-development",
  "mobile-apps": "service-mobile-apps",
  migration: "service-migration",
  "legacy-migration": "service-migration",
  consultation: "service-consultation",
  support: "service-support",
  "support-and-maintenance": "service-support",
};

export default async function ServicePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const anchor = serviceAnchors[decodeURIComponent(code)];

  if (!anchor) notFound();
  redirect(`/#${anchor}`);
}
