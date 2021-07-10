import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getRequest = (url: string, filters?: {}) => {
  const headers = {
    "Content-Type": "application/json",
    "x-access-token": cookies.get("accessToken"),
  };

  const urlInstance = new URL(url);
  urlInstance.search = new URLSearchParams(filters).toString();

  return fetch(urlInstance.toString(), { headers }).then((result) => {
    if (result.status === 200 || result.status === 201) {
      return result.json();
    }
    throw Error(result.status.toString());
  });
};

export const getFileRequest = (url: string) => {
  const headers = {
    "x-access-token": cookies.get("accessToken"),
  };

  const urlInstance = new URL(url);

  return fetch(urlInstance.toString(), { headers }).then((result) => {
    if (result.status === 200 || result.status === 201) {
      return result;
    }
    throw Error(result.status.toString());
  });
};

export const postRequest = (url: string, body: {}, additionalHeaders = {}) => {
  const headers = {
    "Content-Type": "application/json",
    "x-access-token": cookies.get("accessToken"),
    ...additionalHeaders,
  };

  const init = {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  };

  return fetch(url, init).then((result) => {
    if (result.status === 200 || result.status === 201) {
      return result.json();
    }
    throw Error(result.status.toString());
  });
};

export const postDataRequest = (
  url: string,
  files: [],
  fileFieldName: string,
  additionalHeaders = {}
) => {
  const formData = new FormData();
  for (const name in files) {
    formData.append(fileFieldName, files[name]);
  }
  const headers = {
    "x-access-token": cookies.get("accessToken"),
    ...additionalHeaders,
  };

  const init = {
    method: "POST",
    headers,
    body: formData,
  };

  return fetch(url, init).then((result) => {
    if (result.status === 200 || result.status === 201) {
      return result.json();
    }
    throw Error(result.status.toString());
  });
};

export const putRequest = (url: string, body: {}, additionalHeaders = {}) => {
  const headers = {
    "Content-Type": "application/json",
    "x-access-token": cookies.get("accessToken"),
    ...additionalHeaders,
  };

  const init = {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
  };

  return fetch(url, init).then((result) => {
    if (result.status === 200 || result.status === 201) {
      return result.json();
    }
    throw Error(result.status.toString());
  });
};

export const deleteRequest = (url: string) => {
  const headers = {
    "Content-Type": "application/json",
    "x-access-token": cookies.get("accessToken"),
  };

  const init = {
    method: "DELETE",
    headers,
  };

  return fetch(url, init).then((result) => {
    if (result.status === 200 || result.status === 201) {
      return result.json();
    }
    throw Error(result.status.toString());
  });
};
