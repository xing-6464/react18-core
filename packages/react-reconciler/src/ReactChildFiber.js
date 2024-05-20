import { createFiberFromElement, createFiberFromText } from './ReactFiber'

function createChildReconciler(shouldTrackSideEffects) {
  function reconcileSingleElement(returnFiber, currentFirstChild, element) {
    const created = createFiberFromElement(element)
    created.return = returnFiber

    return created
  }

  function reconcileChildren(returnFiber, currentFirstChild, newChild) {
    if (typeof newChild === 'object' && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return reconcileSingleElement(
            returnFiber,
            currentFirstChild,
            newChild,
          )
        default:
          break
      }
    }
  }

  return reconcileChildren
}

export const mountChildFibers = createChildReconciler(false)
export const reconcileChildFibers = createChildReconciler(true)
