const images = [
{
	"id": 1,
	"image": "Batgame_3.png",
	"illustrations": [],
	"question": "Quel est l’autre nom de l’Homme-Mystère ?"
},
{
	"id": 2,
	"image": "Batgame_4.png",
	"illustrations": [],
	"question": "Quelle est l’ancienne profession de Harley Quinn ?"
},
{
	"id": 3,
	"image": "Batgame_5.png",
	"illustrations": [],
	"question": "Quel est l’objet fétiche de Double Face ?"
},
{
	"id": 4,
	"image": "Batgame_6.png",
	"illustrations": [],
	"question": "Qui a realisé Batman en 1966 ?"
},
{
	"id": 5,
	"image": "Batgame_7.png",
	"illustrations": [],
	"question": "Batman c’est aussi le nom d’une ville en..."
},
{
	"id": 6,
	"image": "Batgame_8.png",
	"illustrations": [{"img": "Batgame_9.png", "left": "4em", "top": "75%", "width": "20%"}, {"img": "Batgame_9-1.png", "left": "80%", "top": "70%", "width": "15%"}],
	"question": "Quel vilain apparaît pour la première fois dans le Batman 232 ?"
},
{
	"id": 7,
	"image": "Batgame_10.png",
	"illustrations": [],
	"question": "Quelle ville Batman défend-il ?"
},
{
	"id": 8,
	"image": "Batgame_11.png",
	"illustrations": [],
	"question": "Tim Burtin a réalisé deux Batman, qui jouait Batman ?"
},
{
	"id": 9,
	"image": "Batgame_12.png",
	"illustrations": [{"img": "Batgame_13-1.png", "left": "10%", "top": "67%", "width": "17%"}, {"img": "Batgame_13.png", "left": "70%", "top": "65%", "width": "17%"}],
	"question": "Dans son premier Batman (1989) Jack Nicholson jouait :"
},
{
	"id": 10,
	"image": "Batgame_14.png",
	"illustrations": [{"img": "Batgame_15.png", "left": "60%", "top": 0, "width": "20%"}, {"img": "Batgame_16.png", "left": "67%", "top": "73%", "width": "15%"}],
	"question": "Qui est Jonathan Crane ? "
},
{
	"id": 11,
	"image": "Batgame_17.png",
	"illustrations": [],
	"question": "Qui est l’interprète de Catwoman dans le nouveau Batman de Matt Reeves (2022) ?"
},
{
	"id": 12,
	"image": "Batgame_18.png",
	"illustrations": [],
	"question": "Quel est le prénom des parents du jeune Bruce Wayne ?"
},
{
	"id": 13,
	"image": "Batgame_19.png",
	"illustrations": [],
	"question": " Qui interprète le Joker en 2008 ?"
},
{
	"id": 14,
	"image": "Batgame_20.png",
	"illustrations": [],
	"question": "En quelle année Robin fait il sa première apparition ?"
},
{
	"id": 15,
	"image": "Batgame_21.png",
	"illustrations": [],
	"question": "Qui est la fille de Batman et Catwoman (Earth - 2) ?"
}
];
let gameData = [];

// GET DATA FROM API
fetch('https://batman-api.sayna.space/questions')
.then(res => res.json())
.then(data => {
	// affect value of data to gameData
	data[0].response[1].isGood = false;
	data[0].response[2].isGood = false;
	data[4].response[2].isGood = true;
	gameData = data;
})
.catch(error => {
  // Handle any errors
  console.log(error);
});

/**
 * |CREATE UTILS VARIABLES
 */
let progress = 0;
let start = document.getElementById('start');
let game = document.getElementById('game');
let progression = document.getElementById('progression');
let question = document.getElementById('question');
let imageContent = document.getElementById('image');
let choices = document.getElementById('choices');
let illustrations = document.getElementById('illustrations');
let formRes = document.getElementById('form-res');
let popupE = document.querySelector(".popup-error");
let currentResponse = null;
// POP UP
let popupTitle = document.getElementById('popup-title');
let popupMessage = document.getElementById('popup-message');
let restartQuiz = document.getElementById('restart-quiz');
// BTN
let btnStart = document.getElementById('btn-start');
let btnNext = document.getElementById('btn-next');


