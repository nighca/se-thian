import { useRef, useEffect, useState, DragEvent } from 'react'

export function useOnChange(callback: () => void, deps: unknown[]) {
  const isFirstRef = useRef(true)
  useEffect(() => {
    if (isFirstRef.current) {
      isFirstRef.current = false
      return
    }
    callback()
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}

export function useDrag(handleDropData: (dataTransfer: DataTransfer) => void) {
  const [dropEnterDepth, setDropEnterDepth] = useState(0)
  const droppable = dropEnterDepth > 0

  function handleDragEnter(e: DragEvent) {
    console.log('handleDragEnter', e.target, e.currentTarget)
    setDropEnterDepth(v => v + 1)
  }

  function handleDragLeave(e: DragEvent) {
    console.log('handleDragLeave', e.target, e.currentTarget)
    setDropEnterDepth(v => v - 1)
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDropEnterDepth(0)
    handleDropData(e.dataTransfer)
  }

  return {
    droppable,
    onDragEnter: handleDragEnter,
    onDragLeave: handleDragLeave,
    onDragOver: handleDragOver,
    onDrop: handleDrop
  }
}
