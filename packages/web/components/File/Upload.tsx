import React, { useEffect, useState } from 'react'
import { Web3Storage } from 'web3.storage'

import { ItemWithState, ItemType, ItemState, ItemStateInfo, Item, cns } from 'utils'
import { useOnChange } from 'hooks'
import FileInput from './Input'
import ItemList from './ItemList'
import styles from './style.module.scss'

// TODO: remove me
const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweENjMERkOTVDYjg2ZDI3MUZDMGQ0YjZmZTE1NjkyNjg5MzVGQzAwODkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTM1NTI1MzQ3MDAsIm5hbWUiOiJ0ZXN0In0.O8DmFYe40P7sBbIqM6-yeTCly9Db3b8_5fTIjcxyXHg'
const client = new Web3Storage({ token: apiToken })

const itemsStorageKey = 'se-thian/storage/items'

function useItems() {
  const [items, setItems] = useState<ItemWithState[]>([])

  useEffect(() => {
    const saved = localStorage.getItem(itemsStorageKey)
    if (saved == null) return
    try {
      const parsed: Item[] = JSON.parse(saved)
      const itemsFromStorage: ItemWithState[] = parsed.map(
        item => ({ ...item, state: ItemState.Done })
      )
      setItems(itemsFromStorage)
    } catch (e) {
      console.warn('Restore items from storage failed:', e)
    }
  }, [])

  useOnChange(() => {
    const itemsToSave = items.filter(item => item.state === ItemState.Done)
    localStorage.setItem(itemsStorageKey, JSON.stringify(itemsToSave))
  }, [items])

  return [items, setItems] as const
}

export default function FileUpload() {
  const [items, setItems] = useItems()

  function addItem(item: ItemWithState) {
    setItems(v => [item, ...v])
  }

  function removeItem(i: number) {
    setItems(v => [...v.slice(0, i), ...v.slice(i + 1)])
  }

  function setItemState(cid: string, stateInfo: ItemStateInfo) {
    setItems(v => v.map(item => (
      item.cid === cid
      ? { ...item, ...stateInfo }
      : item
    )))
  }

  const [currentFiles, setCurrentFiles] = useState<File[]>([])
  const [packing, setPacking] = useState(false)

  useEffect(() => {
    if (packing) return
    if (currentFiles.length === 0) return

    const isDirectory = currentFiles.length > 1
    const type = isDirectory ? ItemType.Directory : ItemType.File
    const name = (
      isDirectory
      ? prompt('Enter a name for the directory')
      : currentFiles[0].name
    )

    if (!name) return

    const item = { type, name, cid: '' }
    const minimumWait = new Promise<void>(resolve => setTimeout(resolve, 500))

    async function handleRootCidReady(cid: string) {
      console.log('root cid:', cid)
      item.cid = cid
      await minimumWait
      addItem({
        ...item,
        state: ItemState.Uploading,
        uploaded: 0
      })
      setPacking(false)
    }

    async function handleStoredChunk(size: number) {
      console.log('stored chunk size:', size)
      await minimumWait
      setItemState(item.cid, {
        state: ItemState.Uploading,
        uploaded: size
      })
    }

    setPacking(true)
    setCurrentFiles([])

    client.put(currentFiles, {
      onRootCidReady: handleRootCidReady,
      onStoredChunk: handleStoredChunk,
      wrapWithDirectory: item.type === ItemType.Directory
    }).then(async cid => {
      console.log('finished:', cid)
      await minimumWait
      setItemState(item.cid, {
        state: ItemState.Done
      })
    })
  }, [packing, currentFiles])

  return (
    <div className={cns(styles.fileUpload, items.length > 0 && styles.hasItems)}>
      <FileInput onFile={setCurrentFiles} loading={packing} />
      <ItemList items={items} onRemove={removeItem} />
    </div>
  )
}
