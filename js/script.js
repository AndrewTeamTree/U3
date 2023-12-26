const MynameIs = document.getElementById('name').focus()
//Name field
var jobSelect = document.getElementById('title')
var otherJob = document.getElementById('other-job-role')
//Job Role

jobSelect.addEventListener('change', (e) => {
  if (e.target.value == 'other') {
    otherJob.style.visibility = 'visible';
    // Hide options in the Job Role select field
    for (let i = 0; i < jobSelect.options.length; i++) {
      jobSelect.options[i].style.display = 'none';
    }
  } else {
    otherJob.style.visibility = 'hidden';
    // Show options in the Job Role select field
    for (let i = 0; i < jobSelect.options.length; i++) {
      jobSelect.options[i].style.display = 'block';
    }
  }
});

document.addEventListener('DOMContentLoaded', function () {
  // Disable the Color field initially
  color.setAttribute('disabled', true);
});

// T-Shirt Info
const design = document.querySelector('#design');
const color = document.querySelector('#color');

design.addEventListener('change', function () {
  // Enable the Color field when a Design is selected
  color.removeAttribute('disabled');

  // Update the Color field based on the selected Design
  updateColorOptions();
});

function updateColorOptions() {
  // Enable all color options first
  for (let i = 0; i < color.options.length; i++) {
    color.options[i].disabled = false;
  }

  // Disable color options based on the selected design
  if (design.value === 'heart js') {
    setColorOptions(['tomato', 'steelblue', 'dimgrey']);
  } else if (design.value === 'js puns') {
    setColorOptions(['cornflowerblue', 'darkslategrey', 'gold']);
  } else {
    // If no design is selected, disable the Color field again
    color.setAttribute('disabled', true);
  }
}

function setColorOptions(validColors) {
  // Disable color options that are not valid for the current design
  for (let i = 0; i < color.options.length; i++) {
    const optionValue = color.options[i].value;
    color.options[i].disabled = !validColors.includes(optionValue);
  }

  // If the currently selected color is not valid, reset the Color field
  if (!validColors.includes(color.value)) {
    color.selectedIndex = 0;
  }
}

// Initial setup on page load
updateColorOptions();


// Register for Activities section

// - Tracks and updates the total cost of selected activities dynamically.
const totalCostElement = document.getElementById('activities-cost')
let totalCost = 0
const activitiesBox = document.getElementById('activities-box');
activitiesBox.addEventListener('change', (e) => {
  if (e.target.type === 'checkbox') {
    const isChecked = e.target.checked
    const dataCost = parseInt(e.target.getAttribute('data-cost'), 10)
    if (isChecked) {
      totalCost += dataCost
    } else {
      totalCost -= dataCost
    }
    totalCostElement.textContent = `Total: $${totalCost}`
  }
})
//Payment Info section
const payForm = document.getElementById('payment')
const payPal = document.getElementById('paypal')
const bitCoin = document.getElementById('bitcoin')
payPal.style.display = 'none'
bitCoin.style.display = 'none'
// - Shows/hides payment options based on the payment method.
payForm.addEventListener('change', function () {
  const selectedPay = payForm.value
  if (selectedPay === 'credit-card') {
    payPal.style.display = 'none'
    bitCoin.style.display = 'none'
  } else if (selectedPay === 'paypal') {
    payPal.style.display = 'block'
    bitCoin.style.display = 'none'
  } else if (selectedPay === 'bitcoin') {
    payPal.style.display = 'none'
    bitCoin.style.display = 'block'
  }
})

//Form Validation section

const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const cardNumberInput = document.getElementById('cc-num');
const zipCodeInput = document.getElementById('zip');
const cvvInput = document.getElementById('cvv');

// Add submit event listener to the form
form.addEventListener('submit', function (e) {
  // Validate each input field
  const isNameValid = validName();
  const isEmailValid = validEmail();
  const isActivityValid = activity();
  const isCardNumberValid = cc();
  const isZipCodeValid = zip();
  const isCvvValid = cvv();

  // If any validation fails, prevent form submission
  if (!isNameValid || !isEmailValid || !isActivityValid || !isCardNumberValid || !isZipCodeValid || !isCvvValid) {
    e.preventDefault();
  }
});

var activitiesInput = document.getElementById('activities')
var formInput = document.getElementsByTagName('form')
const nameHint = document.getElementById('name-hint')
const emailHint = document.getElementById('email-hint')
// - Performs validation for named 

