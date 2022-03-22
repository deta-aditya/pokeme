import { RefObject, useRef } from "react"

type UseInfiniteScrollParams = { 
  pxThreshold: number,
  onThresholdPassed: () => void,
}

type UseInfiniteScrollReturns<T> = {
  scrollerRef: RefObject<T>, 
  onScroll: () => void
}

function useInfiniteScroll<T extends HTMLElement>({ pxThreshold, onThresholdPassed }: UseInfiniteScrollParams): UseInfiniteScrollReturns<T> {
  const scrollerRef = useRef<T>(null)

  const onScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = (scrollerRef.current as T)
    const visibleThreshold = scrollHeight - clientHeight - pxThreshold

    if (scrollTop >= visibleThreshold) {
      onThresholdPassed()
    }
  }

  return {
    scrollerRef,
    onScroll,
  }
}

export { useInfiniteScroll }
