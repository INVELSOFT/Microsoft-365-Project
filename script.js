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

const ZOHO_ENDPOINT = 'https://crm.zoho.com/crm/WebToLeadForm';
const ZOHO_FIELDS = {
  xnQsjsdp: 'a89bef13d7f23b03bef0a4f63cf737ef153cc23fe6825c5026c08eac7ff6b561',
  xmIwtLD: 'ac62edcb9a16d06cbb0a087297a3f1352c07b4b029308defa202a33b694f51c2b631ec6184f7c52129b93b2f6566e5ba',
  actionType: 'TGVhZHM=',
  returnURL: 'https://invelsoft.github.io/Microsoft-365-Project/'
};

const submitBtn = form.querySelector('button[type="submit"]');
const formError = document.getElementById('formError');

function splitName(full) {
  const parts = full.trim().split(/\s+/);
  const last = parts.pop();
  return { first: parts.join(' '), last };
}

function showDone() {
  form.hidden = true;
  document.getElementById('steps').hidden = true;
  success.hidden = false;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  formError.hidden = true;
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const honeypot = form.elements['aG9uZXlwb3Q'].value;
  if (honeypot) {
    showDone();
    return;
  }

  const { first, last } = splitName(form.elements.name.value);
  const body = new URLSearchParams({
    ...ZOHO_FIELDS,
    'Last Name': last,
    'First Name': first,
    Phone: form.elements.phone.value.trim(),
    Email: form.elements.email.value.trim(),
    LEADCF14: selectedIssue,
    Description: `Device: ${form.elements.device.value}\nSource: Office support landing page`,
    aG9uZXlwb3Q: ''
  });

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  try {
    await fetch(ZOHO_ENDPOINT, { method: 'POST', mode: 'no-cors', body });
    window.location.href = 'thank-you.html';
  } catch (err) {
    formError.hidden = false;
    submitBtn.disabled = false;
    submitBtn.textContent = 'Get Help Now';
  }
});
