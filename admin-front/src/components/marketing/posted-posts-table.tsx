import React, { Fragment } from "react";
import { IPost } from "../../requests/marketing/types";
import Table from "../../ui-components/table/table";
import DeletePostButton from "./delete-post-button";
import EditPostButton from "./edit-post-button";
import ImagesLoader from "./images-loader";
import { ImagesContainer } from "./post-detailed-info-modal.style";

interface IPostedPostsTable {
  posts: IPost[];
  refreshData: () => void;
}

const PostedPostsTable: React.FC<IPostedPostsTable> = ({
  posts,
  refreshData,
}) => {
  const columnsRender = [
    {
      property: "peopleReached",
      header: <b>Pessoas alcançadas</b>,
      align: "center",
      search: true,
    },
    {
      property: "title",
      header: <b>Título</b>,
      align: "center",
      search: true,
    },
    {
      property: "postedAt",
      header: <b>Postada em</b>,
      render: (datum: IPost) =>
        datum.postedAt ? new Date(datum.postedAt).toLocaleDateString() : "-",
      align: "center",
      search: true,
    },
    {
      property: "",
      header: "",
      render: (row: IPost) => (
        <div style={{ display: "flex" }}>
          <EditPostButton post={row} refreshData={refreshData} />
          <DeletePostButton
            key={`delete-${row.id}-post-button`}
            id={row.id}
            title={row.title}
            files={row.files.map((f) => f.path)}
            refreshData={refreshData}
          />
        </div>
      ),
      align: "center",
      sortable: false,
    },
  ];

  return (
    <Table
      data={posts}
      columnsRender={columnsRender}
      rowDetails={(row) => (
        <Fragment>
          <b>Texto: </b>
          {row.text}
          <ImagesContainer id={`images-post-${row.id}`}>
            <ImagesLoader post={row} />
          </ImagesContainer>
        </Fragment>
      )}
    />
  );
};

export default PostedPostsTable;
