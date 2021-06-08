export const postRequest = (endpoint, data) => fetch(endpoint, {
  method: 'POST',
  body: JSON.stringify(data),
  headers: { 'Content-Type': 'application/json' },
});

export const getJsonRequest = (endpoint) => fetch(endpoint)
  .then((res) => res.json());

export const deleteRequest = (endpoint) => fetch(endpoint, {
  method: 'DELETE',
});
