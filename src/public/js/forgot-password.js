/* eslint-disable prettier/prettier */
const form = document.querySelector('#forgot-form'); // form submit handler
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const response = await fetch('/auth/forgot-password', {
    method: 'POST',
    body: formData,
  });
  const result = await response.json();
  console.log(result);
  if (result.status === 'Success') {
    Swal.fire({
      icon: 'success',
      title: 'A reset link has been sent to your email',
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: `${result.message}`,
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      location.replace('/auth/forgot-password');
    }, 1500);
  }
});
