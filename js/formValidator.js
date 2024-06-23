class FormValidator {
  constructor(form) {
    this.form = form;
    this.fields = form.querySelectorAll("input");
    this.errors = {};

    this.fields.forEach((field) => {
      this.errors[field.name] = "";
    });

    this.init();
  }

  init() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  handleSubmit(e) {
    e.preventDefault();
    let isValid = true;

    this.fields.forEach((field) => {
      const error = this.validateField(field);

      if (error) {
        isValid = false;
        this.showError(field, error);
      } else {
        this.clearError(field);
      }
    });

    if (isValid) {
      // handle submit here
      console.log("Submitted.Login Success!");
    }
  }

  handleFieldInput(e) {
    const field = e.target;
    const error = this.validateField(field);

    if (error) {
      this.showError(field, error);
    } else {
      this.clearError(field);
    }
  }

  validateField(field) {
    const value = field.value.trim();
    let error = "";

    if (field.name === "email" && !this.isValidEmail(value)) {
      error = "Email invalid";
    } else if (field.name === "password" && value.length < 6) {
      error = "Password incorrect";
    }

    this.errors[field.name] = error;

    return error;
  }

  isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return re.test(email);
  }

  showError(field, error) {
    const errorElement = document.getElementById(`${field.name}Error`);
    errorElement.textContent = error;
    errorElement.style.display = "block";
  }

  clearError(field) {
    const errorElement = document.getElementById(`${field.name}Error`);
    errorElement.textContent = "";
    errorElement.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  new FormValidator(form);
});
