import React, { Fragment } from "react";
import { useState } from "react";
import Button from "../../ui-components/button/button";
import { errorToast } from "../../ui-components/toasts/toasts";
import { useEffect } from "react";
import { getPosts } from "../../requests/marketing/get-posts";
import { IPost } from "../../requests/marketing/types";
import EditCreatePostModal from "../../components/marketing/edit-create-post-modal";
import { PageTitle } from "../../ui-components/typography/page-title";
import LoadingBox from "../../ui-components/loading-box/loading-box";
import PostsGrid from "../../components/marketing/posts-grid";

interface IMarketing {}

const Marketing: React.FC<IMarketing> = () => {
  const [postsResult, setPostsResult] = useState<IPost[]>();
  const [newPostModalOpen, setNewPostModalOpen] = useState(false);

  useEffect(() => {
    getPosts({ posted: false })
      .then((res) => setPostsResult(res))
      .catch(() => errorToast());
  }, []);

  const refreshData = () => {
    getPosts({ posted: false })
      .then((res) => setPostsResult(res))
      .catch(() => errorToast());
  };

  return (
    <Fragment>
      <PageTitle>Marketing Digital - Rascunhos</PageTitle>
      <Button onClick={() => setNewPostModalOpen(true)}>Novo post</Button>
      <EditCreatePostModal
        refreshData={refreshData}
        isOpen={newPostModalOpen}
        setIsOpen={setNewPostModalOpen}
        creation
      />
      {postsResult ? (
        <PostsGrid posts={postsResult} refreshData={refreshData} />
      ) : (
        <LoadingBox />
      )}
    </Fragment>
  );
};

export default Marketing;
