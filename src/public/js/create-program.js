/* eslint-disable prettier/prettier */

var editor1 = new RichTextEditor('#about_program_description_one');
var editor2 = new RichTextEditor('#about_program_description_two');
const form = document.querySelector('#form'); // form submit handler
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  document.getElementById('editor-content-about-one').value =
    editor1.getHTMLCode();
  document.getElementById('editor-content-about-two').value =
    editor2.getHTMLCode();
  const formData = new FormData(form);
  const response = await fetch('/programs/create-program', {
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
      location.replace('/programs'), 1000;
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
