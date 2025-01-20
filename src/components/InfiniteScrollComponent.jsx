
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import SpinnerInline from './loaders/SpinnerInline'

const InfiniteScrollComponent = ({
  fetchData,
  className,
  hasMore,
  length,
  children,
  limit,
  page,
  totalPages,
  scrollableTarget
}) => {
  return (
    <InfiniteScroll
      className={className}
      dataLength={length || limit}
      next={fetchData}
      hasMore={page < totalPages && hasMore}
      loader={<SpinnerInline />}
      scrollableTarget={scrollableTarget}
      scrollThreshold={0.7}
    >
      {children}
    </InfiniteScroll>
  )
}

export default InfiniteScrollComponent
