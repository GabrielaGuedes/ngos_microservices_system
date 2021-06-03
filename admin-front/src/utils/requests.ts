import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getRequest = (url: string) => {
  const headers = {
    "Content-Type": "application/json",
    "x-access-token": cookies.get("accessToken"),
  };

  return fetch(url, { headers }).then((result) => {
    if (result.status === 200 || result.status === 201) {
      return result.json();
    }
    return { status: result.status, response: result.json() };
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
    return { status: result.status, response: result.json() };
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
    return { status: result.status, response: result.json() };
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
    return { status: result.status, response: result.json() };
  });
};
