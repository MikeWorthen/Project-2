$(document).ready(function() {
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    console.log(event);
    event.preventDefault();
    var userData = {
      user: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.user || !userData.password) {
      return;
    }
    // If we have an user and password we run the loginUser function and clear the form
    loginUser(userData.user, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      user: email,
      password: password
    })
      .then(function() {
        window.location.replace("/profile");
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});
