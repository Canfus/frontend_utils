import { Fragment, useEffect, useState } from 'react'
import type { ParserOptions } from './base-html-parser'
import { ReactHTMLParser } from './react-html-parser'

type HTMLRendererProps = {
  html: string
  options?: ParserOptions
  as?: keyof React.JSX.IntrinsicElements
}

type AsyncRenderProps = {
  promises: Promise<React.ReactNode[]>
}

const AsyncRender = ({ promises }: AsyncRenderProps) => {
  const [nodes, setNodes] = useState<React.ReactNode[]>([])

  useEffect(() => {
    const resolve = async () => {
      setNodes(await promises)
    }

    resolve()
  }, [promises])

  return <>{nodes}</>
}

export const HTMLRenderer = ({ html, options, as }: HTMLRendererProps) => {
  const Wrapper = as ?? Fragment

  const nodes = ReactHTMLParser.toReactNodes(html, options)

  return (
    <Wrapper>
      <AsyncRender promises={nodes} />
    </Wrapper>
  )
}
