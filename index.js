const findRhymes = () => {
  const wordInput = document.getElementById("wordInput");
  const rhymesResult = document.getElementById("rhymesResult");

  rhymesResult.innerHTML = "";

  const inputWord = wordInput.value.trim().toLowerCase();

  // const apiKey=
  const apiUrl = `https://wordsapiv1.p.mashape.com/words/${inputWord}/rhymes`;
  const headers = {
    "X-Mashape-Key": apiKey,
    Accept: "application/json",
  };

  if (inputWord == "") {
    const W = document.createElement("W");
    W.textContent = "Please Enter A Word";
    rhymesResult.appendChild(W);
  } else {
    fetch(apiUrl, { method: "GET" }, { headers })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Error ${response.status} - ${response.statusText}`);
        }
      })
      .then((rhymesData) => {
        console.log(rhymesData);
      })
      .catch((error) => {
        console.error(`An error occurred: ${error.message}`);
      });
  }
};

// function findRhymes() {
//   const wordInput = document.getElementById("wordInput");
//   const rhymesResult = document.getElementById("rhymesResult");

//   // Clear previous results
//   rhymesResult.innerHTML = "";

//   // Get the input word
//   const inputWord = wordInput.value.trim().toLowerCase();

//   // if (inputWord === "") {
//   //   // Display a message if the input is empty
//   //   const p = document.createElement("p");
//   //   p.textContent = "Please enter a word";
//   //   rhymesResult.appendChild(p);
//   // } else {
//   //   // Convert input word to phonetic representation
//   //   const phoneticRepresentation = convertToPhonetic(inputWord);
//   //   // Insert the word into the trie
//   //   insertWord(root, phoneticRepresentation);
//   //   // Search for rhymes in the trie
//   //   const rhymes = searchRhymes(root);
//   //   // Display rhymes in the result container
//   //   if (rhymes.length > 0) {
//   //     rhymes.forEach((rhyme) => {
//   //       const p = document.createElement("p");
//   //       p.textContent = rhyme;
//   //       rhymesResult.appendChild(p);
//   //     });
//   //   } else {
//   //     const p = document.createElement("p");
//   //     p.textContent = "No rhymes found.";
//   //     rhymesResult.appendChild(p);
//   //   }
//   // }
// }
