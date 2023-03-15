const container = document.querySelector(".container");
const btn = document.getElementById("generatebtn");
let num = 1;

const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
};

const getPokeData = () => {
  let id = Math.floor(Math.random() * 150) + 1;
  const finalurl = `https://pokeapi.co/api/v2/pokemon/${id}`;
  fetch(finalurl)
    .then((response) => response.json())
    .then((data) => {
      generateCard(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const generateCard = (data) => {
  console.log(data);
  const hp = data.stats[0].base_stat;
  const imgSrc = data.sprites.other.dream_world.front_default;
  const pokeName =
    data.name.charAt(0).toUpperCase() + data.name.slice(1);
  const statAttack = data.stats[1].base_stat;
  const statDefense = data.stats[2].base_stat;
  const statSpeed = data.stats[5].base_stat;
  const themeColor = typeColor[data.types[0].type.name];
  console.log(themeColor);

  let card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <p class="hp">
      <span>HP</span>
      ${hp}
    </p>
    <img src="${imgSrc}" alt="pokemon-images" class="poke-img">
    <h2 class="poke-name">${pokeName}</h2>
    <div class="poke-types numtype${num}">
    
    </div>
    <div class="stats">
      <div>
        <h3>${statAttack}</h3>
        <p>Attack</p>
      </div>
      <div>
        <h3>${statDefense}</h3>
        <p>Defense</p>
      </div>
      <div>
        <h3>${statSpeed}</h3>
        <p>Speed</p>
      </div>
    </div>
  `;

  container.appendChild(card);

  data.types.forEach((item) => {
    let appendType = document.createElement("span");
    appendType.textContent = item.type.name;
    document.querySelector(`.numtype${num}`).appendChild(appendType);
  });

  card.style.background = `radial-gradient(circle at 50% 0%, ${themeColor} 36%, #ffffff 36%)`;
  card.querySelectorAll(".poke-types span").forEach((type) => {
    type.style.backgroundColor = themeColor;
  });

  num++;
};

btn.addEventListener("click", getPokeData);
window.addEventListener("load", getPokeData);
