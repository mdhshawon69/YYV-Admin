/* eslint-disable prettier/prettier */

const elements = document.querySelectorAll('.hide');

elements.forEach((item) => {
  item.classList.add('hidden');
});

const mySelect = document.getElementById('selectSection');

const selectedOption =
  mySelect.options[mySelect.selectedIndex].getAttribute('custom-data');

switch (selectedOption) {
  case 'news-body':
    document.getElementById('title').classList.remove('hidden');
    document.getElementById('sub_title').classList.remove('hidden');
    document.getElementById('description_one').classList.remove('hidden');
    document.getElementById('description_two').classList.remove('hidden');
    document.getElementById('image_one').classList.remove('hidden');
    break;

  case 'intro-section-two':
    document.getElementById('description_one').classList.remove('hidden');
    document.getElementById('description_two').classList.remove('hidden');
    break;

  case 'incubatees-section-two':
    document.getElementById('description_one').classList.remove('hidden');
    document.getElementById('image_one').classList.remove('hidden');
    break;

  case 'intro-section-one':
    document.getElementById('title').classList.remove('hidden');
    document.getElementById('sub_title').classList.remove('hidden');
    document.getElementById('description_one').classList.remove('hidden');
    break;

  case 'participants-section-one':
    document.getElementById('description_one').classList.remove('hidden');
    document.getElementById('image_one').classList.remove('hidden');
    document.getElementById('image_two').classList.remove('hidden');
    document.getElementById('image_title_one').classList.remove('hidden');
    document.getElementById('image_title_two').classList.remove('hidden');
    document.getElementById('image_desc_one').classList.remove('hidden');
    document.getElementById('image_desc_two').classList.remove('hidden');
    break;

  case 'header-section':
    document.getElementById('title').classList.remove('hidden');
    document.getElementById('image_one').classList.remove('hidden');
    document.getElementById('link_one').classList.remove('hidden');
    document.getElementById('image_source').classList.remove('hidden');
    break;

  case 'about-section':
    document.getElementById('title').classList.remove('hidden');
    document.getElementById('description_one').classList.remove('hidden');
    document.getElementById('description_two').classList.remove('hidden');
    document.getElementById('image_one').classList.remove('hidden');
    document.getElementById('link_one').classList.remove('hidden');
    document.getElementById('link_two').classList.remove('hidden');
    break;

  case 'what-offers-section':
    document.getElementById('title').classList.remove('hidden');
    document.getElementById('image_one').classList.remove('hidden');
    document.getElementById('description_one').classList.remove('hidden');
    document.getElementById('image_source').classList.remove('hidden');
    break;

  case 'participants-section':
    document.getElementById('image_one').classList.remove('hidden');
    document.getElementById('title').classList.remove('hidden');
    break;

  case 'join-section':
    document.getElementById('title').classList.remove('hidden');
    document.getElementById('sub_title').classList.remove('hidden');
    document.getElementById('description_one').classList.remove('hidden');
    document.getElementById('closing_date').classList.remove('hidden');
    break;

  case 'benefits-section':
    document.getElementById('image_one').classList.remove('hidden');
    document.getElementById('title').classList.remove('hidden');
    document.getElementById('description_one').classList.remove('hidden');
    break;

  case 'looking-for-section':
    document.getElementById('image_one').classList.remove('hidden');
    document.getElementById('title').classList.remove('hidden');
    document.getElementById('description_one').classList.remove('hidden');
    document.getElementById('image_source').classList.remove('hidden');
    break;

  case 'project-body':
    document.getElementById('title').classList.remove('hidden');
    document.getElementById('sub_title').classList.remove('hidden');
    document.getElementById('description_one').classList.remove('hidden');
    document.getElementById('description_two').classList.remove('hidden');
    document.getElementById('image_one').classList.remove('hidden');
    break;

  case 'upper-footer':
    document.getElementById('description_one').classList.remove('hidden');
    document.getElementById('description_two').classList.remove('hidden');
    document.getElementById('image_one').classList.remove('hidden');
    document.getElementById('image_two').classList.remove('hidden');
    document.getElementById('link_one').classList.remove('hidden');
    document.getElementById('link_two').classList.remove('hidden');
    document.getElementById('contact_person_name').classList.remove('hidden');
    document
      .getElementById('contact_person_designation')
      .classList.remove('hidden');
    document.getElementById('contact_person_email').classList.remove('hidden');

  default:
    // Default case if selectedOption does not match any case
    break;
}
