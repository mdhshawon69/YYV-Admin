/* eslint-disable prettier/prettier */
const id = location.search.split('?id=')[1];
const form = document.querySelector('#form');
var editor1 = new RichTextEditor('#editor_one'); // form submit handler
var editor2 = new RichTextEditor('#editor_two'); // form submit handler
const description_one = document.getElementById('desc_input_one').value;
const description_two = document.getElementById('desc_input_two').value;
editor1.setHTMLCode(description_one);
editor2.setHTMLCode(description_two);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  document.getElementById('description_one').value = editor1.getHTMLCode();
  document.getElementById('description_two').value = editor2.getHTMLCode();

  const formData = new FormData(form);
  const response = await fetch(`/content/edit-content/${id}`, {
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
      location.replace('/content'), 1000;
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
