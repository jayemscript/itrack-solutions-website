import { notFound, redirect } from "next/navigation";

const serviceCodes = new Set([
  "custom-development",
  "customize-system",
  "web-development",
  "mobile-apps",
  "migration",
  "legacy-migration",
  "consultation",
  "support",
  "support-and-maintenance",
]);

export default async function ServicePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const serviceCode = decodeURIComponent(code);

  if (!serviceCodes.has(serviceCode)) notFound();
  redirect("/#services");
}
