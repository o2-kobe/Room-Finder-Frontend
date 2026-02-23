import { type ReactNode } from "react";
import { useInView } from "react-intersection-observer";

interface InfiniteScrollContainerProps {
  children: ReactNode;
  onButtomReached: () => void; //could be called loadmore
  className?: string;
}

const InfiniteScrollContainer = ({
  children,
  onButtomReached,
  className,
}: InfiniteScrollContainerProps) => {
  const { ref } = useInView({
    rootMargin: "50px",
    onChange(inView) {
      if (inView) {
        onButtomReached();
      }
    },
  });

  return (
    <div className={className}>
      {children}
      <div ref={ref} />
    </div>
  );
};
export default InfiniteScrollContainer;
