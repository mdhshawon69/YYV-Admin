/* eslint-disable prettier/prettier */
document.getElementById('page_for').addEventListener('change', async (e) => {
  const res = await fetch(`/pages/page-category?category=${e.target.value}`);
  const select = document.getElementById('page_for');
  while (select.options.length > 1) {
    select.remove(1);
  }
  const data = await res.json();
  data.data.forEach((item) => {
    const option = document.createElement('option');
    option.value = item._id;
    option.textContent = item.title;
    select.appendChild(option);
  });
});
