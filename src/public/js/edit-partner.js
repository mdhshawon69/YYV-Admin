/* eslint-disable prettier/prettier */
const form = document.querySelector('#form');
const id = location.search.split('?id=')[1];
// form submit handler
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const response = await fetch(`/partners/edit-partner/${id}`, {
    method: 'PUT',
    body: formData,
  });
  const result = await response.json();
  if (result.status === 'Success') {
    Swal.fire({
      icon: 'success',
      title: result.message,
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      location.replace('/partners'), 1000;
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: result.message,
      showConfirmButton: false,
      timer: 1500,
    });
  }
});
