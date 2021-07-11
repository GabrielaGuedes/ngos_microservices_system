import React, { Fragment, useEffect, useState } from "react";
import EditCreatePostModal from "../../components/marketing/edit-create-post-modal";
import FiltersFormFields from "../../components/marketing/filters-form-fields";
import PostedPostsTable from "../../components/marketing/posted-posts-table";
import { getPosts } from "../../requests/marketing/get-posts";
import { IPost, IPostFilters } from "../../requests/marketing/types";
import Button from "../../ui-components/button/button";
import DataWithFilters from "../../ui-components/data-with-filters/data-with-filters";
import { errorToast } from "../../ui-components/toasts/toasts";
import { PageTitle } from "../../ui-components/typography/page-title";
import { cleanEmptyEntries } from "../../utils/empty-entries-cleaner";

interface IPosted {}

const Posted: React.FC<IPosted> = () => {
  const [postsResult, setPostsResult] = useState<IPost[]>();
  const [addPostModalOpen, setAddPostModalOpen] = useState(false);

  useEffect(() => {
    getPosts({ posted: true, orderByPeopleReached: true })
      .then((res) => setPostsResult(res))
      .catch(() => errorToast());
  }, []);

  const refreshData = () => {
    getPosts({ posted: true, orderByPeopleReached: true })
      .then((res) => setPostsResult(res))
      .catch(() => errorToast());
  };

  const formatFilters = (values: any) => {
    return {
      ...values,
      origin: values.origin?.value,
    };
  };

  const handleConfirmForm = (values: IPostFilters): Promise<any> => {
    const formattedValues = formatFilters(values);
    const cleanedFilters = cleanEmptyEntries(formattedValues);

    return getPosts(cleanedFilters)
      .then((res) => {
        setPostsResult(res);
        return cleanedFilters;
      })
      .catch(() => errorToast());
  };

  return (
    <Fragment>
      <PageTitle>Postados</PageTitle>
      <DataWithFilters
        loading={!postsResult}
        filtersFormFields={<FiltersFormFields />}
        topRightInfo={
          <Fragment>
            <Button onClick={() => setAddPostModalOpen(true)}>Novo post</Button>
            <EditCreatePostModal
              isOpen={addPostModalOpen}
              setIsOpen={setAddPostModalOpen}
              creation
              refreshData={refreshData}
            />
          </Fragment>
        }
        handleConfirmForm={handleConfirmForm}
      >
        {postsResult && (
          <PostedPostsTable posts={postsResult} refreshData={refreshData} />
        )}
      </DataWithFilters>
    </Fragment>
  );
};

export default Posted;
