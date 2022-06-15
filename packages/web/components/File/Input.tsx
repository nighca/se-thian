import React, { ChangeEvent, ClipboardEvent, SVGProps, useRef } from 'react'
import { cns } from 'utils'
import { useDrag } from 'hooks'

import styles from './style.module.scss'

interface Props {
  loading?: boolean
  onFile: (files: File[]) => void
}

export default function FileInput({ onFile, loading = false }: Props) {

  const { droppable, ...dragHandlers } = useDrag(handleDataTransfer)

  const rawInputRef = useRef<HTMLInputElement>(null)

  function handleDataTransfer(dataTransfer: DataTransfer) {
    const items = Array.from(dataTransfer.items || [])
    const maybeFiles = items.filter(item => item.kind === 'file').map(item => item.getAsFile())
    const files = maybeFiles.filter(Boolean) as File[]
    if (files.length === 0) return
    onFile(files)
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    onFile(files)
    rawInputRef.current!.value = '' // clear file input
  }

  function handlePaste(e: ClipboardEvent<HTMLDivElement>) {
    e.preventDefault()
    handleDataTransfer(e.clipboardData)
  }

  function handleSelectorClick() {
    if (!rawInputRef.current) return
    rawInputRef.current.click()
  }

  const className = cns(
    styles.fileInput,
    droppable && styles.droppable,
    loading && styles.loading
  )

  const selector = (
    <span
      className={styles.selector}
      onClick={handleSelectorClick}
    >Select</span>
  )

  const inputLabel = (
    <>
      <p className={styles.pcLabel}>
        <span className={styles.nonDrop}>{selector}, Paste or&nbsp;</span>
        <span className={styles.drop}>Drop files here.</span>
      </p>
      <p className={styles.mobileLabel}>
        {selector} files.
      </p>
    </>
  )

  const loadingLabel = (
    <p className={styles.label}>
      <IconLoading className={styles.icon} />
      Processing...
    </p>
  )

  return (
    <div
      className={className}
      onPaste={handlePaste}
      {...dragHandlers}
    >
      {loading ? loadingLabel : inputLabel}
      <input
        ref={rawInputRef}
        type="file"
        multiple
        className={styles.rawInput}
        onChange={handleChange}
      />
    </div>
  )
}

function IconLoading(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="1em" height="1em" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" {...props}>
      <circle cx="50" cy="50" r="32" strokeWidth="8" stroke="currentColor" strokeDasharray="50.26548245743669 50.26548245743669" fill="none" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
      </circle>
    </svg>
  )
}
