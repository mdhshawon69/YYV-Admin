/* eslint-disable prettier/prettier */
var quillJobDesc = new Quill('#job_description', {
  theme: 'snow',
});
var quillJobResp = new Quill('#job_responsibilities', {
  theme: 'snow',
});
var quillJobQualif = new Quill('#job_qualifications', {
  theme: 'snow',
});
const contentDesc = document.getElementById('editor-content-description').value;
quillJobDesc.clipboard.dangerouslyPasteHTML(contentDesc);

const contentResp = document.getElementById(
  'editor-content-responsibilities',
).value;
quillJobResp.clipboard.dangerouslyPasteHTML(contentResp);

const contentQualif = document.getElementById(
  'editor-content-qualifications',
).value;
quillJobQualif.clipboard.dangerouslyPasteHTML(contentQualif);
const plainText = quillJobDesc.getText();

console.log(plainText);
