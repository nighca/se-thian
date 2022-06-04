export enum ItemType {
  File = 'file',
  Directory = 'dir'
}

export interface FileItem {
  type: ItemType.File
  cid: string
  name: string
}

export interface DirItem {
  type: ItemType.Directory
  cid: string
  name: string
}

export type Item = FileItem | DirItem

export enum ItemState {
  Uploading = 'uploading',
  Done = 'done'
}

export type ItemStateInfoUploading = {
  state: ItemState.Uploading
  uploaded: number
}

export type ItemStateInfoDone = {
  state: ItemState.Done
}

export type ItemStateInfo = (
  ItemStateInfoUploading
  | ItemStateInfoDone
)

export type ItemWithState = Item & ItemStateInfo

// TODO: more public gateways
const ipfsGateway = 'https://cloudflare-ipfs.com/ipfs'

export function getAccessUrl(cid: string, subPath?: string) {
  return `${ipfsGateway}/${cid}${subPath ? `/${subPath}` : ''}`
}

export function getItemAccessUrl(item: ItemWithState) {
  return getAccessUrl(item.cid)
}

export function cns(...names: (string | null | boolean | undefined)[]) {
  return names.filter(Boolean).join(' ')
}
