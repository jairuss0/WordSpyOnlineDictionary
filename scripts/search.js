// get the input
const inputWord = document.getElementById("wordInput");
// search icon
const searchIcon = document.getElementById("search-icon");
// nav logo
const navLogo = document.querySelector(".nav-logo");

// result - section
const resultSection = document.querySelector(".result-section");
// result - container
const resultContainer = document.querySelector(".result-container");
const errorContainer = document.querySelector(".error-container");

// load the word attributes, meanings etc if user click the icon
searchIcon.addEventListener("click", (e) => {
  if (inputWord.value.length != 0) {
    e.preventDefault();

    location.replace("searchPage.html#searchedWord");
    getDataResponse();
  }
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
      displayErrorMessage();
    }
  }
}

// fetch the api
async function getApiResponse(word) {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    if (!response.ok) {
      console.log("Error: response Failed");
    }
    return await response.json();
  } catch (error) {
    displayErrorMessage();
  }
}

function displayData(dataResponse) {
  resultContainer.classList.remove("error-active"); // remove classlist incase this is added due to failed response
  errorContainer.style.display = "none";

  console.log(dataResponse);
  // create a destructiong array of object
  const WORD_ATTR = dataResponse[0];

  // set the searched word text content
  const definingWord = document.getElementById("search-word");
  if (WORD_ATTR.word) {
    definingWord.replaceChildren();
  }
  // emphasize the word
  const emphasis = document.createElement("em");
  definingWord.appendChild(emphasis);
  emphasis.textContent = WORD_ATTR.word;
  WORD = WORD_ATTR.word; // for the audio

  // display the phonetics
  displayPhonetics(WORD_ATTR);
  // display all the links possible of the word
  displayLinks(WORD_ATTR);

  // display all the part of speech definition, example
  // synonyms and antonyms
  displayDefinitions(WORD_ATTR);

  // display sentences
  displaySentences(WORD_ATTR);
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
    definitionContainer.setAttribute("id", meaning.partOfSpeech); // set the id of the divs for the scroll link
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

    // for each partOfSpeech definitions - create a card
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
        const italic = document.createElement("em");
        partofSpeechExample.appendChild(italic);
        italic.textContent = definition.example;
        //partofSpeechExample.textContent = definition.example;
      }
      // insert the card to the definition container
      definitionContainer.appendChild(partOfSpeechCard);
    });

    // create div element for the container for antonym and synonym
    const synonymContainer = document.createElement("div");
    synonymContainer.classList.add("synonyms-container");
    const antonymContainer = document.createElement("div");
    antonymContainer.classList.add("antonym-container");

    const synonymText = document.createTextNode("Synonym: ");
    // add the text node to the synonymContainer
    synonymContainer.appendChild(synonymText);
    const antonymText = document.createTextNode("Antonym: ");
    // add the text node to the synonymContainer
    antonymContainer.appendChild(antonymText);

    // create span element for each synonym and antonym
    meaning.synonyms.forEach((synonym) => {
      // -insert the container into the definition container
      definitionContainer.appendChild(synonymContainer);
      const synonymSpan = document.createElement("span");
      synonymSpan.classList.add("synonym");
      synonymSpan.textContent = synonym;
      synonymContainer.appendChild(synonymSpan);
    });

    meaning.antonyms.forEach((antonym) => {
      definitionContainer.appendChild(antonymContainer);
      const antonymSpan = document.createElement("span");
      antonymSpan.classList.add("antonym");
      antonymSpan.textContent = antonym;
      antonymContainer.appendChild(antonymSpan);
    });
  });
}

