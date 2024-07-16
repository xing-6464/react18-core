import { NoFlags } from './ReactFiberFlags'
import { HostRoot, HostComponent, HostText } from './ReactWorkTags'
import {
  createTextInstance,
  createInstance,
  finalizeInitialChildren,
  appendInitialChild,
} from 'react-dom-bindings/src/client/ReactDOMHostConfig'

/**
 * 挂载子节点
 * @param {*} parent 真实DOM节点
 * @param {*} workInProgress 当前fiber节点
 */
function appendAllChildren(parent, workInProgress) {
  let node = workInProgress.child
  while (node) {
    if (node.tag === HostComponent || HostText) {
      appendInitialChild(parent, node.stateNode)
    } else if (node.child !== null) {
      node = node.child
      continue
    }
    if (node === workInProgress) {
      return
    }
    // 找兄弟节点
    while (node.sibling === null) {
      if (node.return === null || node.return === workInProgress) {
        return
      }
      node = node.return
    }
    node = node.sibling
  }
}

/**
 *
 * @param {*} current old fiber
 * @param {*} workInProgress new fiber
 */
export function completeWork(current, workInProgress) {
  const newProps = workInProgress.pendingProps
  switch (workInProgress.tag) {
    case HostRoot:
      bubbleProperties(workInProgress)
      break
    case HostComponent:
      const { type } = workInProgress
      const instance = createInstance(type, newProps, workInProgress)
      appendAllChildren(instance, workInProgress)
      workInProgress.stateNode = instance
      finalizeInitialChildren(instance, type, newProps)
      bubbleProperties(workInProgress)
      break
    case HostText:
      const newText = newProps
      workInProgress.stateNode = createTextInstance(newText)
      bubbleProperties(workInProgress)
      break
  }
}

/**
 * 属性冒泡、把子节点的属性都传递给父节点
 * @param {*} fiber
 */
function bubbleProperties(fiber) {
  let subtreeFlags = NoFlags
  let child = fiber.child
  while (child !== null) {
    subtreeFlags |= child.subtreeFlags
    subtreeFlags |= child.flags
    child = child.sibling
  }
  fiber.subtreeFlags = subtreeFlags
}
