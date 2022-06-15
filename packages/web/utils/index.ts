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

// https://ipfs.github.io/public-gateway-checker/
export const ipfsGateways = [
  'crustwebsites.net',
  'cloudflare-ipfs.com'
]

export function getAccessUrl(gateway: string, cid: string, subPath?: string) {
  return `https://${gateway}/ipfs/${cid}${subPath ? `/${subPath}` : ''}`
}

export function getItemAccessUrl(gateway: string, item: ItemWithState) {
  return getAccessUrl(gateway, item.cid)
}

export function cns(...names: (string | null | boolean | undefined)[]) {
  return names.filter(Boolean).join(' ')
}
