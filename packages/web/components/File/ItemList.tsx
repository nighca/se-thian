import React, { SVGProps } from 'react'

import { ItemType, ItemWithState, getItemAccessUrl, ItemStateInfo, ItemState } from 'utils'
import styles from './style.module.scss'

interface Props {
  items: ItemWithState[]
}

export default function ItemList({ items }: Props) {
  if (items.length <= 0) return null
  return (
    <ul className={styles.itemList}>
      {items.map((item, i) => <Item key={item.cid + i} {...item} />)}
    </ul>
  )
}

function Item(item: ItemWithState) {
  const text = item.name + (item.type === ItemType.Directory ? '/' : '')
  // TODO: upload progress
  const content = (
    item.state === ItemState.Done
    ? <a rel="noreferrer" target="_blank" href={getItemAccessUrl(item)}>{text}</a>
    : <span>{text}</span>
  )
  return (
    <li className={styles.item}>
      <ItemStateIcon {...item} />
      {content}
    </li>
  )
}

function ItemStateIcon({ state }: ItemStateInfo) {
  if (state === ItemState.Uploading) return <IconLoading className={styles.stateIcon} />
  return <IconCircle className={styles.stateIcon} />
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