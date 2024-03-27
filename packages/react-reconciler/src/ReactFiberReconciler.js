import { createFiberRoot } from './ReactFiberRoot'
import { createUpdate, enqueueUpdate } from './ReactFiberClassUpdateQueue'

export function createContainer(containerInfo) {
  return createFiberRoot(containerInfo)
}

export function updateContainer(element, container) {
  // main render
  const current = container.current
  const update = createUpdate()
  update.payload = { element }

  const root = enqueueUpdate(current, update)
  scheduleUpdateOnFiber(root)
}
