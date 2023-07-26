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

export const fetchAccountCategoryData = async (endpoint = "category") => {
  try {
    const token = localStorage.getItem("token");

    if (!token) return;

    const url =
      endpoint === "account"
        ? `http://localhost:5000/api/account/user`
        : "http://localhost:5000/api/category";

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.log(error);
  }
};
