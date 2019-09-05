$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // On click validate that the email and password are not blank
  signUpForm.on("submit", userData, function(event) {
    event.preventDefault();
    console.log("created", userData);
    var userData = {
      user: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.user || !userData.password) {
      return userData;
    }
    console.log(userData);
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.user, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    $.post("/api/create", {
      user: email,
      password: password
    })
      .then(function(data) {
        console.log(data);
        window.location.replace("");
        if (error) {
          throw error;
        }
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
