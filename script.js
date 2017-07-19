var $saveBtn = $('.save-btn');
var $card = $('.card');
var $ideaTitle = $('#idea-title');
var $ideaBody = $('#idea-info');
var $qualityText;
var indexCardArray = [];

var IndexCard = function (title, body, id) {
  this.title = title;
  this.body = body;
  this.quality = 'swill';
  this.id = id || Date.now();
};

// populateIndexCardArray();
// populateDOM();

function build(newIndexCard) {
  var newTitle = newIndexCard.title;
  var newBody = newIndexCard.body;
  var newQuality = newIndexCard.quality;
  $('.bottom-container').prepend(
    `<article id="${this.id}" class="card">
     <h3 class="card-title" contenteditable="true">${newTitle}</h3>
     <div class="delete"></div>
     <p class="card-text" contenteditable="true">${newBody}</p>
     <div class="up-vote"></div>
     <div class="down-vote"></div>
     <p class="quality">quality: <span id="quality-text">${newQuality}</span></p>
   </article>`
  );
};

$saveBtn.click(function (e) {
  e.preventDefault();
  var title = $ideaTitle.val();
  var body = $ideaBody.val();
  var newIndexCard = new IndexCard(title, body);
  build(newIndexCard);
  indexCardArray.push(newIndexCard);
  addIndexCardToLocalStorage(newIndexCard);
  console.log(newIndexCard);
});

$('.bottom-container').on('click', '.delete', function () {
  $(this).parent().remove();
});

$('.bottom-container').on('click', '.up-vote', upVote);

function upVote() {
  // var $changeQuality = $('#quality-text').text();
  var $changeQuality = $(this).parent().find('span').text();
  if ($changeQuality === 'swill') {
    $(this).parent().find('span').text('plausible');
  } else if ($changeQuality === 'plausible') {
    $(this).parent().find('span').text('genius');
  }
}

$('.bottom-container').on('click', '.down-vote', function () {
  var $changeQuality = $(this).parent().find('span').text();
  if ($changeQuality === 'genius') {
    $(this).parent().find('span').text('plausible');
  } else if ($changeQuality === 'plausible') {
    $(this).parent().find('span').text('swill');
  }
});

function addIndexCardToLocalStorage(newIndexCard) {
  var stringifiedIndexCard = JSON.stringify(newIndexCard);
  localStorage.setItem(newIndexCard.id, stringifiedIndexCard);
};

function populateIndexCardArray() {
  var objectKeys = Object.keys(localStorage);
  console.log(objectKeys);
  objectKeys.forEach(function (uniqueId) {
    console.log(JSON.parse(localStorage[uniqueId]));
    indexCardArray.push(JSON.parse(localStorage[uniqueId]));
  });
}

//something is wrong - error about this JSON parse
function populateDOM() {
  var storedIdeas = JSON.parse(localStorage[uniqueId]);
  for (var i = 0; i < storedIdeas.length; i++) {
    build(storedIdeas[i]);
    console.log('populate dom!!!');
  }
}

$saveBtn.on('click', clearInputFields);

function clearInputFields() {
  $ideaTitle.val('');
  $ideaBody.val('');
};

$ideaBody.on('input', saveBtnOn);

function saveBtnOn() {
  $saveBtn.css('background-color', '#00a79d');
  $saveBtn.attr('disabled', false);
}

$('.search').on('keyup', runSearch);

function runSearch() {
  var search = $(this).val().toUpperCase();
  console.log('search is... ' + search);
  var searchedArray = indexCardArray.filter(function(newIndexCard) {
    return newIndexCard.title.toUpperCase().includes(search) || newIndexCard.body.toUpperCase().includes(search) || newIndexCard.quality.toUpperCase().includes(search);
  })
  $('.bottom-container').empty()
  console.log("should log array", searchedArray);
  for (var i = 0; i < searchedArray.length; i++) {
    build(searchedArray[i]);
  }
}
