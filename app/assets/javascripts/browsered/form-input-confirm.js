'use strict'

// Polyfills introduced as a temporary fix to make Smoketests pass. See PP-3489
require('./polyfills')

const init = () => {
  const inputs = Array.prototype.slice.call(document.querySelectorAll('[data-confirmation]'))

  inputs.forEach(input => {
    input.addEventListener('input', update, false)
  })

  const addFor = (input, confirmation) => {
    const formGroup = input.closest('.govuk-form-group')

    formGroup.after(confirmation)
  }

  function update (e) {
    const input = e.target
    const value = input.value
    const confirmationId = `${input.id}-confirmation`
    let confirmation = document.getElementById(confirmationId)
    const confirmationLabel = input.dataset.confirmationLabel || ''
    const confirmationPrepend = input.dataset.confirmationPrepend || ''

    if (!confirmation) {
      const confirmationInner = `
      <div id="${confirmationId}" class="govuk-form-group govuk-inset-text input-confirm">
        <p class="govuk-hint">
          ${confirmationLabel}<span class="input-confirmation"></span>
        </p>
      </div>`
      confirmation = document.createElement('div')
      confirmation.innerHTML = confirmationInner
      addFor(input, confirmation)
    }

    if (value === '') {
      confirmation.remove()
    } else {
      const confirmationText = document.querySelectorAll(`#${confirmationId} .input-confirmation`)
      confirmationText[0].innerText = confirmationPrepend + value
    }
  }
}

module.exports = {
  init
}
