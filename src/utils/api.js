export const getData = (size) => {
  return fetch(
    `http://www.filltext.com/?rows=${size}&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`,
    {
      method: 'GET',
    },
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Статус ответа: ${res.status}`);
  });
};

