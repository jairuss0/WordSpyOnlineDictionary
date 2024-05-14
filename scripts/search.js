// get the input
const inputWord = document.getElementById("wordInput");
// search icon
const searchIcon = document.getElementById("search-icon");

// load the word attributes, meanings etc if user click the icon
searchIcon.addEventListener("click", (e) => {
  e.preventDefault();

  getDataResponse();
});

// load initial word
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const dataResponse = await getApiResponse("hello");
    displayData(dataResponse);
  } catch (error) {
    console.error(error);
  }
});

// get the response
async function getDataResponse() {
  const submittedWord = inputWord.value.toLowerCase();
  if (submittedWord) {
    try {
      const dataResponse = await getApiResponse(submittedWord);
      displayData(dataResponse);
    } catch (error) {
      console.error(error);
    }
  }
  // create error ui message
}
// fetch the api
async function getApiResponse(word) {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    if (!response.ok) {
      console.log("Error bitch");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

function displayData(dataResponse) {
  console.log(dataResponse);
  // create a destructiong array of object
  const WORD_ATTR = dataResponse[0];

  // set the searched word text content

  const definingWord = document.getElementById("search-word");
  definingWord.textContent = WORD_ATTR.word;

  // get the audio of the word pronounciation
  const pronounciationAudio = document.getElementById("word-audio");

  // display the phonetics
  displayPhonetics(WORD_ATTR);
  // display all the links possible of the word
  displayLinks(WORD_ATTR);

  // display all the part of speech definition, example
  // synonyms and antonyms
  displayDefinitions(WORD_ATTR);
}

function displayDefinitions(WORD_ATTR) {
  // get the "meanings" container
  const meaningContainer = document.querySelector(".meaning-content");
  
  if (WORD_ATTR) {
    meaningContainer.replaceChildren();
    // kind of refresh the elements that would be display every searching a word
  }

  WORD_ATTR.meanings.forEach((meaning) => {
    // create div element - definition container
    const definitionContainer = document.createElement("div");
    meaningContainer.appendChild(definitionContainer);
    definitionContainer.classList.add("definition-container");
    // create the partOfSpeech title, card
    // card - definition, example //
    // - part of speech title div
    const partOfSpeechTitle = document.createElement("div");
    partOfSpeechTitle.classList.add("partofSpeech-title");
    // - insert the partOfSpeechTitle to definition container
    definitionContainer.appendChild(partOfSpeechTitle);

    // create the title element
    const titlePartOfSpeech = document.createElement("span");
    partOfSpeechTitle.appendChild(titlePartOfSpeech); // append the title content to the title div
    titlePartOfSpeech.classList.add("title-partOfSpeech");
    titlePartOfSpeech.textContent = meaning.partOfSpeech;

    meaning.definitions.forEach((definition) => {
      // - definition card
      const partOfSpeechCard = document.createElement("div");
      // - definition content element
      const partOfSpeechDefinition = document.createElement("span");
      // definition
      partOfSpeechCard.appendChild(partOfSpeechDefinition);
      partOfSpeechCard.classList.add("partOfSpeech-card");

      // set the child element of the card - definition
      partOfSpeechDefinition.classList.add("partOfSpeech-definition");
      partOfSpeechDefinition.textContent = definition.definition;

      // create element for the example if it exist
      if (definition.example) {
        const partofSpeechExample = document.createElement("span");
        partOfSpeechCard.appendChild(partofSpeechExample);
        partofSpeechExample.classList.add("partOfSpeech-example-sentence");
        partofSpeechExample.textContent = definition.example;
      }
      // insert the card to the definition container
      definitionContainer.appendChild(partOfSpeechCard);
    });
  });
}

function displayLinks(WORD_ATTR) {
  // get the links scroll container
  const linksContainer = document.querySelector(".partOfSpeech-scroll");

  if (WORD_ATTR) {
    linksContainer.replaceChildren();
    // kind of refresh the elements that would be display every searching a word
  }

  WORD_ATTR.meanings.forEach((meaning) => {
    // create a tag element for each part of speech
    const partOfSpeechLink = document.createElement("a");
    partOfSpeechLink.classList.add("link-partOfSpeech");
    partOfSpeechLink.textContent = meaning.partOfSpeech;
    linksContainer.appendChild(partOfSpeechLink);
    // create condition to set their href attributes
    // if it is noun,verb etc
  });
}

function displayPhonetics(WORD_ATTR) {
  // get the phonetics container
  const phoneticContainer = document.querySelector(".phonetics");

  if (WORD_ATTR) {
    phoneticContainer.replaceChildren();
    // kind of refresh the phonetics that would be display every searching a word
  }

  WORD_ATTR.phonetics.forEach((phonetic) => {
    // create span for each phonetics of the word
    // will only display the text attribute of the phonetics array of object
    if (phonetic.text) {
      const phoneticSpan = document.createElement("span");
      phoneticSpan.classList.add("phonetics-span");
      phoneticSpan.textContent = phonetic.text + " ";
      phoneticContainer.appendChild(phoneticSpan);
    }
  });
}

// when user press the enter on searching
// and the input is not empty
document.onkeyup = (e) => {
  if (e.key == "Enter" && inputWord.value.length != 0) {
    getDataResponse();
  }
};
