/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
/* borrowed from https://www.w3schools.com/howto/howto_js_dropdown.asp */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("inj-show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.inj-dropbtn')) {
    var dropdowns = document.getElementsByClassName("injector-dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('inj-show')) {
        openDropdown.classList.remove('inj-show');
      }
    }
  }
}