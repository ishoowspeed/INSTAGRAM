var komorki = document.querySelectorAll(".komorka");
var tablicaKomorek = Array.from(komorki);
let lajki = 8433;
let polubione = false;

// Tasowanie
var kolejnosc = [];
for (var i = 0; i < tablicaKomorek.length; i++) {
  kolejnosc.push(i);
}
for (var i = kolejnosc.length - 1; i > 0; i--) {
  var j = Math.floor(Math.random() * (i + 1));
  var temp = kolejnosc[i];
  kolejnosc[i] = kolejnosc[j];
  kolejnosc[j] = temp;
}
var siatka = document.getElementById("siatka");
for (var i = 0; i < kolejnosc.length; i++) {
  siatka.appendChild(tablicaKomorek[kolejnosc[i]]);
}

// Przypisanie kliknięć po tasowaniu
var posortowane = document.querySelectorAll(".komorka");
for (var i = 0; i < posortowane.length; i++) {
  (function(el, idx) {
    el.onclick = function() { otworz(idx); };
  })(posortowane[i], i);
}

var aktualnyIndeks = null;
var tablicaDOM = Array.from(posortowane);

function otworz(indeks) {
  aktualnyIndeks = indeks;
  var komorka = tablicaDOM[indeks];
  var img = komorka.querySelector("img");
  var obszar = document.getElementById("modalZdjecieObszar");
  var napisKomorka = komorka.querySelector(".napis-zastepczy");

  obszar.innerHTML = "";

  if (komorka.classList.contains("brak")) {
    var placeholder = document.createElement("div");
    placeholder.className = "modal-placeholder";
    placeholder.textContent = napisKomorka.textContent;
    obszar.appendChild(placeholder);
  } else {
    var noweZdjecie = document.createElement("img");
    noweZdjecie.src = img.src;
    noweZdjecie.alt = img.alt;
    obszar.appendChild(noweZdjecie);
  }

  polubione = false;
  var serce = document.getElementById("serceBtn");
  serce.classList.remove("polubione");
  serce.textContent = "♡ " + lajki;

  document.getElementById("modalTlo").classList.add("otwarty");
}

function zamknij() {
  document.getElementById("modalTlo").classList.remove("otwarty");
}

document.getElementById("modalTlo").addEventListener("click", function(e) {
  if (e.target === this) zamknij();
});

document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") zamknij();
});

function polub() {
  var serce = document.getElementById("serceBtn");
  if (polubione) {
    polubione = false;
    lajki--;
    serce.classList.remove("polubione");
    serce.textContent = "♡ " + lajki;
  } else {
    polubione = true;
    lajki++;
    serce.classList.add("polubione");
    serce.textContent = "❤️ " + lajki;
  }
}

function pokazZakladke(nazwa, btn) {
  document.getElementById("siatka").style.display = nazwa === "galeria" ? "grid" : "none";
  document.getElementById("aktualnosci").style.display = nazwa === "aktualnosci" ? "block" : "none";
  var wszystkieZakladki = document.querySelectorAll(".zakladka");
  for (var i = 0; i < wszystkieZakladki.length; i++) {
    wszystkieZakladki[i].classList.remove("aktywna");
  }
  btn.classList.add("aktywna");
}
