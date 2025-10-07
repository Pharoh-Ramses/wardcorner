interface RichTextProps {
  content: any
  className?: string
}

export default function RichText({ content, className = '' }: RichTextProps) {
  if (!content?.root?.children) return null

  return (
    <div className={`rich-text ${className}`}>
      {content.root.children.map((child: any, index: number) => {
        if (child.type === 'paragraph') {
          return (
            <p key={index}>
              {child.children?.map((textChild: any, textIndex: number) => {
                if (textChild.type === 'text') {
                  let text = textChild.text || ''
                  if (textChild.bold) text = <strong key={textIndex}>{text}</strong>
                  if (textChild.italic) text = <em key={textIndex}>{text}</em>
                  return text
                }
                return null
              })}
            </p>
          )
        }
        return null
      })}
    </div>
  )
}
