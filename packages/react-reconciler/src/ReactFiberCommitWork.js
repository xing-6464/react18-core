import { appendInitialChild } from 'react-dom-bindings/src/client/ReactDOMHostConfig'
import { MutationMask, Placement } from './ReactFiberFlags'
import { HostComponent, HostRoot, HostText } from './ReactWorkTags'

import {
  appendInitialChild,
  insertBefore,
} from 'react-dom-bindings/src/client/ReactDOMHostConfig'

function recursivelyTraverMutationEffect(root, parentFiber) {
  if (parentFiber.subtreeFlags & MutationMask) {
    let { child } = parentFiber
    while (child !== null) {
      commitMutationEffects(child, root)
      child = child.sibling
    }
  }
}

function commitReconciliationEffects(finishedWork) {
  const { flags } = finishedWork

  if (flags & Placement) {
    commitPlacement(finishedWork)
  }
}

function isHostParent(fiber) {
  return fiber.tag === HostComponent || fiber.tag === HostRoot
}

function getHostParentFiber(fiber) {
  let parent = fiber.return
  while (parent !== null) {
    if (isHostParent(parent)) {
      return parent
    }
    parent = parent.return
  }
}

function getHostSibling(fiber) {
  let sibling = fiber
  sibling: while (true) {
    while (node.sibling === null) {
      if (node.return === null || isHostParent(node.return)) {
        return null
      }
      node = node.return
    }
    node = node.sibling
    while (node.tag !== HostComponent && node.tag !== HostText) {
      if (node.flags & Placement) {
        continue sibling
      } else {
        node = node.child
      }
    }
    if (node.flags & Placement) {
      return node.stateNode
    }
  }
}

function insertOrAppendPlacementNode(node, before, parent) {
  const { tag } = node
  const isHost = tag === HostComponent || tag === HostText
  if (isHost) {
    const { stateNode } = node
    if (before) {
      insertBefore(parent, stateNode, before)
    } else {
      appendInitialChild(parent, stateNode)
    }
  } else {
    const { child } = node
    if (child !== null) {
      insertOrAppendPlacementNode(child, before, parent)
      let { sibling } = child
      while (sibling !== null) {
        insertOrAppendPlacementNode(sibling, before, parent)
        sibling = sibling.sibling
      }
    }
  }
}

function commitPlacement(finishedWork) {
  const parentFiber = getHostParentFiber(finishedWork)

  switch (parentFiber.tag) {
    case HostRoot: {
      const parent = parentFiber.stateNode.containerInfo
      const before = getHostSibling(finishedWork)
      insertOrAppendPlacementNode(finishedWork, before, parent)
      break
    }
    case HostComponent: {
      const parent = parentFiber.stateNode
      const before = getHostSibling(finishedWork)
      insertOrAppendPlacementNode(finishedWork, before, parent)
      break
    }
  }
}

export function commitMutationEffects(finishedWork, root) {
  switch (finishedWork.tag) {
    case HostRoot:
    case HostComponent:
    case HostText: {
      recursivelyTraverMutationEffect(root, finishedWork)
      commitReconciliationEffects(finishedWork)
    }
  }
}
