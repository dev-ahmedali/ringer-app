import { useEffect, useState } from "react";

type chatScrollProps = {
  chatRef: React.RefObject<HTMLDivElement>;
  bottomRef: React.RefObject<HTMLDivElement>;
  shouldLoadMore: boolean;
  loadMore: () => void;
  count: number;
};

export const UseChatScroll = ({
  chatRef,
  bottomRef,
  shouldLoadMore,
  loadMore,
  count,
}: chatScrollProps) => {
  const [hasInitialized, setHasInilized] = useState(false);

  useEffect(() => {
    const topDiv = chatRef?.current;

    const handleScroll = () => {
      const scrollTop = topDiv?.scrollTop;

      if (scrollTop === 0 && shouldLoadMore) {
        loadMore();
      }
    };
    topDiv?.addEventListener("scroll", handleScroll);
    return () => {
      topDiv?.removeEventListener("scroll", handleScroll);
    };
  }, [chatRef, shouldLoadMore, loadMore]);

  useEffect(() => {
    const bottomDiv = bottomRef?.current;
    const topDiv = chatRef.current;
    const sholdAutoScroll = () => {
      if (!hasInitialized && bottomDiv) {
        setHasInilized(true);
        return true;
      }
      if(!topDiv) {
        return false
      }
      const distanceFromBottom = topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight
      return distanceFromBottom <= 100
    };
    if(sholdAutoScroll()) {
        setTimeout(() => {
            bottomRef?.current?.scrollIntoView({
                behavior: "smooth"
            })
        }, 100)
      }
  },[bottomRef, chatRef, hasInitialized]);
};