// get the links scroll container
const linksContainer = document.querySelector(".partOfSpeech-scroll");
function displayLinks(WORD_ATTR) {
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
    // set their href attributes
    // if it is noun,verb etc
    partOfSpeechLink.setAttribute("href", "#" + meaning.partOfSpeech);
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

// display ui for the Error 404 response of the api
function displayErrorMessage() {
  // remove the current element on the result-set
  resultContainer.classList.add("error-active");
  if (resultContainer) {
    errorContainer.replaceChildren();
    errorContainer.style.display = "block";
  }

  const errorBox = document.createElement("div");
  errorBox.classList.add("error-box-message");
  errorContainer.appendChild(errorBox);
  // append element to the errorContainer - img, p
  const errorImg = document.createElement("img");
  const message404 = document.createElement("p");
  const errorMessage = document.createElement("p");
  // define all the elements
  errorImg.classList.add("error-img");
  errorImg.src = "../assets/notFound..svg";
  message404.classList.add("error-404");
  message404.textContent = "404 Not Found";
  errorMessage.classList.add("error-message");
  errorMessage.textContent =
    "'Sorry pal, we couldn't find definitions for the word you were looking for.'";
  // append all the child elements to the error box
  errorBox.appendChild(errorImg);
  errorBox.appendChild(message404);
  errorBox.appendChild(errorMessage);
}

// no sentences message
const noMessageContainer = document.querySelector(".no-sentences-container");
let isSentencesAvailable;
// sentences content
function displaySentences(WORD_ATTR) {
  // get the "sentences" container
  const sentencesContent = document.querySelector(".sentences-content");

  if (WORD_ATTR) {
    sentencesContent.replaceChildren();
    // kind of refresh the elements that would be display every searching a word
  }

  WORD_ATTR.meanings.forEach((meaning) => {
    // create div for the sentences
    const sentencesContainer = document.createElement("div");
    sentencesContainer.classList.add("sentences-container");
    sentencesContent.appendChild(sentencesContainer);
    sentencesContainer.setAttribute("id", meaning.partOfSpeech); // set the id of the divs for the scroll link

    // create the card for every sentences
    meaning.definitions.forEach((definition) => {
      if (definition.example) {
        isSentencesAvailable = true;
        noMessageContainer.style.display = "none";
        const sentenceCard = document.createElement("div");
        sentenceCard.classList.add("sentences-card");
        const sentenceElement = document.createElement("p");
        // Define the word to be replaced and the HTML for the span element
        let sentenceString = definition.example;
        let wordToReplace = WORD_ATTR.word;
        let replacementHTML = `<span class="sentence-word">${wordToReplace}</span>`;
        // Create a regular expression to find the word, using 'gi' flag for global replacement and case-insensitive flag
        let regex = new RegExp(`\\b${wordToReplace}\\b`, "gi");
        // Replace the word with the span element
        let outputElement = sentenceString.replace(regex, replacementHTML);
        // set the innerHtml of the p element
        sentenceElement.innerHTML = outputElement;
        // then append it to the sentence card
        sentenceCard.appendChild(sentenceElement);
        // append the sentence card to the sentences container
        sentencesContainer.appendChild(sentenceCard);
      } else {
        isSentencesAvailable = false;
        
      }
    });
  });
}

// TABS - MEANING AND SENTENCES
// select the div where buttons reside
const tabs = document.querySelector(".buttons");
// select all the buttons - tab
const tabButtons = document.querySelectorAll(".button");
// select all the contents div
const contents = document.querySelectorAll(".contents");

tabs.addEventListener("click", (e) => {
  // get the value of the dataset of the button id
  const id = e.target.dataset.id;
  console.log(id);
  if (id) {
    tabButtons.forEach((tabButton) => {
      tabButton.classList.remove("active");
    });
    e.target.classList.add("active");
    // set all the contents to non-active
    contents.forEach((content) => {
      content.classList.add("non-active");
    });
    // remove the non-active to the content that is clicked
    const element = document.getElementById(id);
    element.classList.remove("non-active");

    // remove the links whenever user click tab sentence
    if (id === "sentences") {
      linksContainer.style.display = "none";
      if (!isSentencesAvailable) {
        noMessageContainer.style.display = "none";
      }
      
    } else {
      if (!isSentencesAvailable && id == "meanings") {
        noMessageContainer.style.display = "none";
      }
      else if(isSentencesAvailable && id === "sentences"){
        noMessageContainer.style.display = "none";
      }
      linksContainer.style.display = "flex";
    }
  }
});

// play the audio
wordAudio = document.getElementById("word-audio");
wordAudio.addEventListener("click", () => {
  var pronunciationAudio = new Audio(
    `https://ssl.gstatic.com/dictionary/static/sounds/20200429/${WORD}--_gb_1.mp3`
  );
  pronunciationAudio.play();
});

// shift to homePage
navLogo.addEventListener("click", () => {
  window.location = "../pages/home.html";
});

// when user press the enter on searching
// and the input is not empty
document.onkeyup = (e) => {
  if (e.key == "Enter" && inputWord.value.length != 0) {
    e.preventDefault();

    location.replace("searchPage.html#searchedWord");
    getDataResponse();
  }
};

/* TO-DO 
   2. tabs 
   3. homepage
*/
