export type Breadcrumb = {
  id: string
  index: number
  path: string
  label: string
}

type PathMatcher = (breadcrumb: Breadcrumb) => string

export type UseBreadcrumbsOptions = {
  /**
   * include root page
   * @default true
   */
  rootEnabled?: boolean
  /**
   * overrides the displayed breadcrumb
   * @default undefined
   */
  matcher?: PathMatcher
  /**
   * indicates the beginning of the breadcrumbs
   * @typeParam string - path name
   * @typeParam number - path index
   * @default undefined
   */
  startsWith?: number | string
  /**
   * indicates the end of the breadcrumbs
   * @typeParam string - path name
   * @typeParam number - path index
   * @default undefined
   */
  endsWith?: number | string
  /**
   * filter breadcrumbs
   * @param breadcrumb
   * @default undefined
   */
  filter?: (breadcrumb: Breadcrumb) => boolean
}
