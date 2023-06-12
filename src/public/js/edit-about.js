/* eslint-disable prettier/prettier */

const id = location.search.split('?id=')[1];
const form = document.querySelector('#form'); // form submit handler
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  document.getElementById('editor-content-one').value = editor1.getHTMLCode();
  document.getElementById('editor-content-two').value = editor2.getHTMLCode();

  const formData = new FormData(form);
  const response = await fetch(`/about/edit-about/${id}`, {
    method: 'PUT',
    body: formData,
  });
  const result = await response.json();
  if (result.status === 'success') {
    Swal.fire({
      icon: 'success',
      title: result.message,
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      location.replace('/about'), 1000;
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
