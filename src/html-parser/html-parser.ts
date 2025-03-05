export type ParserOptions = {
  /**
   * include body element
   */
  includeBody?: boolean
  /**
   * include plain text (out of tags)
   */
  includeSolidText?: boolean
  /**
   * recursive parse
   */
  recursive?: boolean
  /**
   * filter html tags by element name
   */
  element?: keyof React.JSX.IntrinsicElements
}

export class HTMLParser {
  /**
   * function to create DOM from html string
   */
  static parseFromString(html: string): Document {
    const parser = new DOMParser()
    return parser.parseFromString(html, 'text/html')
  }

  /**
   * function to traverse html
   */
  private static traverse(node: Node, as: 'string' | 'node', elements: (string | Node)[], options?: ParserOptions) {
    const { includeSolidText, recursive, element } = options || {}

    // if node is element node (e.g. HTML | DIV | P | UL or another)
    if (node.nodeType === Node.ELEMENT_NODE) {
      // collect as Node
      if (as === 'node') {
        // if do need to filter by element
        if (!element) {
          elements.push(node)
          return
        }

        // collect only filtered node
        if ((node as Element).tagName.toLowerCase() === element) {
          elements.push(node)
        }
      } else {
        // collect as string
        const content = (node as Element).outerHTML.trim()
        // if do need to filter by element
        if (!element) {
          elements.push(content)
          return
        }
        // collect only filtered element
        if (content.startsWith(`<${element}`)) {
          elements.push(content)
        }
      }
      // if recursive provided traverse all nodes inside
      if (recursive) {
        for (const child of node.childNodes) {
          this.traverse(child, as, elements, options)
        }
      }
    }
    // collect text nodes
    if (includeSolidText) {
      if (node.nodeType === Node.TEXT_NODE) {
        // collect as Node
        if (as === 'node') {
          elements.push(node)
        } else {
          // collect as plain text
          const content = node.textContent

          if (content) {
            elements.push(content)
          }
        }
      }
    }
  }

  /**
   * function to parse html string
   */
  static parse(
    html: string,
    as: 'string' | 'node' = 'string',
    options?: ParserOptions
  ): { stringNodes: string[]; nodes: Node[] } {
    const { includeBody } = options || {}

    const stringNodes: string[] = []
    const nodes: Node[] = []
    const doc = this.parseFromString(html)

    switch (as) {
      case 'string':
        if (includeBody) {
          this.traverse(doc.body, 'string', stringNodes, options)
        } else {
          for (const child of doc.body.childNodes) {
            this.traverse(child, 'string', stringNodes, options)
          }
        }
        break
      case 'node':
        if (includeBody) {
          this.traverse(doc.body, 'node', nodes, options)
        } else {
          for (const child of doc.body.childNodes) {
            this.traverse(child, 'node', nodes, options)
          }
        }
    }

    return { stringNodes, nodes }
  }

  /**
   * function to count html nodes
   */
  static countElements(html: string, options?: ParserOptions): number {
    const nodes = this.parse(html, 'string', options).stringNodes

    return nodes.length
  }
}
