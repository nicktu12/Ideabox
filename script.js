var $saveBtn = $('.save-btn');
var $card = $('.card');
var $ideaTitle = $('#idea-title');
var $ideaBody = $('#idea-info');
var $qualityText;
var indexCardArray = [];

populateIndexCardArray();

var IndexCard = function (title, body, id) {
  this.title = title;
  this.body = body;
  this.quality = 'swill';
  this.id = id || Date.now();
};

IndexCard.prototype.build = function () {
  $('.bottom-container').prepend(
    `<article id="${this.id}" class="card">
     <h3 class="card-title" contenteditable="true">${this.title}</h3>
     <div class="delete"></div>
     <p class="card-text" contenteditable="true">${this.body}</p>
     <div class="up-vote"></div>
     <div class="down-vote"></div>
     <p class="quality">quality: <span id="quality-text">${this.quality}</span></p>
   </article>`
  );
};

$saveBtn.click(function (e) {
  e.preventDefault();
  var title = $ideaTitle.val();
  var body = $ideaBody.val();
  var newIndexCard = new IndexCard(title, body);
  newIndexCard.build();
  addIndexCardToLocalStorage(newIndexCard);
  console.log(newIndexCard);
});

$('.bottom-container').on('click', '.delete', function () {
  $(this).parent().remove();
});

$('.bottom-container').on('click', '.up-vote', upVote)

function upVote() {
  // var $changeQuality = $('#quality-text').text();
  var $changeQuality = $(this).parent().find('span').text();
  if ($changeQuality === 'swill') {
    $(this).parent().find('span').text('plausible');
} else if ($changeQuality === 'plausible') {
    $(this).parent().find('span').text('genius')
  }
}


$('.bottom-container').on('click', '.down-vote', function() {
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

function populateIndexCardArray(){
  var objectKeys = Object.keys(localStorage);
  console.log(objectKeys)
  objectKeys.forEach(function(uniqueId){
    console.log(JSON.parse(localStorage[uniqueId]))
    indexCardArray.push(JSON.parse(localStorage[uniqueId]));
  })
}

function populateDOM() {

}

$saveBtn.on('click', clearInputFields);

function clearInputFields() {
  $ideaTitle.val('');
  $ideaBody.val('');
};

$ideaBody.on('blur', saveBtnOn);

function saveBtnOn() {
  $saveBtn.css('background-color', '#00a79d');
  $saveBtn.attr('disabled', false);
}

$('.search').on('keyup', runSearch);

function runSearch() {
  // var $searchInput = $('.search');
  var search = $(this).val();
  var title = $ideaTitle.val();
  console.log('search is... ' + search);
  if (search) {
  var ssss =  $('.bottom-container').find("h3:contains(" + search + "))").closest('.card').show();
  console.log(ssss);
    $('.bottom-container').find("h3:not(:contains(" + search + "))").closest('.card').hide();
  } else {
    //hide it
  }
  //make it to lowercase so if they type it as Idea, then search idea... Idea still pops up for them
  //.includes()
}
