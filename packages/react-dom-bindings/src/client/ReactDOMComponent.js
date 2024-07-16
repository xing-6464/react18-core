import { setValueForStyle } from './CSSPropertyOperations'
import { setTextContent } from './setTextContent'
import { setValueForProperty } from './DOMPropertyOperations'

export function setInitialProperties(domElement, tag, props) {
  setInitialDOMProperties(tag, domElement, props)
}

export function setInitialDOMProperties(tag, domElement, props) {
  for (const propKey in props) {
    if (props.hasOwnProperty(propKey)) {
      const nextProp = props[propKey]
      if (propKey === 'style') {
        setValueForStyle(domElement, nextProp)
      } else if (propKey === 'children') {
        if (typeof nextProp === 'string' || typeof nextProp === 'number') {
          setTextContent(domElement, `${nextProp}`)
        }
      } else {
        setValueForProperty(domElement, propKey, nextProp)
      }
    }
  }
}
