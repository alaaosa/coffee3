$(document).ready(function () {
  $(".shopping").on("click", function () {
    $(".side-cart").toggleClass("active");
  });

  $("#close-cart").on("click",function(){
    $(".side-cart").toggleClass("active")
  })

});
