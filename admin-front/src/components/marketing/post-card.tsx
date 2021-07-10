import React, { useState } from "react";
import { IPost } from "../../requests/marketing/types";
import Button from "../../ui-components/button/button";
import GridCard from "../../ui-components/grid-card/grid-card";
import { IconsContainer } from "../financial-control/goals-card.style";
import DeletePostButton from "./delete-post-button";
import EditPostButton from "./edit-post-button";
import { BottomButtonsContainer } from "./post-card.style";
import PostDetailedInfoModal from "./post-detailed-info-modal";

interface IPostCard {
  post: IPost;
  refreshData: () => void;
}

const PostCard: React.FC<IPostCard> = ({ post, refreshData }) => {
  const [detailedModalOpen, setDetailedModalOpen] = useState(false);

  return (
    <GridCard title={post.title}>
      {post.text}
      <IconsContainer></IconsContainer>
      <BottomButtonsContainer>
        <IconsContainer>
          <EditPostButton post={post} refreshData={refreshData} />
          <DeletePostButton
            key={`delete-${post.id}-${post.title}`}
            id={post.id}
            title={post.title}
            refreshData={refreshData}
            files={post.files.map((f) => f.path)}
          />
        </IconsContainer>
        <div>
          <Button kind="text" onClick={() => setDetailedModalOpen(true)}>
            Ver mais
          </Button>
          <PostDetailedInfoModal
            key={`info-${post.id}-${post.title}`}
            isOpen={detailedModalOpen}
            setIsOpen={setDetailedModalOpen}
            post={post}
          />
        </div>
      </BottomButtonsContainer>
    </GridCard>
  );
};

export default PostCard;
