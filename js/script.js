const MynameIs = document.getElementById('name').focus()
//Name field
var jobSelect = document.getElementById('title')
var otherJob = document.getElementById('other-job-role')
//Job Role
otherJob.style.visibility = 'hidden'
jobSelect.addEventListener('change', (e) => {
  if (e.target.value == 'other') {
    otherJob.style.visibility = 'visible'
    jobSelect.style.visibility = 'hidden'
  } else {
    jobSelect.style.visibility = 'visible'
    otherJob.style.visibility = 'hidden'
  }
})
//T-Shirt Info
const design = document.querySelector('#design')
const color = document.querySelector('#color')
design.addEventListener('change', function () {
  // Enable all color options first
  for (var i = 0; i < color.options.length; i++) {
    color.options[i].disabled = false
  }
  // Disable color options based on the selected design
  if (design.value === 'heart js') {
    for (var i = 0; i < color.options.length; i++) {
      if (color.options[i].getAttribute('data-theme') !== 'heart js') {
        color.options[i].disabled = true
      }
    }
  } else if (design.value === 'js puns') {
    for (var i = 0; i < color.options.length; i++) {
      if (color.options[i].getAttribute('data-theme') !== 'js puns') {
        color.options[i].disabled = true
      }
    }
  }
})
// Register for Activities section
const activitiesBox = document.getElementById('activities-box')
const totalCostElement = document.getElementById('activities-cost')
let totalCost = 0
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
const nameInput = document.getElementById('name')
var emailInput = document.getElementById('email')
var activitiesInput = document.getElementById('activities')
var cardNumberInput = document.getElementById('cc-num')
var zipCodeInput = document.getElementById('zip')
var cvvInput = document.getElementById('cvv')
var formInput = document.getElementsByTagName('form')
const nameHint = document.getElementById('name-hint')
const emailHint = document.getElementById('email-hint')

function validName() {
  const regex = /^[a-zA-Z ]{2,30}$/
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
// Event listener to prevent form submission
addEventListener('keyup', (e) => {
  if (!validName()) {
    e.preventDefault()
  }
})
addEventListener('submit', (e) => {
  if (!validName()) {
    e.preventDefault()
  }
})

function validEmail() {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  if (!regex.test(emailInput.value)) {
    emailInput.classList.add('error-border')
    emailHint.style.display = 'inline'
    return false
  } else {
    emailHint.style.display = 'none'
    return true
  }
}
addEventListener('keyup', (e) => {
  if (!validEmail()) {
    e.preventDefault()
  }
})
addEventListener('submit', (e) => {
  if (!validEmail()) {
    e.preventDefault()
  }
})

function activity() {
  const activityHint = document.getElementById('activities-hint')
  if (totalCost === 0) {
    activityHint.style.display = 'inline'
    return true
  } else {
    activityHint.style.display = 'none'
  }
}
addEventListener('submit', (e) => {
  if (!activity()) {
    e.preventDefault()
  }
})

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
addEventListener('submit', (e) => {
  if (!cc()) {
    e.preventDefault()
  }
})

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
addEventListener('submit', (e) => {
  if (!zip()) {
    e.preventDefault()
  }
})

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
addEventListener('submit', (e) => {
  if (!cvv()) {
    e.preventDefault()
  }
})
// Accessability
const accessibility = document.querySelectorAll("[type='checkbox']")
for (let i = 0; i < accessibility.length; i++) {
  accessibility[i].addEventListener('focus', function () {
    this.parentElement.classList.add('focus')
  })
  accessibility[i].addEventListener('blur', function () {
    this.parentElement.classList.remove('focus')
  })
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
