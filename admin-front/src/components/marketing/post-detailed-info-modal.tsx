import React from "react";
import { IPost } from "../../requests/marketing/types";
import Modal from "../../ui-components/modal/modal";
import ShyEmptyState from "../../ui-components/shy-empty-state/shy-empty-state";
import ImagesLoader from "./images-loader";
import { ImagesContainer, Subtitle } from "./post-detailed-info-modal.style";

interface IPostDetailedInfoModal {
  post: IPost;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const PostDetailedInfoModal: React.FC<IPostDetailedInfoModal> = ({
  post,
  isOpen,
  setIsOpen,
}) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={post.title}>
      <Subtitle>Texto</Subtitle>
      {post.text || <ShyEmptyState />}
      {post.files.length > 0 ? <Subtitle>Imagens</Subtitle> : <ShyEmptyState />}
      <ImagesContainer id={`images-post-${post.id}`}>
        <ImagesLoader post={post} />
      </ImagesContainer>
    </Modal>
  );
};

export default PostDetailedInfoModal;
