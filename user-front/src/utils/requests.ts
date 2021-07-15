export const getRequest = (url: string, filters?: {}) => {
  const headers = {
    "Content-Type": "application/json",
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

export const postRequest = (url: string, body: {}, additionalHeaders = {}) => {
  const headers = {
    "Content-Type": "application/json",
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

export const putRequest = (url: string, body: {}, additionalHeaders = {}) => {
  const headers = {
    "Content-Type": "application/json",
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
