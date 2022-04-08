export const fetchMethod = (reqType, url, body = "") => {
  switch (reqType) {
    case "get":
      return fetch(url).then((res) => res.json());
    case "post":
      return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((res) => res.json());
    case "update":
      return fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((res) => res.json());
    case "delete":
      return fetch(url, {
        method: "DELETE",
      }).then((res) => res.json());
    default:
      return fetch(url).then((res) => res.json());
  }
};
