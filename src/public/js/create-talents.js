/* eslint-disable prettier/prettier */
var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ header: 1 }, { header: 2 }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],
  [
    {
      size: ['small', false, 'large', 'huge'],
    },
  ],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [
    {
      align: [],
    },
  ],
  ['clean'],
  ['link', 'image'],
];
var quillJobDesc = new Quill('#job_description', {
  modules: { toolbar: toolbarOptions },
  theme: 'snow',
});

var quillJobResp = new Quill('#job_responsibilities', {
  modules: { toolbar: toolbarOptions },
  theme: 'snow',
});

var quillJobQualif = new Quill('#job_qualifications', {
  modules: { toolbar: toolbarOptions },
  theme: 'snow',
});

const form = document.querySelector('#form'); // form submit handler
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  document.getElementById('editor-content-description').value =
    quillJobDesc.root.innerHTML;
  document.getElementById('editor-content-responsibilities').value =
    quillJobResp.root.innerHTML;
  document.getElementById('editor-content-qualifications').value =
    quillJobQualif.root.innerHTML;

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
