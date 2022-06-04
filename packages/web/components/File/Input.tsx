import React, { ChangeEvent, ClipboardEvent, DragEvent, SVGProps, useRef, useState } from 'react'
import { cns } from 'utils'

import styles from './style.module.scss'

interface Props {
  loading?: boolean
  onFile: (files: File[]) => void
}

export default function FileInput({ onFile, loading = false }: Props) {

  const [dropActive, setDropActive] = useState(false)

  function handleDragEnter() {
    setDropActive(true)
  }

  function handleDragLeave() {
    setDropActive(false)
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    console.log('drag over', e)
  }

  function handleDataTransfer(dataTransfer: DataTransfer) {
    const items = Array.from(dataTransfer.items || [])
    console.log(items)
    const maybeFiles = items.filter(item => item.kind === 'file').map(item => item.getAsFile())
    const files = maybeFiles.filter(Boolean) as File[]
    if (files.length === 0) return
    onFile(files)
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDropActive(false)
    handleDataTransfer(e.dataTransfer)
  }

  const rawInputRef = useRef<HTMLInputElement>(null)

  function handleSelect() {
    if (!rawInputRef.current) return
    rawInputRef.current.click()
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    onFile(files)
  }

  function handlePaste(e: ClipboardEvent<HTMLDivElement>) {
    e.preventDefault()
    handleDataTransfer(e.clipboardData)
  }

  const className = cns(
    styles.fileInput,
    dropActive && styles.dropActive,
    loading && styles.loading
  )

  const labelContent = (
    <>
      <span className={styles.nonDrop}>
        <span className={styles.selector} onClick={handleSelect}>Select</span>
        , Paste or&nbsp;
      </span>
      <span className={styles.drop}>Drop files here.</span>
    </>
  )

  const loadingLabelContent = (
    <>
      <IconLoading className={styles.icon} />
      Processing...
    </>
  )

  return (
    // TODO: mobile style
    <div
      className={className}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onPaste={handlePaste}
    >
      <p className={styles.label}>
        {loading ? loadingLabelContent : labelContent}
      </p>
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
