const form = document.getElementById('rhyme-finder');
const wordInput = document.getElementById('word-input');
const findRhymesButton = document.getElementById('find-rhymes-button');
const rhymeList = document.getElementById('rhyme-list');

function getRhymes(word) {
  const url = `https://api.rhymebrain.com/talk?function=getRhymes&word=${word}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      rhymeList.innerHTML = '';
      data.forEach(rhyme => {
        const li = document.createElement('li');
        li.textContent = rhyme.word;
        rhymeList.appendChild(li);
      });
    });
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const word = wordInput.value.trim();
  if (word) {
    getRhymes(word);
  }
});