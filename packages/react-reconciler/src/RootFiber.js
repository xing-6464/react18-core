export function FiberNode(tag, pendingProps, key) {
  this.tag = tag
  this.key = key
  this.type = null

  this.stateNode = null
  this.return = null
  this.pendingProps = pendingProps
  this.memoizedProps = null
  this.memoizedState = null
  this.updateQueue = null
  this.flags = NoFlags
  this.subtreeFlags = NoFlags
  this.alternate = null
  this.index = 0
}

export function createFiber(tag, pendingProps, key) {
  return new FiberNode(tag, pendingProps, key)
}
export function createHostRootFiber() {
  return createFiber(HostRoot, null, null)
}
