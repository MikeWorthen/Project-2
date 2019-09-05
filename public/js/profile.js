$(document).ready(function() {
  $.get("/api/userData").then(function(data) {
    $(".member-name").text(data.user);
  });
});
