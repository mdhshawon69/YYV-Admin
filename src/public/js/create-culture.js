/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */

var editor1 = new RichTextEditor('#editor');
const form = document.querySelector('#form'); // form submit handler
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  document.getElementById('editor-content').value = editor1.getHTMLCode();
  const formData = new FormData(form);
  const response = await fetch('/culture/create-culture', {
    method: 'POST',
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
      location.replace('/culture'), 1000;
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
