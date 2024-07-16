import { MutationMask, Placement } from './ReactFiberFlags'
import { HostComponent, HostRoot } from './ReactWorkTags'

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

function getHostParentFiber(fiber) {
  let parent = fiber.return
  while (parent !== null) {
    if (isHostParent(parent)) {
      return parent
    }
    parent = parent.return
  }
  return null
}

function commitPlacement(finishedWork) {
  const parentFiber = getHostParentFiber(finishedWork)
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
