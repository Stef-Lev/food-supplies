export const fetchMethod = (reqType, url, id = "", body = "") => {
  switch (reqType) {
    case "get":
      return fetch(url + id).then((res) => res.json());
    case "post":
      return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((res) => res.json());
    case "update":
      return fetch(url + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((res) => res.json());
    case "delete":
      return fetch(url + id, {
        method: "DELETE",
      }).then((res) => res.json());
    default:
      return fetch(url + id).then((res) => res.json());
  }
};
