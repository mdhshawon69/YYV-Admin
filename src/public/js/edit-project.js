/* eslint-disable prettier/prettier */
const id = location.search.split('?id=')[1];
const form = document.querySelector('#form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  document.getElementById('editor-content').value = editor1.getHTMLCode();
  const formData = new FormData(form);
  const response = await fetch(`/projects/edit-project/${id}`, {
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
      location.replace('/projects'), 1000;
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
