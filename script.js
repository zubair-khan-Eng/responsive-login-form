const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const statusMsg = document.getElementById("statusMsg");
const togglePassword = document.getElementById("togglePassword");
const submitBtn = document.getElementById("submitBtn");

function showError(element, message) {
  element.textContent = message;
}

function clearError(element) {
  element.textContent = "";
}

function isEmailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateFields() {
  let valid = true;
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  clearError(emailError);
  clearError(passwordError);
  statusMsg.textContent = "";
  statusMsg.className = "status-msg";

  if (!email) {
    showError(emailError, "Email is required.");
    valid = false;
  } else if (!isEmailValid(email)) {
    showError(emailError, "Enter a valid email address.");
    valid = false;
  }

  if (!password) {
    showError(passwordError, "Password is required.");
    valid = false;
  } else if (password.length < 6) {
    showError(passwordError, "Password must be at least 6 characters.");
    valid = false;
  }

  return valid;
}

togglePassword.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  togglePassword.textContent = isPassword ? "Hide" : "Show";
  togglePassword.setAttribute(
    "aria-label",
    isPassword ? "Hide password" : "Show password"
  );
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!validateFields()) return;

  submitBtn.disabled = true;
  submitBtn.textContent = "SIGNING IN...";

  // Simulate API call delay for UI feedback.
  await new Promise((resolve) => setTimeout(resolve, 1100));

  statusMsg.textContent = "Login successful. Redirecting...";
  statusMsg.className = "status-msg ok";

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = "SIGN IN";
    loginForm.reset();
    passwordInput.type = "password";
    togglePassword.textContent = "Show";
    togglePassword.setAttribute("aria-label", "Show password");
  }, 900);
});

[emailInput, passwordInput].forEach((input) => {
  input.addEventListener("input", () => {
    if (input === emailInput) clearError(emailError);
    if (input === passwordInput) clearError(passwordError);
  });
});
