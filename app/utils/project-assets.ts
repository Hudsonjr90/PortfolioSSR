const projectAssets = (import.meta as ImportMeta & {
  glob<T>(
    pattern: string,
    options: { eager: true; import: 'default' },
  ): Record<string, T>
}).glob<string>(
  '../assets/images/**/*.{png,jpg,jpeg,webp,gif,svg}',
  {
    eager: true,
    import: 'default',
  },
)

export function resolveProjectAsset(path: string | null) {
  if (!path) return ''
  if (/^(https?:)?\/\//i.test(path) || path.startsWith('/')) return path

  const normalizedPath = path.replace(/^\.?\//, '')
  return projectAssets[`../assets/images/${normalizedPath}`] ?? path
}