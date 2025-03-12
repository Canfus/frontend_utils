# HTML parser for react

This code will generate react components from html string

The parser will skip all `script` elements to prevent security issues and XSS attacks.

### Configuring parser

You can configure parser by this type

| arg                | type                | required | description                            |
|--------------------|---------------------|----------|----------------------------------------|
| `includeBody`      | `boolean`           | `false`  | include HTMLBodyElement node           |
| `includeSolidText` | `boolean`           | `false`  | include Text node                      |
| `recursive`        | `boolean`           | `false`  | recursive parsing to infer child nodes |
| `element`          | `IntrinsicElements` | `false`  | filter results by tag name             |

```tsx
const html = `
  <script>alert('Hello world')</script>
  <p class="text-dark">
    Пупа и 
    <a href="http://localhost:5173/" target="_blank" rel="noopener noreferrer" class="underline">
      Лупа
    </a>
  </p>
  <p class="text-dark">
    <a href="http://localhost:5173/" target="_blank" rel="noopener noreferrer" class="underline">
      Лупа
    </a>
    и Пупа
  </p>
`.trim()
```

## Usage with `react`

### Basic usage

```tsx
import { HTMLRenderer } from './path/to/html-parser'

const App = () => {
  return (
    <HTMLRenderer html={html} />
  )
}
```

### With wrapped by container

```tsx
import { HTMLRenderer } from './path/to/html-parser'

const App = () => {
  return (
    <HTMLRenderer html={html} as='div' />
  )
}
```

## Usage with vanilla `js`

```ts
import { HTMLParser } from 'path/to/html-parser'

// if you need to get nodes as Node
// it will returns [HTMLParagraphElement, HTMLParagraphElement]
const as: 'node' | 'string' = 'node'
// if you need to get nodes as string
// it will returns ['<p class="text-dark">...</p>', '<p class="text-dark">...</p>']
const as: 'node' | 'string' = 'string'

const { stringNodes, nodes } = await HTMLParser.parse(html, as, options)
console.log(stringNodes, nodes)
```

## Usage with Node.js environment

```ts
import { NodeHTMLParser } from 'path/to/html-parser'

// if you need to get nodes as Node
// it will returns [HTMLParagraphElement, HTMLParagraphElement]
const as: 'node' | 'string' = 'node'
// if you need to get nodes as string
// it will returns ['<p class="text-dark">...</p>', '<p class="text-dark">...</p>']
const as: 'node' | 'string' = 'string'

const { stringNodes, nodes } = await NodeHTMLParser.parse(html, as, options)
console.log(stringNodes, nodes)
```
