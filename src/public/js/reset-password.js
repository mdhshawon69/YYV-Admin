/* eslint-disable prettier/prettier */
const form = document.querySelector('#reset-form'); // form submit handler
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const response = await fetch('/auth/reset-password', {
    method: 'POST',
    body: formData,
  });
  if (response.ok) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your password reset successfully!',
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      location.replace('/auth/login');
    }, 1500);
  } else {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Token expired or invalid token',
      showConfirmButton: false,
      timer: 1500,
    });

    setTimeout(() => {
      location.replace('/auth/forgot-password');
    }, 1500);
  }
});
