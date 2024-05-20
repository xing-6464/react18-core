import { createFiberFromElement, createFiberFromText } from './ReactFiber'
import { Placement } from './ReactFiberFlags'
import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols'
import isArray from 'shared/isArray'

function createChildReconciler(shouldTrackSideEffects) {
  function reconcileSingleElement(returnFiber, currentFirstChild, element) {
    const created = createFiberFromElement(element)
    created.return = returnFiber

    return created
  }

  function placeChild(newFiber, newIdx) {
    newFiber.index = newIdx
    if (shouldTrackSideEffects) {
      newFiber.flags |= Placement
    }
  }

  function createChild(returnFiber, newChild) {
    if (
      (typeof newChild === 'string' && newChild !== '') ||
      typeof newChild === 'number'
    ) {
      const created = createFiberFromText(`${newChild}`)
      created.return = returnFiber
      return created
    }
    if (typeof newChild === 'object' && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE: {
          const created = createFiberFromElement(newChild)
          created.return = returnFiber
          return created
        }
        default:
          break
      }
    }
    return null
  }

  function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren) {
    let resultingFirstChild = null
    let previousNewFiber = null
    let newIdx = 0
    for (; newIdx < newChildren.length; newIdx++) {
      const newFiber = createChild(returnFiber, newChildren[newIdx])
      if (newFiber === null) continue
      placeChild(newFiber, newIdx)
      if (previousNewFiber === null) {
        resultingFirstChild = newFiber
      } else {
        previousNewFiber.sibling = newFiber
      }
      previousNewFiber = newFiber
    }
    return resultingFirstChild
  }

  function placeSingleChild(newFiber) {
    if (shouldTrackSideEffects) {
      newFiber.flags |= Placement
    }
    return newFiber
  }

  function reconcileChildren(returnFiber, currentFirstChild, newChild) {
    if (typeof newChild === 'object' && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return placeSingleChild(
            reconcileSingleElement(returnFiber, currentFirstChild, newChild),
          )
        default:
          break
      }
    }
    if (isArray(newChild)) {
      return reconcileChildrenArray(returnFiber, currentFirstChild, newChild)
    }
  }

  return reconcileChildren
}

export const mountChildFibers = createChildReconciler(false)
export const reconcileChildFibers = createChildReconciler(true)
