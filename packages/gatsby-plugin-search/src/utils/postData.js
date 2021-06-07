export default function postData(url, data, options) {
  return window
    .fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      ...options,
    })
    .then((res) => res.json());
}
