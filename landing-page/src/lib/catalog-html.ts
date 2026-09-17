const ALLOWED_TAGS = "p|br|strong|b|em|i|u|s|ul|ol|li|h3|h4|blockquote|a";

export function sanitizeCatalogHtml(value: string | null | undefined): string {
  if (!value) return "";

  const allowedTagPattern = new RegExp(
    `<\\/?(?!(?:${ALLOWED_TAGS})(?:\\s|\\/?>))[^>]+>`,
    "gi",
  );

  return value
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\/?(script|style|iframe|object|embed|form|noscript)[^>]*>/gi, "")
    .replace(allowedTagPattern, "")
    .replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/\s(?:href|src)\s*=\s*(?:"\s*javascript:[^"]*"|'\s*javascript:[^']*'|[^\s>]*javascript:[^\s>]*)(?=\s|>)/gi, "")
    .replace(/\s(?:style|class|id|target|rel)\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "");
}
