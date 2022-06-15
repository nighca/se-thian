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
  'ipfs.io',
  'dweb.link',
  'gateway.ipfs.io',
  'infura-ipfs.io',
  'via0.com',
  'ipfs.eternum.io',
  'hardbin.com',
  'cloudflare-ipfs.com',
  'cf-ipfs.com',
  'gateway.pinata.cloud',
  'ipfs.telos.miami',
  'ipfs.fleek.co',
  'ipfs.azurewebsites.net',
  'ipfs.mihir.ch',
  'crustwebsites.net',
  'ipfs.eth.aragon.network',
  'nftstorage.link',
  '4everland.io',
  'ipfs-gateway.cloud'
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
