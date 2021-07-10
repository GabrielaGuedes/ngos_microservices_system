import React from "react";
import { Grid } from "../../ui-components/grid/grid.style";
import PostCard from "./post-card";
import EmptyState from "../../ui-components/empty-state/empty-state";
import { IPost } from "../../requests/marketing/types";

interface IPostsGrid {
  posts: IPost[] | null;
  refreshData: () => void;
}

const PostsGrid: React.FC<IPostsGrid> = ({ posts, refreshData }) => {
  return (
    <Grid>
      {posts && posts.length > 0 ? (
        posts.map((p) => (
          <PostCard
            key={`card-${p.id}-${p.title}`}
            post={p}
            refreshData={refreshData}
          />
        ))
      ) : (
        <EmptyState />
      )}
    </Grid>
  );
};

export default PostsGrid;
