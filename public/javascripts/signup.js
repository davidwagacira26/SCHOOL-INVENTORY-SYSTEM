document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('signupForm');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const passwordError = document.getElementById('passwordError');

  form.addEventListener('submit', function(event) {
    if (passwordInput.value !== confirmPasswordInput.value) {
      event.preventDefault();
      passwordError.textContent = 'Passwords do not match';
    } else {

    }
  });

  confirmPasswordInput.addEventListener('input', function() {
    passwordError.textContent = '';
  });

  function validateForm() {
    var inputs = document.querySelectorAll('input[required]');
    for (var i = 0; i < inputs.length; i++) {
      if (!inputs[i].value) {
        alert("Please fill out all fields.");
        return false;
      }
    }
    return true;
  }
});
