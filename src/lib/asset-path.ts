const siteBasePath = process.env.NODE_ENV === "production" ? "/Broadside" : "";

export function assetPath(path: string) {
  return `${siteBasePath}${path}`;
}
