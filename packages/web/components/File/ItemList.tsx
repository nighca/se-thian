import React, { SVGProps, useState } from 'react'

import { ItemType, ItemWithState, ipfsGateways, getItemAccessUrl, ItemStateInfo, ItemState } from 'utils'
import styles from './style.module.scss'

interface Props {
  items: ItemWithState[]
  onRemove: (i: number) => void
}

export default function ItemList({ items, onRemove }: Props) {

  const [gateway, setGateway] = useState(ipfsGateways[0])

  if (items.length <= 0) return null

  return (
    <>
      <GatewaySelect value={gateway} onChange={setGateway} />
      <ul className={styles.itemList}>
        {items.map((item, i) => (
          <Item
            key={item.cid + i}
            item={item}
            gateway={gateway}
            onRemove={() => onRemove(i)}
          />
        ))}
      </ul>
    </>
  )
}

interface GatewaySelectProps {
  value: string
  onChange: (v: string) => void
}

function GatewaySelect({ value, onChange }: GatewaySelectProps) {
  // TODO: Do check for gateways, see details in https://github.com/ipfs/public-gateway-checker
  return (
    <div className={styles.gatewaySelectWrapper}>
      Gateway:
      <select className={styles.gatewaySelect} value={value} onChange={e => onChange(e.target.value)}>
        {ipfsGateways.map(hostname => (
          <option key={hostname} value={hostname}>{hostname}</option>
        ))}
      </select>
    </div>
  )
}

interface ItemProps {
  item: ItemWithState
  gateway: string
  onRemove: () => void
}

function Item({ item, gateway, onRemove }: ItemProps) {
  const text = item.name + (item.type === ItemType.Directory ? '/' : '')
  // TODO: upload progress
  const content = (
    item.state === ItemState.Done
    ? <a rel="noreferrer" target="_blank" href={getItemAccessUrl(gateway, item)}>{text}</a>
    : <span>{text}</span>
  )
  return (
    <li className={styles.item}>
      <ItemStateIcon {...item} />
      {content}
      <i className={styles.removeIcon} title="Remove" onClick={onRemove}>x</i>
    </li>
  )
}

function ItemStateIcon(stateInfo: ItemStateInfo) {
  if (stateInfo.state === ItemState.Done) return <IconCircle className={styles.stateIcon} />
  // TODO: progress
  return <IconLoading className={styles.stateIcon} />
}

function IconCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="16px" height="16px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" {...props}>
      <circle cx="50" cy="50" r="16" fill="currentColor"></circle>
    </svg>
  )
}

function IconLoading(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="16px" height="16px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" {...props}>
      <circle cx="50" cy="50" r="32" strokeWidth="8" stroke="currentColor" strokeDasharray="50.26548245743669 50.26548245743669" fill="none" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
      </circle>
    </svg>
  )
}