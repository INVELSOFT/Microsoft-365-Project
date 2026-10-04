document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('leadForm');
const success = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  form.hidden = true;
  success.hidden = false;
});
