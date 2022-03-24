import { RefObject, useRef } from "react"

type UseScrollListenerParams = { 
  pxThreshold: number,
  onThresholdPassed: () => void,
  onThresholdNotPassed?: () => void,
  fromBottom?: boolean
}

type UseScrollListenerReturns<T> = {
  scrollerRef: RefObject<T>, 
  onScroll: () => void
}

function useScrollListener<T extends HTMLElement>({ 
  pxThreshold, 
  onThresholdPassed, 
  onThresholdNotPassed, 
  fromBottom = false 
}: UseScrollListenerParams): UseScrollListenerReturns<T> {
  const scrollerRef = useRef<T>(null)

  const onScroll = () => {
    if (fromBottom) {
      const { scrollHeight, scrollTop, clientHeight } = (scrollerRef.current as T)
      const visibleThreshold = scrollHeight - clientHeight - pxThreshold
  
      if (scrollTop >= visibleThreshold) {
        onThresholdPassed()
      }
      return
    } else {
      const { scrollTop } = (scrollerRef.current as T)
      
      if (scrollTop > pxThreshold) {
        onThresholdPassed()
      } else {
        if (onThresholdNotPassed) {
          onThresholdNotPassed()
        }
      }
    }

  }

  return {
    scrollerRef,
    onScroll,
  }
}

export { useScrollListener }
