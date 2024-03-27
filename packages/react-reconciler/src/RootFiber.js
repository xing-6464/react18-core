import { HostRoot } from 'react-reconciler/src/ReactWorkTags'
import { NoFlags } from 'react-reconciler/src/ReactFiberFlags'

export function FiberNode(tag, pendingProps, key) {
  this.tag = tag // tag: fiberNode type
  this.key = key
  this.type = null // type: fiberNode 对应虚拟DOM的类型

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
