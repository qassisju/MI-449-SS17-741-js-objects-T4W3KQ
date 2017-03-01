// ----
// DATA
// ----

// A couple jokes to start with
var jokes = {
  'the horse': {
    setup: 'A horse walks into the bar. The bartender asks...',
    punchline: 'Why the long face?'
  },
  'Orion\'s pants': {
    setup: 'How does Orion keep his pants up?',
    punchline: 'With an asteroid belt.'
  }
}

// The message to display if the jokes object is empty
var noJokesMessage = 'I... I don\'t know any jokes. 😢'

// -------------
// PAGE UPDATERS
// -------------

// Update the listed jokes, based on the jokes object
var jokesMenuList = document.getElementById('jokes-menu')
var updateJokesMenu = function () {
  // Don't worry too much about this code for now.
  // You'll learn how to do advanced stuff like
  // this in a later lesson.
  var jokeKeys = Object.keys(jokes)
  var jokeKeyListItems = jokeKeys.join('</li><li>') || noJokesMessage
  jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
}

// Update the displayed joke, based on the requested joke
var requestedJokeInput = document.getElementById('requested-joke')
var jokeBox = document.getElementById('joke-box')
var deletedJokeButton = document.getElementById('deletedJokeButton')
var newJokeButton = document.getElementById('newJokeButton')
var updateDisplayedJoke = function () {
  var requestedJokeKey = requestedJokeInput.value
  var jokeContent = jokes[requestedJokeKey]
  if (jokeContent === undefined) {
    jokeBox.textContent = noJokesMessage
  } else {
    var setupParagraph = '<p>' + jokeContent['setup'] + '</p>'
    var punchlineParagraph = '<p>' + jokeContent['punchline'] + '</p>'
    jokeBox.innerHTML = setupParagraph + punchlineParagraph
    updateJokes()
  }
}

var deleteJoke = function () {
  var deletedJokeInput = document.getElementById('deletedJokeInput')
  var deletedJokeKey = deletedJokeInput.value
  var jokeContent = jokes[deletedJokeKey]
  if (jokeContent === undefined) {
    window.alert('That joke is not here')
  } else {
    delete jokes[deletedJokeKey]
    console.log('It worked')
  }
  updateJokes()
}

// Function to keep track of all other
// page update functions, so that we
// can call them all at once
var updatePage = function () {
  updateJokesMenu()
  updateDisplayedJoke()
}

var addJoke = function () {
  var newJokeInput = document.getElementById('newJokeInput')
  var newJokeKey = newJokeInput.value
  var newJokeSetupInput = document.getElementById('newJokeSetup')
  var newJokeSetup = newJokeSetupInput.value
  var newJokePunchlineInput = document.getElementById('newJokePunchlineInput')
  var newJokePunchline = newJokePunchlineInput.value
  jokes[newJokeKey] = {
    setup: newJokeSetup,
    punchline: newJokePunchline
  }
  updateJokes()
  window.alert('The joke has been added')
}

var updateJokes = function () {
  var stringJokes = JSON.stringify(jokes)
  window.localStorage.setItem('jokes', stringJokes)
  updatePage()
}

// -------
// STARTUP
// -------

// Update the page immediately on startup
updatePage()
updateJokes()

// ---------------
// EVENT LISTENERS
// ---------------

// Keep the requested joke up-to-date

requestedJokeInput.addEventListener('input', updateDisplayedJoke)
deletedJokeButton.addEventListener('click', deleteJoke)
newJokeButton.addEventListener('click', addJoke)
