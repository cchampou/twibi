export const postRequest = (endpoint, data, headers) =>
  fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json', ...headers },
  });

export const getJsonRequest = (endpoint, headers) =>
  fetch(endpoint, {
    headers,
  }).then((res) => res.json());

export const deleteRequest = (endpoint, headers) =>
  fetch(endpoint, {
    method: 'DELETE',
    headers,
  });
