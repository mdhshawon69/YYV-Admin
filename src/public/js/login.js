/* eslint-disable prettier/prettier */
const form = document.querySelector('#form'); // form submit handler
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const response = await fetch('/auth/login', {
    method: 'POST',
    body: formData,
  });
  if (response.ok) {
    Toastify({
      text: 'Successfully logged in!',
      className: 'info',
      style: {
        background: 'linear-gradient(to top, #4481eb 0%, #04befe 100%)',
      },
    }).showToast();
    setTimeout(() => {
      location.replace('/');
    }, 1500);
  } else {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Invalid Credentials!',
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      location.replace('/auth/login');
    }, 1500);
  }
});
