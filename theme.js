// theme.js
// Light mode and dark mode.
// Dark mode is the normal look. For light mode we add the class "light"
// to the page, and style.css changes all the colors when that class is there.
// This file is loaded at the very top of every page, so the right colors show right away.


// put the saved theme on the page
if (localStorage.getItem("theme") === "light") {
  document.documentElement.classList.add("light");
}


// switches between light and dark mode, and remembers the choice
function toggleTheme() {
  if (localStorage.getItem("theme") === "light") {
    localStorage.setItem("theme", "dark");
    document.documentElement.classList.remove("light");
  } else {
    localStorage.setItem("theme", "light");
    document.documentElement.classList.add("light");
  }

  showThemeButton();
}


// the button says which mode you can switch TO
function showThemeButton() {
  let button = document.getElementById("theme-button");

  // some pages (like Log In) don't have the button
  if (button === null) {
    return;
  }

  if (localStorage.getItem("theme") === "light") {
    button.textContent = "Dark mode";
  } else {
    button.textContent = "Light mode";
  }
}
