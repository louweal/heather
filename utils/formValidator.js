export function validateForm(form) {
  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();
      event.stopPropagation();

      Array.from(form.elements).forEach((input) => {
        console.log(input.type); // todo custom checks
        // input.setCustomValidity("invalid");
      });
    },
    false
  );

  return form.checkValidity();
}
