export const setRequestOptions = (method, body, token) => {
  const requestOptions = {
    method,
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  };

  if (token !== null) {
    requestOptions.headers.Authorization = `Bearer ${token}`;
  }

  return requestOptions;
};

export const capitalize = (string) => {
  return string[0].toUpperCase() + string.slice(1);
};
