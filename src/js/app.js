'use strict';

const form = document.getElementById('signup-form');
const inputs = document.querySelectorAll('input');

inputs.forEach((input) => {
  input.addEventListener('input', () => {
    input.classList.remove('input-error');

    const errorText = input.parentElement.querySelector('.error-message');
    errorText.textContent = '';
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const { fullName, phoneNumber, email, password, confirmPassword } =
    form.elements;

  validateRequired(fullName, 'Name is required');
  validateRequired(phoneNumber, 'Phone number is required');
  validateRequired(email, 'Email is required');
  validateEmail(email, 'Use a proper email address');
  validateRequired(password, 'Password is required');
  validateRequired(confirmPassword, 'Please confirm your password');
  validatePassword(confirmPassword, password, 'Passwords do not match');
});

function validateRequired(input, message) {
  if (input.value.trim() === '') {
    setError(input, message);
  } else {
    setSuccess(input);
  }
}

function validateEmail(input, message) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(input.value)) {
    setError(input, message);
  } else {
    setSuccess(input);
  }
}

function validatePassword(confirmPassword, password, message) {
  // let validateRequired handle empty
  if (confirmPassword.value.trim() === '') return;

  if (password.value !== confirmPassword.value) {
    setError(confirmPassword, message);
  } else {
    setSuccess(confirmPassword);
  }
}

function setError(input, message) {
  const formGroup = input.parentElement;
  const errorDisplay = formGroup.querySelector('.error-message');

  errorDisplay.textContent = message;

  input.classList.add('input-error');
  input.classList.remove('input-success');
}

function setSuccess(input) {
  const formGroup = input.parentElement;
  const errorDisplay = formGroup.querySelector('.error-message');

  errorDisplay.textContent = '';

  input.classList.remove('input-error');
  input.classList.add('input-success');
}
