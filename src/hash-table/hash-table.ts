type Primitive = string | number | symbol | bigint

class HashEntry<Key extends Primitive, Value = any> {
  constructor(
    public key: Key,
    public value: Value
  ) {}
}

class HashTable<Key extends Primitive, Value> {
  constructor(private _size: number = 16) {}

  private _count: number = 0
  private _loadFactor: number = 0.75
  private _table = Array.from({ length: this._size }, () => [] as HashEntry<Key, Value>[])

  private _hash(key: Key): number {
    const prime = 0x1f
    const k = String(key)
    let hashSum = 0

    for (let i = 0; i < k.length; i += 1) {
      hashSum = (hashSum * prime + k.charCodeAt(i)) | 0
    }

    return hashSum % this._size
  }

  private _resize() {
    const old = this._table
    this._size *= 2
    this._table = Array.from({ length: this._size }, () => [])
    this._count = 0

    old.forEach((bucket) => {
      bucket.forEach(({ key, value }) => {
        this.put(key, value)
      })
    })
  }

  public get(key: Key): Value | null {
    const index = this._hash(key)
    const bucket = this._table[index]

    for (const entry of bucket) {
      if (entry.key === key) return entry.value
    }

    return null
  }

  public put(key: Key, value: Value) {
    const index = this._hash(key)
    const bucket = this._table[index]

    for (const entry of bucket) {
      if (entry.key === key) {
        entry.value = value
        return
      }
    }

    bucket.push(new HashEntry(key, value))
    this._count++

    if (this._count > this._size * this._loadFactor) {
      this._resize()
    }
  }

  public remove(key: Key): boolean {
    const index = this._hash(key)
    const bucket = this._table[index]

    for (let i = 0; i < bucket.length; i += 1) {
      if (bucket[i].key === key) {
        bucket.splice(i, 1)

        this._count--

        return true
      }
    }

    return false
  }
}
