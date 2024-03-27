function FiberRootNode(containerInfo) {
  this.containerInfo = containerInfo
}

export function ReactFiberRoot(containerInfo) {
  const root = new FiberRootNode(containerInfo)

  return root
}
