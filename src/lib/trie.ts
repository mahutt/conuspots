import type { Location } from './types'

class TrieNode {
  children: { [key: string]: TrieNode } = {}
  isEndOfWord = false
  location?: Location

  constructor() {
    this.children = {}
    this.isEndOfWord = false
  }
}

export class Trie {
  root: TrieNode
  constructor() {
    this.root = new TrieNode()
  }

  insert(location: Location) {
    let current = this.root

    for (const char of location.name.toLowerCase()) {
      if (!current.children[char]) {
        current.children[char] = new TrieNode()
      }
      current = current.children[char]
    }

    current.isEndOfWord = true
    current.location = location
  }

  search(prefix: string) {
    let current = this.root

    for (const char of prefix.toLowerCase()) {
      if (!current.children[char]) {
        return []
      }
      current = current.children[char]
    }

    const results: Location[] = []
    this._collectWords(current, prefix, results)
    return results
  }

  _collectWords(node: TrieNode, prefix: string, results: Location[]) {
    if (node.isEndOfWord && node.location) {
      results.push(node.location)
    }

    for (const char in node.children) {
      this._collectWords(node.children[char], prefix + char, results)
    }
  }
}
