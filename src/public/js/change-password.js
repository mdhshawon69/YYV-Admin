/* eslint-disable prettier/prettier */
const form = document.querySelector('#form'); // form submit handler
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const response = await fetch('/users/change-password', {
    method: 'POST',
    body: formData,
  });
  const result = await response.json();
  console.log(result);
  if (response.ok) {
    // Swal.fire({
    //   icon: 'success',
    //   title: 'Successfully changed the password',
    //   showConfirmButton: false,
    //   timer: 1500,
    // });
    Toastify({
      text: 'This is a toast',
      className: 'info',
      style: {
        background: 'linear-gradient(to right, #00b09b, #96c93d)',
      },
    }).showToast();
    setTimeout(() => {
      location.replace('/auth/login');
    }, 1500);
  } else {
    Swal.fire({
      icon: 'error',
      title: `${result.message}`,
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      location.replace('/users');
    }, 1500);
  }
});
