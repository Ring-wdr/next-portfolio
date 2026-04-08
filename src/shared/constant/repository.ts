export const repositoryConfig = {
  url: "https://github.com/Ring-wdr/next-portfolio",
  defaultBranch: "main",
} as const;

export function buildRepositoryBlobUrl(pathname: string) {
  const normalizedPath = pathname.replace(/^\/+/, "");
  return `${repositoryConfig.url}/blob/${repositoryConfig.defaultBranch}/${normalizedPath}`;
}
