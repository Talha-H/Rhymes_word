class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}
function insertWord(root, phoneticRepresentation) {
  let node = root;

  for (let i = 0; i < phoneticRepresentation.length; i++) {
    const sound = phoneticRepresentation[i];

    // If the sound is not a child of the current node, create a new node
    if (!node.children[sound]) {
      node.children[sound] = new TrieNode();
    }

    // Move to the next node
    node = node.children[sound];
  }

  // Mark the end of the word
  node.isEndOfWord = true;
}






// Function to search for rhymes in the trie
function searchRhymes(root, phoneticRepresentation) {
  let node = root;

  // Traverse the trie based on the phonetic representation
  for (let i = 0; i < phoneticRepresentation; i++) {
    const sound = phoneticRepresentation[i];

    // If the sound is not a child of the current node, no rhymes found
    if (!node.children[sound]) {
      return [];
    }

    // Move to the next node
    node = node.children[sound];
  }

  // Recursively get all rhyming words starting from the current node
  return getAllRhymingWords(node, phoneticRepresentation);
}


// Helper function to get all rhyming words starting from a given node
function getAllRhymingWords(node, currentWord) {
  const rhymingWords = [];

  // If the current node represents the end of a word, add it as a rhyme
  if (node.isEndOfWord) {
    rhymingWords.push(currentWord);
  }

  // Recursively traverse all child nodes
  for (const sound in node.children) {
    const childNode = node.children[sound];
    const suffixRhymes = getAllRhymingWords(childNode, currentWord + sound);
    rhymingWords.push(...suffixRhymes);
  }

  return rhymingWords;
}

const root = new TrieNode(
  "https://introcs.cs.princeton.edu/java/data/wordlist.txt"
);

// Fetch the phonetic mapping from an external source
async function fetchPhoneticMapping() {
  const response = await fetch('https://introcs.cs.princeton.edu/java/data/wordlist.txt');
  const data = await response.text();

  // Parse the data and create a phonetic mapping
  const lines = data.split('\n');
  const phoneticMapping = {};

  lines.forEach(line => {
      const [word, phonetic] = line.split(' ');
      phoneticMapping[word.toLowerCase()] = phonetic;
  });

  return phoneticMapping;
}

async function convertToPhonetic(word) {
  const phoneticMapping = await fetchPhoneticMapping();

  // Convert each character to its phonetic sound using the mapping
  const phoneticRepresentation = word
      .toLowerCase()
      .split('')
      .map(character => phoneticMapping[character] || character)
      .join('-');

  return phoneticRepresentation;
}


function findRhymes() {
  const wordInput = document.getElementById("wordInput");
  const rhymesResult = document.getElementById("rhymesResult");

  // Clear previous results
  rhymesResult.innerHTML = "";

  // Get the input word
  const inputWord = wordInput.value.trim().toLowerCase();

  if (inputWord === "") {
    // Display a message if the input is empty
    const p = document.createElement("p");
    p.textContent = "Please enter a word.";
    rhymesResult.appendChild(p);
  } else {
    // Convert input word to phonetic representation
    const phoneticRepresentation = convertToPhonetic(inputWord);
    // console.log(`phoneticRepresentation of ${inputWord} is ${phoneticRepresentation}`)
    // Insert the word into the trie
    insertWord(root, phoneticRepresentation);
    // Search for rhymes in the trie
    const rhymes = searchRhymes(root);
    // Display rhymes in the result container
    if (rhymes.length > 0) {
      rhymes.forEach((rhyme) => {
        const p = document.createElement("p");
        p.textContent = rhyme;
        rhymesResult.appendChild(p);
      });
    } else {
      const p = document.createElement("p");
      p.textContent = "No rhymes found.";
      rhymesResult.appendChild(p);
    }
  }
}
