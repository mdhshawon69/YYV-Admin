const form = document.querySelector('#form'); // form submit handler
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const response = await fetch('/events/add-event', {
    method: 'POST',
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
      location.replace('/events'), 1000;
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
