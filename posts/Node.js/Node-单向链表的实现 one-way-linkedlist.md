## Node: 单向链表的实现 one-way-linkedlist

```js
/**
 * 1: node + head + null
 * 2: node ---> null
 * 3: size
 *
 * 4: node: next + element
 *
 * 5: 增加 删除 修改 查询 清空
 */

class Node {
  constructor(element, next) {
    this.element = element
    this.next = next
  }
}

class LinkedList {
  constructor(head, size) {
    this.head = null
    this.size = 0
  }
  // 获取指定下标的node
  /**
   * head -> node1 -> node2 -> null
   */
  _getNode(index) {
    if (index < 0 || index >= this.size) {
      throw new Error('Cross the Border.')
    }
    let currentNode = this.head
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next
    }
    return currentNode
  }

  // 没有参数重载, 需要人为的处理调用时参数个数不同的问题
  add(index, element) {
    if (arguments.length == 1) {
      element = index // 元素就是第一个参数
      index = this.size // 下标
    }
    /**
     * head -> node1 -> node2 -> null
     *
     * 添加位置 index = 0:
     *      1: 以前的 head 指向 变成了 newNode 的 next 指向 (保留之前的head指向作为当前 newNode 的 next指向)
     *      2: 然后再让 newNode 指向 原有的head (新的newNode 指向我们原有的 head)
     * 添加位置 指定位置
     *      1:
     *      2:
     */
    if (index < 0 || index > this.size) {
      throw new Error('Cross The Border')
    }
    if (index == 0) {
      let head = this.head // 保存原有的 head
      this.head = new Node(element, head)
    } else {
      // 在非首节点添加的时候,需要找到要添加位置的上一个节点
      let prevNode = this._getNode(index - 1)
      // 上一个 node 指向 newNode
      // newNode指向 原 prevNode的next
      prevNode.next = new Node(element, prevNode.next)
    }
    this.size++
  }

  remove(index) {
    if (index == 0) {
      // 获取第一个
      let head = this.head
      // 让head的下一个元素指向最新的head
      this.head = head.next
    } else {
      let prevNode = this._getNode(index - 1)
      // node1 -> node2 -> node3
      // 删除 node2的时候 就是让 node1 指向 node_3
      prevNode.next = prevNode.next.next
    }
    this.size--
  }

  set(index, element) {
    let toUpdateNode = this._getNode(index)
    toUpdateNode.element = element
  }

  get(index) {
    return this._getNode(index)
  }

  clear() {
    this.head = null
    this.size = 0
  }
}

const l1 = new LinkedList()
l1.add('node1')
l1.add('node2')
l1.add(1, 'node3')
// l1.remove(1)
l1.set(1, 'node_3_update')
// let node1 = l1.get(0)
console.info(l1)
// console.info(node1)
l1.clear()
console.info(l1)

```