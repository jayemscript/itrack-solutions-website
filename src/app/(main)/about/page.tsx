import { redirect } from "next/navigation";

export default async function AboutPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { section } = await searchParams;
  const requestedSection = Array.isArray(section) ? section[0] : section;
  const anchor =
    requestedSection === "team" || requestedSection === "values"
      ? requestedSection
      : "about";
  redirect(`/#${anchor}`);
}
