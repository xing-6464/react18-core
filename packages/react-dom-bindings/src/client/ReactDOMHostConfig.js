import { setInitialProperties } from './ReactDOMComponent'

export function shouldSetTextContent(type, props) {
  return (
    typeof props.children === 'string' || typeof props.children === 'number'
  )
}

export function createTextInstance(content) {
  return document.createTextNode(content)
}

export function createInstance(type) {
  return document.createElement(type)
}

export function appendInitialChild(parentInstance, child) {
  parentInstance.appendChild(child)
}

export function finalizeInitialChildren(domElement, type, props) {
  setInitialProperties(domElement, type, props)
}
