/* eslint-disable prettier/prettier */
function getData(e) {
  e.preventDefault();
  const form = document.getElementById('form');
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const fromData = new FormData(form);
    const response = await fetch('/auth/login', {
      method: 'POST',
      body: fromData,
    });

    const result = await response.json();

    console.log(result);

    setTimeout(() => {
      location.replace('/');
    });
  });
}
