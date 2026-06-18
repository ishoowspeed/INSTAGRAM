var komorki = document.querySelectorAll(".komorka");
var tablicaKomorek = Array.from(komorki);
let lajki = 8433;

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

for (var i = 0; i < tablicaKomorek.length; i++) {
  (function(indeks) {
    tablicaKomorek[indeks].setAttribute("onclick", "otworz(" + indeks + ")");
  })(i);
}

var aktualnyIndeks = null;

function otworz(indeks) {
  aktualnyIndeks = indeks;

  var komorka = tablicaKomorek[indeks];
  var img = komorka.querySelector("img");
  var obszar = document.getElementById("modalZdjecieObszar");
  var napisModal = document.getElementById("modalNapis");
  var napisKomorka = komorka.querySelector(".napis-zastepczy");

  obszar.innerHTML = "";

  if (komorka.classList.contains("brak")) {
    var placeholder = document.createElement("div");
    placeholder.className = "modal-placeholder";
    placeholder.textContent = napisKomorka.textContent;
    obszar.appendChild(placeholder);
    napisModal.textContent = napisKomorka.textContent;
  } else {
    var noweZdjecie = document.createElement("img");
    noweZdjecie.src = img.src;
    noweZdjecie.alt = img.alt;
    obszar.appendChild(noweZdjecie);
    napisModal.textContent = img.alt;
  }

  document.getElementById("serceBtn").classList.remove("polubione");
  document.getElementById("serceBtn").textContent = "♡";
  document.getElementById("modalTlo").classList.add("otwarty");
}

function zamknij() {
  document.getElementById("modalTlo").classList.remove("otwarty");
}

document.getElementById("modalTlo").addEventListener("click", function(e) {
  if (e.target === this) {
    zamknij();
  }
});

document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    zamknij();
  }
});

function polub() {
  var serce = document.getElementById("serceBtn");
  if (serce.classList.contains("polubione")) {
    serce.classList.remove("polubione");
    serce.textContent = "♡";           // pusty serduszko
    document.getElementById("serceBtn").textContent = lajki - 1;
} else {
    serce.classList.add("polubione");
    serce.textContent = "❤️";
    document.getElementById("serceBtn").textContent = lajki + 1;
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
