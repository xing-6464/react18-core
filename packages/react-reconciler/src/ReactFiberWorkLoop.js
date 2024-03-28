import { scheduleCallback } from 'scheduler'
import { createWorkInProgress } from './reactFiber'

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
  // workLoopSync()
}

function prepareFreshStack(root) {
  workInProgress = createWorkInProgress(root.current, null)
}