function validName() {
  const regex = /^[a-zA-Z ]{2,30}$/
  // - Returns boolean values indicating the validity of each input.
  if (!regex.test(nameInput.value)) {
    nameInput.classList.add('error-border')
    nameHint.style.display = 'inline'
    return false
  } else {
    nameInput.classList.remove('error-border')
    nameHint.style.display = 'none'
    return true
  }
}
// - Performs validation for email.


function validEmail() {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  // - Returns boolean values indicating the validity of each input.
  if (!regex.test(emailInput.value)) {
    emailInput.classList.add('error-border')
    emailHint.style.display = 'inline'
    return false
  } else {
    emailHint.style.display = 'none'
    return true
  }
}

function activity() {
  const activityHint = document.getElementById('activities-hint')
  if (totalCost === 0) {
    activityHint.style.display = 'inline'
    return true
  } else {
    activityHint.style.display = 'none'
  }
}

function cc() {
  //const cc = document.getElementById('cc-num');
  const ccid = document.getElementById('cc-hint')
  const regex = /^[0-9]{13,16}$/
  if (!regex.test(cardNumberInput.value)) {
    ccid.style.display = 'inline'
    return false
  } else {
    ccid.style.display = 'none'
    return true
  }
}

function zip() {
  const zipHint = document.getElementById('zip-hint')
  const regex = /^\d{5}$|^\d{5}-\d{4}$/
  if (!regex.test(zipCodeInput.value)) {
    zipHint.style.display = 'inline'
    return false
  } else {
    zipHint.style.display = 'none'
    return true
  }
}

function cvv() {
  const cvvHint = document.getElementById('cvv-hint')
  const regex = /^\d{5}$|^\d{5}-\d{4}$/
  if (!regex.test(cvvInput.value)) {
    cvvHint.style.display = 'inline'
    return false
  } else {
    cvvHint.style.display = 'none'
    return true
  }
}

// Accessibility
const accessibility = document.querySelectorAll("[type='checkbox']");
for (let i = 0; i < accessibility.length; i++) {
  accessibility[i].addEventListener('focus', function () {
    this.parentElement.classList.add('focus');
  });
  accessibility[i].addEventListener('blur', function () {
    this.parentElement.classList.remove('focus');
  });
}

const formOfLastChild = formInput[formInput.length - 1]
const isNameValid = validName()
formOfLastChild.addEventListener('submit', function (event) {
  if (!isNameValid) {
    formOfLastChild.classList.add('not-valid')
    formOfLastChild.classList.remove('valid')
    event.preventDefault() // Prevents the form from submitting if validation fails
  } else {
    formOfLastChild.classList.remove('not-valid')
    formOfLastChild.classList.add('valid')
  }
})


// Function to toggle error styling and display error messages
function showError(inputElement, errorElement, message) {
  inputElement.classList.add('error-border');
  errorElement.textContent = message;
  errorElement.style.display = 'inline';
}

// Function to toggle valid styling and hide error messages
function showValid(inputElement, errorElement) {
  inputElement.classList.remove('error-border');
  errorElement.style.display = 'none';
}

// Function to validate name input
function validName() {
  const nameInput = document.getElementById('name');
  const nameHint = document.getElementById('name-hint');
  const regex = /^[a-zA-Z ]{2,30}$/;

  if (!regex.test(nameInput.value.trim())) {
    showError(nameInput, nameHint, 'Name field cannot be blank');
    return false;
  } else {
    showValid(nameInput, nameHint);
    return true;
  }
}

// Function to validate email input
function validEmail() {
  const emailInput = document.getElementById('email');
  const emailHint = document.getElementById('email-hint');
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!regex.test(emailInput.value.trim())) {
    showError(emailInput, emailHint, 'Email address must be formatted correctly');
    return false;
  } else {
    showValid(emailInput, emailHint);
    return true;
  }
}

// Attach event listeners to validate input on user interaction
document.getElementById('name').addEventListener('input', validName);
document.getElementById('email').addEventListener('input', validEmail);

// Attach a submit event listener to the form
document.querySelector('form').addEventListener('submit', function (e) {
  // Validate each input field
  const isNameValid = validName();
  const isEmailValid = validEmail();

  // If any validation fails, prevent form submission
  if (!isNameValid || !isEmailValid) {
    e.preventDefault();
  }
});