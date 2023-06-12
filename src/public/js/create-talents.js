/* eslint-disable prettier/prettier */

let quillJobDesc = new RichTextEditor('#job_description');

var quillJobResp = new RichTextEditor('#job_responsibilities');

var quillJobQualif = new RichTextEditor('#job_qualifications');

const form = document.querySelector('#form'); // form submit handler
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  document.getElementById('editor-content-description').value =
    quillJobDesc.getHTMLCode();
  document.getElementById('editor-content-responsibilities').value =
    quillJobResp.getHTMLCode();
  document.getElementById('editor-content-qualifications').value =
    quillJobQualif.getHTMLCode();

  const formData = new FormData(form);
  const response = await fetch('/talents/create-talent', {
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
      location.replace('/talents'), 1000;
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
