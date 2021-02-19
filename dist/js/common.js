// GET ITEM MENU
const showItemMenu = () => {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
  console.log("ABC");
}
// SCROLL MENU
let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;
  if (currentScrollPos >= 99) {
    document.getElementById("menu").style.top = '0px'
    document.getElementById("menu").style.background = '#000'
  } else {
    document.getElementById("menu").style.top = '50px'
    document.getElementById("menu").style.background = ' rgba(0, 0, 0, .7)'
  }
}

window.addEventListener('load', function () {

  // CHECK USER
  const checkUser = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    let formLogin = document.getElementsByClassName("register-login");
    let showUser = document.getElementById('user');
    if (user != null) {
      formLogin[0].style.display = 'none';
      formLogin[1].style.display = 'none';
      showUser.innerHTML = `Hi ${user}`
    }
  }
  checkUser();
})
