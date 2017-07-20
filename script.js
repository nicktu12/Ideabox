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

populateIndexCardArray();

function populateIndexCardArray() {
  var objectKeys = Object.keys(localStorage);
  objectKeys.forEach(function (uniqueId) {
    indexCardArray.push(JSON.parse(localStorage[uniqueId]));
  });
}

populateDOM();

function populateDOM() {
  for (var i = 0; i < indexCardArray.length; i++) {
    build(indexCardArray[i]);
  }
}

function build(newIndexCard) {
  var newTitle = newIndexCard.title;
  var newBody = newIndexCard.body;
  var newQuality = newIndexCard.quality;
  var newId = newIndexCard.id;
  $('.bottom-container').prepend(
    `<article id="${newId}" class="card">
     <h3 class="card-title" contenteditable="true">${newTitle}</h3>
     <div class="delete"></div>
     <p class="card-text" contenteditable="true">${newBody}</p>
     <div class="up-vote"></div>
     <div class="down-vote"></div>
     <p class="quality">quality: <span id="quality-text">${newQuality}</span></p>
   </article>`
   $('.card-title').on('blur', updateTitle);
   $('.card-text').on('blur', updateBody);
  );
  $('.card-title').on('blur', updateTitle);
  $('.card-text').on('blur', updateBody);
}

function clearInputFields() {
  $ideaTitle.val('');
  $ideaBody.val('');
  $saveBtn.attr('disabled', true);
}

$saveBtn.on('click', clickSave);

function clickSave (e) {
  e.preventDefault();
  var title = $ideaTitle.val();
  var body = $ideaBody.val();
  var newIndexCard = new IndexCard(title, body);
  build(newIndexCard);
  indexCardArray.push(newIndexCard);
  addIndexCardToLocalStorage(newIndexCard);
  clearInputFields();
};

$('.bottom-container').on('click', '.delete', function () {
  $(this).parent().remove();
  localStorage.removeItem($(this).parent().prop('id'));
});

$('.bottom-container').on('click', '.up-vote', upVote);

function upVote() {
  var $changeQuality = $(this).parent().find('span').text();
  var id = $(this).parent().prop('id');
  var specificCard = JSON.parse(localStorage.getItem(id));
  if ($changeQuality === 'swill') {
    $(this).parent().find('span').text('plausible');
    specificCard.quality = 'plausible';
    localStorage.setItem(id, JSON.stringify(specificCard));
  } else if ($changeQuality === 'plausible') {
    $(this).parent().find('span').text('genius');
    specificCard.quality = 'genius';
    localStorage.setItem(id, JSON.stringify(specificCard));
  }
}

$('.bottom-container').on('click', '.down-vote', downVote);

function downVote() {
  var $changeQuality = $(this).parent().find('span').text();
  var id = $(this).parent().prop('id');
  var specificCard = JSON.parse(localStorage.getItem(id));
  if ($changeQuality === 'genius') {
    $(this).parent().find('span').text('plausible');
    specificCard.quality = 'plausible';
    localStorage.setItem(id, JSON.stringify(specificCard));
  } else if ($changeQuality === 'plausible') {
    $(this).parent().find('span').text('swill');
    specificCard.quality = 'swill';
    localStorage.setItem(id, JSON.stringify(specificCard));
  }
}

function addIndexCardToLocalStorage(newIndexCard) {
  var stringifiedIndexCard = JSON.stringify(newIndexCard);
  localStorage.setItem(newIndexCard.id, stringifiedIndexCard);
}

// function populateIndexCardArray() {
//   var objectKeys = Object.keys(localStorage);
//   objectKeys.forEach(function (uniqueId) {
//     indexCardArray.push(JSON.parse(localStorage[uniqueId]));
//   });
// }
//
// function populateDOM() {
//   for (var i = 0; i < indexCardArray.length; i++) {
//     build(indexCardArray[i]);
//   }
// }

$ideaBody.on('input', saveBtnOn);

function saveBtnOn() {
  $saveBtn.attr('disabled', false);
}

$('.search').on('keyup', runSearch);

function runSearch() {
  var search = $(this).val().toUpperCase();
  var searchedArray = indexCardArray.filter(function (newIndexCard) {
    return newIndexCard.title.toUpperCase().includes(search) || newIndexCard.body.toUpperCase().includes(search) || newIndexCard.quality.toUpperCase().includes(search);

  });

  $('.bottom-container').empty();
  for (var i = 0; i < searchedArray.length; i++) {
    build(searchedArray[i]);
  }
}

function updateTitle() {
  var $updatedTitle = $(this).parent().find('h3').text();
  var id = $(this).parent().prop('id');
  var specificCard = JSON.parse(localStorage.getItem(id));
  console.log('updatetitle function running');
  specificCard.title = $updatedTitle;
  localStorage.setItem(id, JSON.stringify(specificCard));
}

function updateBody() {
  var $updatedBody = $(this).parent().find('.card-text').text();
  var id = $(this).parent().prop('id');
  var specificCard = JSON.parse(localStorage.getItem(id));
  console.log($updatedBody);
  specificCard.body = $updatedBody;
  localStorage.setItem(id, JSON.stringify(specificCard));
}


// $('.card-text').on('blur', editCardToStorage);

// function editTitleToStorage() {
//   var id = $(this).parent().prop('id');
//   console.log('I am ID: '+id);
//   var title = $(this).text();
//   var specificCard = JSON.parse(localStorage.getItem(id));
//   //console.log(indexCardArray[0]);
//   // title = $(this).parent().find('h3').text();
//   var index = indexCardArray.reduce( function( cur, val, index ){
//
//     if( val.id === id && cur === -1 ) {
//         return index;
//     }
//     return cur;
//
// }, -1 );
//   var index = indexCardArray.findIndex(i => i.id === id);
//   console.log('I am Index: ' + index);
//   // indexCardArray.indexOf(id);
//   console.log(title);
//   localStorage.setItem(id, JSON.stringify(specificCard));
//   // var stringifiedEditedCard = JSON.stringify(newIndexCard);
//   // localStorage.setItem(newIndexCard.title, stringifiedEditedCard);
// }
