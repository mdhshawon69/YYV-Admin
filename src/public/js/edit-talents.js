/* eslint-disable prettier/prettier */

const id = location.search.split('?id=')[1];
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
  const response = await fetch(`/talents/edit-talent/${id}`, {
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
