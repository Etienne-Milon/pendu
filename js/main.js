

const dictionnaire = ["Ski","Sot","Ton","Tic","Ardu","Âtre","Bits","Buna","Casé","Cire","Clip","Corse","Dock","Fado","Fées",
"Gang","Kaki","Regs","Rhum","Taie","Taux","Thym","Topa","Accès","Alfas","Aloès","Awalé","Banjo","Boeuf","Chéra","Escot",
"Guipa","Honni","Houez","Igloo","Iodas","Moult","Mucha","Muscs","Nicol","Seaux","Seuil","Shunt","Smalt","Toqua","Tyran","Vêtît",
"Volve","Acajou","Alephs","Azimut","Basson","Burine","Caïman","Cercle","Coccyx","Cornée","Faucon","Gospel","Guenon","Hormis","Menthe",
"Mulard","Notais","Nouais","Paginé","Pontil","Sabord","Séisme","Whisky","Yankee","Zipper"]

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const accents = "àâäéèêëîïôöüûÀÂÄÉÊËÈÎÏÔÖÜÛ";
const sansAccents = "aaaeeeeiioouuAAAEEEEIIOOUU";
const nbEssaiMax = 9;

let nbEssai = 1;

let keyboard = document.getElementById("keyboard");
let cacheDiv = document.getElementById("cache");
let imageDiv = document.getElementById("image");
let end = document.getElementById("end")
let img = document.createElement("img");
let retry = document.getElementById("retry")
retry.onclick = reset;
let cache = cacheDiv.innerText;
let motATrouver = "";
let gagne = false;

nouvellePartie();

function nouvellePartie(){
  setButtonsAlphabet();
  motATrouver = setMotATrouver();
  setCache(motATrouver);
  setImage();
  retry.style.display = "none";
}

function reset(){
  while(keyboard.firstChild){
    keyboard.removeChild(keyboard.lastChild)
  }
  cacheDiv.removeChild(cacheDiv.lastChild);
  motATrouver = "";
  cache = "";
  nouvellePartie();
  keyboard.style.display = "block";
  end.style.display= "none";
  nbEssai = 1;
  img.src = "img/1.png";
}


function setMotATrouver(){
  let random = Math.floor(Math.random()*dictionnaire.length);
  let motATrouver = dictionnaire[random];
  return motATrouver;
}

function setCache(mot){
  for (i in mot){
    cache += "_";
    cacheDiv.innerText = cache;
  }
}
function setImage(){
  if(nbEssai<nbEssaiMax) {
    img.src = "img/" + nbEssai + ".png";
    imageDiv.appendChild(img)
  }
}

function setButtonsAlphabet () {
  for (i in alphabet) {
    let btn = document.createElement("input");
    let lettre = alphabet.charAt(i)
    btn.type = "button";
    btn.value = lettre;
    btn.onclick = essayer;
    keyboard.appendChild(btn)
  }
}

function essayer(){
  let x = this.value;
  let mot = epureAccent(motATrouver)
  let newCache = "";
  let failed = true;
  for (let i = 0; i <= mot.length; i++){
    if (x === mot.substring(i,i+1)){
      newCache +=  motATrouver.substring(i,i+1);
      failed = false;
    }
    else {
      newCache += cache.substring(i, i + 1) ;
    }
  }
  if (failed == true & nbEssai<nbEssaiMax){
    nbEssai += 1;
    setImage()
  }
  this.disabled = true;
  cache = newCache;
  if(nbEssai == nbEssaiMax-1){
    gagne = false;
    end.innerText = "Vous avez perdu, le mot à trouver était : " + motATrouver;
    keyboard.style.display = "none";
    end.style.display = "block";
    retry.style.display = "block";
  }

  if(motATrouver == cache){
    gagne = true;
    end.innerText = "Vous avez gagné, bien le bravo !";
    keyboard.style.display = "none";
    end.style.display = "block";
    retry.style.display = "block";
  }
  console.log("lettre = " + x + " mot = " + motATrouver + " cache = " + cache);
  cacheDiv.innerText = cache ;
}

function epureAccent(mot){
  let newMot = "";
  for (x in mot){
    if (accents.includes(mot.charAt(x))){
      newMot += sansAccents.charAt(x);
    }
    else{
      newMot += mot.charAt(x);
    }
  }
  return newMot.toUpperCase();
}


