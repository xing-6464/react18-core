import { createFiberRoot } from './ReactFiberRoot'

export function createContainer(containerInfo) {
  return createFiberRoot(containerInfo)
}

export function updateContainer(element, container) {
  // main render
}