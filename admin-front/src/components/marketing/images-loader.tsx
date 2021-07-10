import React, { Fragment } from "react";
import { useState } from "react";
import { getFile } from "../../requests/marketing/get-file";
import { IPost } from "../../requests/marketing/types";
import { errorToast } from "../../ui-components/toasts/toasts";

interface IImagesLoader {
  post: IPost;
}

const ImagesLoader: React.FC<IImagesLoader> = ({ post }) => {
  useState(() => {
    post.files.forEach(
      (file) => {
        getFile(file.path)
          .then(async (file) => {
            const blob = await file.blob();
            const objectUrl = URL.createObjectURL(blob);

            const imageElementContainer: any = document.getElementById(
              `images-post-${post.id}`
            );
            if (imageElementContainer) {
              var e = document.createElement("img");
              e.src = objectUrl;
              e.width = 200;

              imageElementContainer.append(e);
            }
          })
          .catch(() => errorToast());
      },
      [post]
    );
  });
  return <Fragment />;
};

export default ImagesLoader;
