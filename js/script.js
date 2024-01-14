document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('name').focus()
  const form = document.querySelector('form')
  const nameInput = document.getElementById('name')
  const emailInput_ok = document.getElementById('email')
  const zipCodeInput = document.getElementById('zip')
  const cvvInput = document.getElementById('cvv')
  const ccnum = document.getElementById('cc-num')
  const activitiesHint = document.querySelector('.activities-hint.hint')
  const activitiesBox = document.getElementById('activities')
  const totalCostElement = document.getElementById('activities-cost')
  const creditCardBox = document.querySelector('.credit-card-box')
  const creditCard = document.getElementById('credit-card')
  const payForm = document.getElementById('payment')
  const payPal = document.getElementById('paypal')
  const bitCoin = document.getElementById('bitcoin')
  const checkboxes = activitiesBox.querySelectorAll("input[type='checkbox']")
  let totalCost = 0

  function removeActivity() {
    const elee = document.querySelector('#activities legend .asterisk')
    // Remove the content of the element
    elee.innerHTML = ''
  }

  function applyActivity() {
    var el = document.querySelector('#activities legend .asterisk')
    // Set the HTML content with the img tag and src attribute
    el.innerHTML = `<img src="img/valid.svg" width="20" height="20" alt="valid">`
    // Insert the img element after the current element
    el.prepend()
  }

  function showError(inputElement, message) {
    const errorSibling = inputElement.nextElementSibling
    errorSibling.textContent = message
    errorSibling.style.display = 'block'
    return false
  }

  function updateTotalCost() {
    totalCostElement.textContent = `Total: $${totalCost}`
  }
  // Accessability
  function Accessability() {
    const accessibility = document.querySelectorAll("[type='checkbox']")
    for (let i = 0; i < accessibility.length; i++) {
      accessibility[i].addEventListener('focus', function () {
        this.parentElement.classList.add('focus')
      })
      accessibility[i].addEventListener('blur', function () {
        this.parentElement.classList.remove('focus')
      })
    }
  }
  Accessability()

  function veri(validElement, element) {
    const parentElement = element.parentElement
    if (validElement) {
      parentElement.lastElementChild.style.display = 'none'
      parentElement.classList.remove('not-valid')
    } else {
      parentElement.classList.add('not-valid')
      parentElement.lastElementChild.style.display = 'block'
    }
  }

  function verify(validElement, element) {
    const parentElement = element.parentElement
    if (validElement) {
      parentElement.parentElement.classList.add('valid')
      parentElement.classList.remove('not-valid')
      parentElement.lastElementChild.style.display = 'none'
    } else {
      parentElement.classList.add('not-valid')
      parentElement.parentElement.classList.remove('valid')
      parentElement.lastElementChild.style.display = 'block'
    }
  }
  /*////////////////////////////////////////////////////////////////////////////////////////////////////*/
  // T-Shirt Info
  const color = document.querySelector('#color')
  const design = document.querySelector('#design')
  // Attach change event listener to update color options
  color.addEventListener('change', function () {
    // Update the Color field based on the selected Design
    updateColorOptions()
  })

  design.addEventListener('change', function () {
    // Enable the Color field when a Design is selected
    color.removeAttribute('disabled')
    // Update the Color field based on the selected Design
    updateColorOptions()
  })

  function updateColorOptions() {
    // Enable all color options first
    for (let i = 0; i < color.options.length; i++) {
      color.options[i].disabled = false
    }
    // Disable color options based on the selected design
    if (design.value === 'heart js') {
      setColorOptions(['tomato', 'steelblue', 'dimgrey'])
    } else if (design.value === 'js puns') {
      setColorOptions(['cornflowerblue', 'darkslategrey', 'gold'])
    } else {
      // If no design is selected, disable the Color field again
      color.setAttribute('disabled', true)
    }
  }

  function setColorOptions(validColors) {
    // Disable color options that are not valid for the current design
    for (let i = 0; i < color.options.length; i++) {
      const optionValue = color.options[i].value
      color.options[i].hidden = !validColors.includes(optionValue)
    }
    // If the currently selected color is not valid, reset the Color field
    if (!validColors.includes(color.value)) {
      color.selectedIndex = 0
    }
  }
  // Initial setup on page load
  updateColorOptions()
  // Job Role
  const jobSelect = document.getElementById('title')
  const otherJob = document.getElementById('other-job-role')
  // Hide otherJob initially
  otherJob.style.display = 'none'
  // Attach change event listener to toggle otherJob visibility
  jobSelect.addEventListener('change', function (e) {
    if (e.target.value === 'other') {
      // Show otherJob if "Other" is selected
      otherJob.style.display = 'block'
    } else {
      // Hide otherJob for other selections
      otherJob.style.display = 'none'
    }
  })
  /*////////////////////////////////////////////////////////////////////////////////////////////////////*/
  // Payment Info section
  // Hide PayPal and Bitcoin initially
  payPal.style.display = 'none'
  bitCoin.style.display = 'none'
  // Shows/hides payment options based on the payment method.
  payForm.addEventListener('change', function () {
    let selectedPay = payForm.value
    if (selectedPay === 'credit-card') {
      payPal.style.display = 'none'
      bitCoin.style.display = 'none'
      creditCard.style.display = 'block' // Display credit card fields
    } else if (selectedPay === 'paypal') {
      payPal.style.display = 'block'
      payPal.style.visibility = 'visible'
      bitCoin.style.display = 'none'
      bitCoin.style.visibility = 'hidden'
      creditCard.style.display = 'none' // Hide credit card fields
    } else if (selectedPay === 'bitcoin') {
      // Display Bitcoin fields
      payPal.style.visibility = 'hidden'
      payPal.style.display = 'none'
      bitCoin.style.display = 'block'
      bitCoin.style.visibility = 'visible'
      creditCard.style.display = 'none'
    }
  })
  // Set default value to credit card
  payForm.value = 'credit-card'
  /*////////////////////////////////////////////////////////////////////////////////////////////////////*/
  //
  // Function to hide activities checkmark
  function hideActivitiesCheckmark() {
    const existingCheckmark = activitiesBox.querySelector('.checkmark')
    if (existingCheckmark) {
      activitiesBox.removeChild(existingCheckmark)
    }
  }
  activitiesBox.addEventListener('change', (e) => {
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', function () {
        const isChecked = this.checked
        const dayAndTime = this.getAttribute('data-day-and-time')
        // Iterate through all checkboxes to disable conflicting ones
        checkboxes.forEach((otherCheckbox) => {
          if (
            otherCheckbox !== checkbox &&
            otherCheckbox.getAttribute('data-day-and-time') === dayAndTime
          ) {
            otherCheckbox.disabled = isChecked
          }
        })
      })
      for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('focus', (e) => {
          if (e.target.type === 'checkbox') {
            checkboxes[i].parentElement.classList.add('focus')
            registerButton.style.display = 'inline-block'
            registerButton.style.visibility = 'visible'
          }
        })
        checkboxes[i].addEventListener('blur', (e) => {
          if (e.target.type === !isChecked) {
            checkboxes[i].parentElement.classList.remove('focus')
            registerButton.style.display = 'inline-block'
            registerButton.style.visibility = 'visible'
          }
        })
      }
    })
    if (e.target.type === 'checkbox') {
      const ischecked = e.target.checked
      const dataCost = parseInt(e.target.getAttribute('data-cost'), 10)
      if (ischecked) {
        totalCost += dataCost
        applyActivity()
        registerButton.style.display = 'inline-block'
        registerButton.style.visibility = 'visible'
      } else {
        removeActivity()
        totalCost -= dataCost
        registerButton.style.display = 'inline-block'
        registerButton.style.visibility = 'visible'
        showError(totalCostElement, 'Please choose a Activity')
      }
      updateTotalCost()
    }
    // Update the activities checkmark
    if (totalCost > 0) {
      applyActivity()
      activitiesHint.style.display = 'none'
      activitiesHint.style.visibility = 'hidden'
      registerButton.style.display = 'inline-block'
      registerButton.style.visibility = 'visible'
    } else {
      hideActivitiesCheckmark()
      activitiesHint.style.display = 'block'
      activitiesHint.style.visibility = 'visible'
      showError(totalCostElement, 'Please choose a Activity')
    }
    updateTotalCost()
  })
  const registerButton = document.querySelector('button[type="submit"]')
  totalCostElement.addEventListener('click', function () {
    if (actValid) {
      registerButton.style.display = 'inline-block'
      registerButton.style.visibility = 'visible'
    }
    // Set styles to ensure the button is always visible
    registerButton.style.display = 'inline-block'
    registerButton.style.visibility = 'visible'
    // Attach an event listener to prevent the default click behavior
    registerButton.addEventListener('click', function (event) {
      event.preventDefault()
    })
  })
  // Attach submit event listener to the form
  form.addEventListener('submit', function (event) {
    let hasErrors = false
    const nameValue = nameInput.value.trim()
    const emailValue = emailInput_ok.value.trim()
    const cardValue = ccnum.value.trim()
    const zipValue = zipCodeInput.value.trim()
    const cvvValue = cvvInput.value.trim()
    const paypV = payPal
    const bitboy = bitCoin
    const nameValid = /^[A-Za-z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue)
    const emailValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue)
    const actValid = totalCost > 0
    const cardValid = /^\d{13,16}$/.test(cardValue)
    const zipValid = /^\d{5}$/.test(zipValue)
    const inputValid = /^\d{3}$/.test(cvvValue)
    verify(nameValid, nameInput)
    verify(emailValid, emailInput_ok)
    verify(actValid, totalCostElement)
    verify(cardValid, ccnum)
    verify(zipValid, zipCodeInput)
    verify(inputValid, cvvInput)
    verify(paypV, payPal)
    verify(bitboy, bitCoin)
    if (!actValid) {
      removeActivity()
      showError(totalCostElement, 'Please choose an activity')
      hasErrors = true
    }
    if (payForm.value === 'credit-card') {
      // Credit card validation
      if (!cardValid || !zipValid || !inputValid) {
        event.preventDefault()
        showError(
          creditCardBox,
          'Credit card number, zip code, and CVV are required.'
        )
        hasErrors = true
      }
    }
    if (!nameValid || !emailValid || hasErrors) {
      event.preventDefault()
      return false
    } else {
      !hasErrors
      return true
    }
  })
  /*////////////////////////////////////////////////////////////////////////////////////////////////////*/
})
