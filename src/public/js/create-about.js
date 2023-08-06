/* eslint-disable prettier/prettier */

var editor1 = new RichTextEditor('#editor1');
var editor2 = new RichTextEditor('#editor2');
const form = document.querySelector('#form'); // form submit handler
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  document.getElementById('editor-content-one').value = editor1.getHTMLCode();
  document.getElementById('editor-content-two').value = editor2.getHTMLCode();

  const formData = new FormData(form);
  const response = await fetch('/vision/create-about', {
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
      location.replace('/vision'), 1000;
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
