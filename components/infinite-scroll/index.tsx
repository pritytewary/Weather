import React, { useState, useEffect, useRef, ReactNode } from "react";

interface InfiniteScrollProps {
  loadMore: () => Promise<void>;
  hasMore: boolean;
  children: ReactNode;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  loadMore,
  hasMore,
  children,
}) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const intersectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetching) {
          setIsFetching(true);
          loadMore().then(() => setIsFetching(false));
        }
      },
      {
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (intersectRef.current) {
      observer.observe(intersectRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isFetching, loadMore]);

  return (
    <>
      {children}
      <div ref={intersectRef}>
        {isFetching && (
          <div className="flex justify-center items-center gap-4 py-4">
            <p data-t>Loading more data...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default InfiniteScroll;
