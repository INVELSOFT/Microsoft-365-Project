document.getElementById('year').textContent = new Date().getFullYear();

const step1 = document.getElementById('step1');
const form = document.getElementById('leadForm');
const success = document.getElementById('formSuccess');
const issueChip = document.getElementById('issueChip');
const dots = document.querySelectorAll('.step-dot');

let selectedIssue = '';

function showStep(n) {
  step1.hidden = n !== 1;
  form.hidden = n !== 2;
  dots[1].classList.toggle('active', n === 2);
}

document.querySelectorAll('.issue-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    selectedIssue = btn.dataset.issue;
    issueChip.textContent = selectedIssue;
    showStep(2);
    document.getElementById('name').focus();
  });
});

document.getElementById('backBtn').addEventListener('click', () => showStep(1));

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  form.hidden = true;
  document.getElementById('steps').hidden = true;
  success.hidden = false;
});
