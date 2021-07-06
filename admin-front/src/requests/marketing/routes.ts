const baseUrl = process.env.REACT_APP_MARKETING_SERVER_API;

export const MARKETING_ROUTES = {
  posts: baseUrl + "/posts",
  fileUploads: baseUrl + "/file-uploads",
};
