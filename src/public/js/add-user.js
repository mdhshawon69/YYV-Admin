/* eslint-disable prettier/prettier */
const form = document.querySelector('#form'); // form submit handler
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const response = await fetch('/users/add-user', {
    method: 'POST',
    body: formData,
  });
  if (response.ok) {
    Swal.fire({
      icon: 'success',
      title: 'User added successfully!',
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      location.replace('/users'), 1000;
    });
  } else {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'User already exist!',
      showConfirmButton: false,
      timer: 1500,
    });
  }
});
