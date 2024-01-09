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

  const checkboxes = activitiesBox.querySelectorAll("input[type='checkbox']")
  let totalCost = 0

  function applyTitle() {
    var el = document.querySelector("label[for='title']")
    // Set the HTML content with the img tag and src attribute
    el.innerHTML = `<img src="img/valid.svg" width="20" height="20" alt="valid">`
    // Insert the img element after the current element
    el.after()
  }

  function applySize() {
    var el = document.querySelector("label[for='size']")
    // Set the HTML content with the img tag and src attribute
    el.innerHTML = `<img src="img/valid.svg" width="20" height="20" alt="valid">`
    // Insert the img element after the current element
    el.after()
  }

  function applyDesign() {
    var el = document.querySelector("label[for='design']")
    // Set the HTML content with the img tag and src attribute
    el.innerHTML = `<img src="img/valid.svg" width="20" height="20" alt="valid">`
    // Insert the img element after the current element
    el.before()
  }

  function applyColor() {
    var el = document.querySelector("label[for='color']")
    // Set the HTML content with the img tag and src attribute
    el.innerHTML = `<img src="img/valid.svg" width="20" height="20" alt="valid">`
    // Insert the img element after the current element
    el.prepend()
  }

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
    const errorHint = inputElement.nextElementSibling
    errorHint.textContent = message
    errorHint.style.display = 'block'
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

  function verify(validElement, element) {
    const parentElement = element.parentElement

    if (validElement) {
      parentElement.classList.add('valid')
      parentElement.classList.remove('not-valid')
      parentElement.lastElementChild.style.display = 'none'
    } else {
      parentElement.classList.add('not-valid')
      parentElement.classList.remove('valid')
      parentElement.lastElementChild.style.display = 'block'
    }
  }
  /*////////////////////////////////////////////////////////////////////////////////////////////////////*/
  // T-Shirt Info
  const color = document.querySelector('#color')
  const size = document.querySelector('#size')
  const design = document.querySelector('#design')
  // Attach change event listener to update color options
  color.addEventListener('change', function () {
    // Update the Color field based on the selected Design
    updateColorOptions()
  })
  size.addEventListener('change', function () {
    applySize()
  })
  design.addEventListener('change', function () {
    applyDesign()
  })
  color.addEventListener('change', function () {
    applyColor()
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
      color.options[i].disabled = !validColors.includes(optionValue)
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
      applyTitle()
    }
  })
  /*////////////////////////////////////////////////////////////////////////////////////////////////////*/

  // Payment Info section
  const creditCard = document.getElementById('credit-card')
  const payForm = document.getElementById('payment')
  const payPal = document.getElementById('paypal')
  const bitCoin = document.getElementById('bitcoin')
  const selectedPay = payForm.value
  // Hide PayPal and Bitcoin initially
  payPal.style.display = 'none'
  bitCoin.style.display = 'none'
  // Shows/hides payment options based on the payment method.
  payForm.addEventListener('change', function () {
    const selectedPay = payForm.value // Update selectedPay inside the event listener

    if (selectedPay === 'credit-card') {
      payPal.style.display = 'none'
      bitCoin.style.display = 'none'
      creditCard.style.display = 'block' // Display credit card fields
    } else if (selectedPay === 'paypal') {
      payPal.style.display = 'block'
      bitCoin.style.display = 'none'
      creditCard.style.display = 'none' // Hide credit card fields
    } else if (selectedPay === 'bitcoin') {
      payPal.style.display = 'none'
      bitCoin.style.display = 'block'
      creditCard.style.display = 'none' // Hide credit card fields
    }
  })
  // Set default value to credit card
  payForm.value = 'credit-card'

  /*////////////////////////////////////////////////////////////////////////////////////////////////////*/
  //Accessability
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('focus', (e) => {
      if (e.target.type === 'checkbox') {
      checkboxes[i].parentElement.classList.add('focus')
      registerButton.style.display = 'inline-block'
      registerButton.style.visibility = 'visible'
      }
    })
    checkboxes[i].addEventListener('blur', (e) => {
      if (e.target.type === !ischecked) {
      checkboxes[i].parentElement.classList.remove('focus')
      registerButton.style.display = 'inline-block'
      registerButton.style.visibility = 'visible'
      }
    })
  }

  // Function to hide activities checkmark
  function hideActivitiesCheckmark() {
    const existingCheckmark = activitiesBox.querySelector('.checkmark')
    if (existingCheckmark) {
      activitiesBox.removeChild(existingCheckmark)
    }
  }
  activitiesBox.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') {
      const isChecked = e.target.checked
      const dataCost = parseInt(e.target.getAttribute('data-cost'), 10)
      if (isChecked) {
        totalCost += dataCost
        applyActivity()
        registerButton.style.display = 'inline-block'
        registerButton.style.visibility = 'visible'
      } else {
        removeActivity()
        totalCost -= dataCost
        registerButton.style.display = 'inline-block'
        registerButton.style.visibility = 'visible'
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
    }
    updateTotalCost()
  })
  const registerButton = document.querySelector('button[type="submit"]')
  activitiesBox.addEventListener('DOMContentLoaded', function () {
    

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

    const nameValue = nameInput.value
    const emailValue = emailInput_ok.value
    const cardValue = ccnum.value
    const zipValue = zipCodeInput.value
    const cvvValue = cvvInput.value

    const nameValid = /^[A-Za-z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue)
    const emailValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue)

    const cardValid = /^\d{13,16}$/.test(cardValue)
    const zipValid = /^\d{5}$/.test(zipValue)
    const inputValid = /^\d{3}$/.test(cvvValue)

    const actValid = totalCost > 0
    

    verify(nameValid, nameInput)
    verify(emailValid, emailInput_ok)
    verify(actValid, activitiesBox)

    if (selectedPay === 'credit-card') {
      verify(cardValid, ccnum)
      verify(zipValid, zipCodeInput)
      verify(inputValid, cvvInput)

      if (!cardValid || !zipValid || !inputValid) {
        showError(ccnum, 'Credit card number, zip code, and CVV are required.')
        hasErrors = true
      }
    }
 
    if 
     (!nameValid || !emailValid || !actValid) {
      showError(
        nameInput,
        'Name, email, and at least one activity are required.'
      )
      hasErrors = true
   
    }

    if (hasErrors) {
      event.preventDefault()
      registerButton.style.display = 'inline-block'
      registerButton.style.visibility = 'visible'
    } else {
      registerButton.style.display = 'inline-block'
      registerButton.style.visibility = 'visible'
      
    }
    
  })
  /*////////////////////////////////////////////////////////////////////////////////////////////////////*/
})
