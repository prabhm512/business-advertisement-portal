$(document).ready(() => {
  // Getting references to our form and inputs
  const loginForm = $("form.login");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");
  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", event => {
    event.preventDefault();
    const adminData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!adminData.email || !adminData.password) {
      return;
    }
    // If we have an email and password we run the loginAdmin function and clear the form
    loginAdmin(adminData.email, adminData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginAdmin does a post to our "api/login" route and if successful, redirects us the the members page
  function loginAdmin(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      // eslint-disable-next-line prefer-arrow-callback
      .then(log => {
        console.log(log);
        window.location.replace("/admin");
        // If there's an error, log the error
      })
      // eslint-disable-next-line prefer-arrow-callback
      .catch(err => {
        console.log(err);
      });
  }
});
