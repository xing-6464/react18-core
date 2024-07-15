import { scheduleCallback } from 'scheduler'
import { createWorkInProgress } from './ReactFiber'
import { beginWork } from './ReactFiberBeginWork'
import { completeWork } from './ReactFiberCompleteWork'

let workInProgress = null

export function scheduleUpdateOnFiber(root) {
  ensureRootIsScheduled(root)
}

export function ensureRootIsScheduled(root) {
  scheduleCallback(performConcurrentWorkOnRoot.bind(null, root))
}

function performConcurrentWorkOnRoot(root) {
  renderRootSync(root)
  root.finishedWork = root.current.alternate

  // commit
  // commitRoot(root)
}

function renderRootSync(root) {
  prepareFreshStack(root)
  workLoopSync()
}

function prepareFreshStack(root) {
  workInProgress = createWorkInProgress(root.current, null)
}

function workLoopSync() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress)
  }
}

function performUnitOfWork(unitOfWork) {
  const current = unitOfWork.alternate
  const next = beginWork(current, unitOfWork)
  unitOfWork.memoizedProps = unitOfWork.pendingProps

  // workInProgress = null
  if (next === null) {
    completeUnitOfWork(unitOfWork)
  } else {
    workInProgress = next
  }
}

function completeUnitOfWork(unitOfWork) {
  let completedWork = unitOfWork
  do {
    // oldFiber
    const current = completedWork.alternate
    const returnFiber = completedWork.return
    completeWork(current, returnFiber)

    const siblingFiber = completedWork.sibling
    if (siblingFiber !== null) {
      workInProgress = siblingFiber
      return
    }
    completedWork = returnFiber
    workInProgress = completedWork
  } while (completedWork !== null)
}
