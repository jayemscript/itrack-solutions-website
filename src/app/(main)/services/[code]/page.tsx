import { notFound } from "next/navigation";
import {
  ConsultationServicePage,
  CustomDevelopmentPage,
  MigrationServicePage,
  MobileAppsPage,
  SupportMaintenanceServicePage,
} from "@/components/services";

const servicePages = {
  "custom-development": CustomDevelopmentPage,
  "customize-system": CustomDevelopmentPage,
  "web-development": CustomDevelopmentPage,
  "mobile-apps": MobileAppsPage,
  migration: MigrationServicePage,
  "legacy-migration": MigrationServicePage,
  consultation: ConsultationServicePage,
  support: SupportMaintenanceServicePage,
  "support-and-maintenance": SupportMaintenanceServicePage,
};

export default async function ServicePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const Page = servicePages[decodeURIComponent(code) as keyof typeof servicePages];

  if (!Page) notFound();
  return <Page />;
}
