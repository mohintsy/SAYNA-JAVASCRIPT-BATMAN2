/* GET VALUES OF FORM AND VERIFY */
const form = document.querySelector('form');
const closePopup = document.getElementById("close-popup");
const popupE = document.querySelector(".popup-error");
const popupM = document.querySelector(".popup-message");
const ul = document.getElementById("message-error")

form.addEventListener('submit', (event) => {
  removeLI(ul)
  event.preventDefault();
  const email = form.elements['email'].value;
  const accept = form.elements['accept'].checked;
  const type = form.elements['type'].value;
  const confirmation = form.elements['confirmation'].value;
  const message = form.elements['message'].value;
  if (isEmailValid(email) && accept && type != "" && confirmation != "" && message != "") {
    popupM.style.display = "block";
  } else {
    // Verify email
    if (!isEmailValid(email)) {
      const li = document.createElement('li');
      li.textContent = '(*) L\'addresse email que vous avez saisie n\'est pas valide!';
      ul.appendChild(li);
    }

    // Verify accept
    if (!accept) {
      const li = document.createElement('li');
      li.textContent = '(*) Vous devez accepter de recevoir l’actualité concernant les aventures de Batman';
      ul.appendChild(li);
    }

    // Verify type
    if (type == "") {
      const li = document.createElement('li');
      li.textContent = '(*) Veillez preciser la fréquence à laquelle vous souhaitez recevoir votre newsletter';
      ul.appendChild(li);
    }

    // Verify confirmation
    if (confirmation == "") {
      const li = document.createElement('li');
      li.textContent = '(*) Veillez confirmer que vous voulez recevoir ou non des news';
      ul.appendChild(li);
    }

    // Verify message
    if (message == "") {
      const li = document.createElement('li');
      li.textContent = '(*) Redigez votre message';
      ul.appendChild(li);
    }
    popupE.style.display = "block";
  }
});

// EMAIL VALIDATON FUNCTION
function isEmailValid(email) {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
}

// REMOVE ALL ITEMS OF AN UL
function removeLI(ul) {
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
}

closePopup.addEventListener("click", function() {
  removeLI(ul)
  popupE.style.display = "none";
});

/**
 SCROLL TO HEROS AND ENEMY 
 */
// Get buttons
const scrollToHeros = document.getElementById('scroll-to-heros');
const scrollToEnemy = document.getElementById('scroll-to-enemy');

// Get destinations
const heros = document.getElementById('heros');
const enemy = document.getElementById('enemy');

// Functions scroll
scrollToHeros.addEventListener('click', ()=> {
  window.scrollTo({
    top: heros.offsetTop,
    behavior: 'smooth'
  });
})

scrollToEnemy.addEventListener('click', ()=>{
  window.scrollTo({
    top: enemy.offsetTop,
    behavior: 'smooth'
  })
})

// VIDEO
function pauseOrPlay() {
  var playerIcon = document.getElementById('player-icon');
  var video = document.getElementById('video');
  if (video.paused) {
    playerIcon.style.display = "none";
  } else {
    playerIcon.style.display = "block";
  }
}