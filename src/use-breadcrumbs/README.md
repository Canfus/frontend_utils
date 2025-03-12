# Hook to generate breadcrumbs from pathname for react

### Configuring parser

You can configure parser by this type

| arg          | type                                  | required | description                                |
|--------------|---------------------------------------|----------|--------------------------------------------|
| `matcher`    | `(breadcrumb: Breadcrumb) => string`  | `false`  | overrides the displayed breadcrumb label   |
| `startsWith` | `number \| string`                    | `false`  | indicates the beginning of the breadcrumbs |
| `endsWith`   | `number \| string`                    | `false`  | indicates the end of the breadcrumbs       |
| `filter`     | `(breadcrumb: Breadcrumb) => boolean` | `false`  | filtering bread crumbs                     |

## Usage with `react`

### Basic usage

```tsx
import { useBreadcrumbs } from './path/to/use-breadcrumbs'

window.location.href = 'http://localhost:5173/first-page/second-page/third-page/current-page'

const App = () => {
  const breadcrumbs = useBreadcrumbs()

  return (
    <div>
      {breadcrumbs.map((breadcrumb) => (
        <a key={breadcrumb.id} href={breadcrumb.path}>{breadcrumb.label}</a>
      ))}
    </div>
  )
}
```