function changeContent(game) {
	// DELETE ALL PREVIOUS ELEMENTS
	currentResponse = game.response;
	choices.innerHTML = "";
	imageContent.innerHTML = "";
	illustrations.innerHTML = "";
	// CHANGE THE VALUE OF PROGRESS TO CURRENT PROGRESS
	progression.innerHTML = progress + 1;
	// CHANGE THE VALUE OF QUESTION TO CURRENT QUESTION
	question.innerHTML = game.question;
	// CREATE IMAGE ELEMENT
	let image = document.createElement('img');
	// SET STYLES AND SOURCE FOR IMAGE
	image.style.opacity = '0';
  image.style.transform = 'scale(0)';
  image.style.transition = 'opacity 3s ease, transform 3s ease';
  imageContent.appendChild(image);
  let img = images.find(x => x.question === game.question)
	image.setAttribute('src', "./assets/images/game/"+ img.image);
	// DEFINE IMAGE ANIMATION
	setTimeout(() => {
  	// Modifier les styles pour l'effet fade-zoom
  	image.style.opacity = '1';
  	image.style.transform = 'scale(1)';
	}, 100);
	// CHOICES LIST
	for(let i=0; i<game.response.length; i++) {
		let li = document.createElement('li');
		let input = document.createElement('input');
		input.setAttribute('type', 'checkbox');
		input.setAttribute('name', game.response[i].text);
		input.addEventListener('change', function(event) {
  		event.stopPropagation(); // Arrête la propagation de l'événement de la case à cocher
  		input.checked = !input.checked;
		});
		let span = document.createElement('span');
		span.textContent = game.response[i].text;
		li.appendChild(input);
		li.setAttribute('class', 'fade-in-right cursor-pointer')
		li.appendChild(span);
		li.addEventListener('click', ()=>{
			input.checked = !input.checked;
		});
		choices.appendChild(li);
	}
	// ILLUSTRATION IMAGES
	for(let i=0; i<img.illustrations.length; i++) {
		let ill = document.createElement('img');
		ill.setAttribute('src', "./assets/images/game/"+ img.illustrations[i].img);
		ill.style.position = 'absolute';
		ill.style.left = img.illustrations[i].left;
		ill.style.top = img.illustrations[i].top;
		ill.style.width = img.illustrations[i].width;
		ill.style.opacity = '0';
  	ill.style.transform = 'scale(0)';
  	ill.style.transition = 'opacity 3s ease, transform 3s ease';
  	setTimeout(() => {
  		// Modifier les styles pour l'effet fade-zoom
  		ill.style.opacity = '1';
  		ill.style.transform = 'scale(1)';
		}, 100);
		illustrations.appendChild(ill);
	}
	progress += 1;
}


btnStart.addEventListener('click', ()=> {
	if (gameData.length > 0){
		changeContent(gameData[progress]);
		start.style.display = 'none';
		game.style.display = 'block';
	}
});


restartQuiz.addEventListener('click', ()=> {
	// Hide pop up and show start
	popupE.style.display = 'none';
	start.style.display = 'block';
	game.style.display = "none";
	progress = 0;
	// Initialize road
	currentResponse = null;
});


function showPopup(t, m) {
	popupE.style.display = 'block';
	popupTitle.innerHTML = t;
	popupMessage.innerHTML = m;
}


function verifyAnswers(userResponse) {
	let res = true;
	for(let i=0; i<userResponse.length; i++) {
		if(!currentResponse.find(x => x.text === userResponse[i]).isGood){
			res = false;
			break;
		}
	}
	return res;
}

btnNext.addEventListener('click', next);

function next() {
	// ADD USER RESPONSES TO ARRAY USERRESPONSES
	const checkboxes = formRes.querySelectorAll('input[type="checkbox"]:checked');
	const checkedNames = Array.from(checkboxes).map(checkbox => checkbox.name);
	// VERIFY USER RESPONSE
	if(!verifyAnswers(checkedNames)) {
			// SHOW POPUP WITH THIS MESSAGE IF PROGRESS LESS THAN SIX
		if (progress < 4){
			showPopup(progress +"/"+ gameData.length +" C'EST PAS TOUT A FAIT CA...", "Oula, Heuresement que le Riddler est sous les verrous.. Il faut que vous vous repassiez les films, cette fois en enlevant peut-être le masque qui vous a bloqué la vue ! Aller, rien n'est perdu");
			// SHOW POPUP WITH MESSAGE IF PROGRESS LESS THAN ELEVEN
		} else if (progress < 8){
			showPopup(progress +"/"+ gameData.length +" PAS MAL !", "Encore un peu d'entrainement avec le Chevalier Noir vous serait benefique, mais vous pouvez marcher la tete haute de vos connaissances sont la. A vous de les consolider, foncez Gotham est votre terrain de chasse !");
			// SHOW POPUP WITH MESSAGE IF PROGRESS GREATER THAN ELEVEN
		} else {
			showPopup(progress +"/"+ gameData.length +" PRESQUE !", "Vous y etiez presque ! Ne baissez pas le bras... Encore un peu d'effort et vous y arriverez!");
		}

	} else {
		if (progress === 12) {
			showPopup(progress +"/"+ gameData.length +" PAS MAL !", "Vous etes veritablement un super fan de l'univers Batman! <br> Comics, films, rien ne vous echappe. Bruce Wayne a de quoi etre fier, Gotham est en paix et Batman peut prendre sa retraite, vous veillez aux grains");
		} else {
			// SHOW NEXT IF USER ANSWERS ARE ALLRIGHT
			changeContent(gameData[progress]);
		}
	}
}

