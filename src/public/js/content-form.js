/* eslint-disable prettier/prettier */
document.getElementById('pageSelect').addEventListener('change', async (e) => {
  const res = await fetch(`/content/sections?page_id=${e.target.value}`);
  const data = await res.json();
  console.log(data);
  const selectElement = document.getElementById('selectSection');
  while (selectElement.options.length > 1) {
    selectElement.remove(1);
  }
  data.data.forEach((item) => {
    const option = document.createElement('option');
    option.value = item._id;
    option.textContent = item.name;
    option.setAttribute('custom-data', item.name);
    selectElement.appendChild(option);
  });
});

const elements = document.querySelectorAll('.hide');
elements.forEach((item) => {
  item.classList.add('hidden');
});

const mySelect = document.getElementById('selectSection');

mySelect.addEventListener('change', () => {
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
      document
        .getElementById('contact_person_email')
        .classList.remove('hidden');
      break;

    default:
      // Default case if selectedOption does not match any case
      break;
  }
});
