var $saveBtn = $('.save-btn');
var $card = $('.card');
var $ideaTitle = $('#idea-title');
var $ideaBody = $('#idea-info');
var $qualityText;

var IndexCard = function(title, body, id) {
  this.title = title;
  this.body = body;
  this.quality = 'swill';
  this.id = id || Date.now();
}

IndexCard.prototype.build = function() {
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
   }

$saveBtn.click(function(e){
  e.preventDefault();
  var title = $ideaTitle.val();
  var body = $ideaBody.val();

  console.log(title);
  console.log(body);
  var newIndexCard = new IndexCard(title, body);
  newIndexCard.build();
  addIndexCardToLocalStorage(newIndexCard);
  console.log(newIndexCard);

  // cardArray.add();
  // cardArray.store();
});

$('.bottom-container').on('click', '.delete', function(){
     $(this).parent().remove();
})

$('.bottom-container').on('click', '.up-vote', function() {
  $qualityText = $('#quality-text');
  var $changeQuality = $('#quality-text').text();
  console.log($changeQuality);
  if ($changeQuality === 'swill') {
    $(this).parent().find('span').text('plausible')
} else if ($changeQuality === 'plausible') {
    $(this).parent().find('span').text('genius')
  }
})

$('.bottom-container').on('click', '.down-vote', function() {
  $qualityText = $('#quality-text');
  var $changeQuality = $('#quality-text').text();
  console.log($changeQuality);
  if ($changeQuality === 'genius') {
    $(this).parent().find('span').text('plausible')
} else if ($changeQuality === 'plausible') {
    $(this).parent().find('span').text('swill')
  }
})

var indexCardArray = [];

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

// function to populate index card array
// populate the dom
//
// function populateIndexCardArray() {
//   // JSON.parse(localStorage.getItem('storedIdeas'));
//   var newStoredIdea = localStorage.getItem('storedIdeas')
//   console.log(JSON.parse(newStoredIdea))
// };

// populateIndexCardArray();

//
// add new cards to our array when created
//
// array to stringify
//
// string array to local storage
//
// retrieve string array from local storage
//
// parse string array
//
// repopulate idea

// var cardArray = {
//   arrayOfIdeas: [],
//
//   add: function(title, body) {
//     this.ideaArray.push(new IndexCard(title, body));
//     this.store();
//   },
//
// // add new object to arrayOfIdeas
//
//   store: function() {
//     localStorage.setItem('storedArray', JSON.stringify(this.arrayOfIdeas));
//   },
//
// // store array of ideas
// // update edited idea card
//
//   retrieve: function() {
//   var retrievedIdeas = JSON.parse(localStorage.getItem('storedArray'));
//     if (retrievedIdeas) {
//       for (i = 0; i < retrievedIdeas.length; i++) {
//         var idea = retrievedIdeas[i];
//         this.ideaArray.push(new IndexCard(idea.title, idea.body, idea.quality, idea.id));
//       }
//     }
//   },
//
// // retrieve arrayOfIdeas from localstorage
//
// // remove deleted idea card from card arrayOfIdeas






//  IndexCard.prototype.upvote = function () {
//      this.upvotes ++;
//  },
 //
//  IndexCard.prototype.downvote = function () {
//      this.upvotes --;
//  }

//
// console.log('working1');
// $saveButton.on('click', addCard);
//
// function addCard(e) {
//
//   e.preventDefault();
//   console.log('working2');
//
//   var $bottomContainer = $('.bottom-container');
//   var $ideaTitle = $('#idea-title').val();
//   var $ideaInfo = $('#idea-info').val();
//
//   $newCard = `<article class="card">
//         <h3 class="card-title">${$ideaTitle}</h3>
//         <img class="delete" src="assets/delete.svg" alt="delete button" />
//         <p class="card-text">${$ideaInfo}</p>
//         <img class="up-vote" src="assets/upvote.svg" alt="up-vote button" />
//         <img class="down-vote" src="assets/downvote.svg" alt="down-vote button" />
//         <p class="quality">quality: <span id="quality-text">swill</span></p>
//       </article>`
//
//   $bottomContainer.prepend($newCard);
//
//   $('.delete').on('click', deleteCard);
//
//   $('.up-vote').on('click', upvoteFunction);
//
//   $('.down-vote').on('click', downvoteFunction);
//
// };
//
// function deleteCard () {
//   console.log('working3');
//   console.log($(this));
//   $(this).parent().remove();
// };
//
// function upvoteFunction () {
//   var $replaceText = $('#quality-text');
//   $qualityText = $('#quality-text').text();
//   console.log($qualityText);
//   if ($qualityText === 'swill') {
//     console.log($('if'));
//     $replaceText.text('plausible')
//   } else if ($qualityText === `plausible`) {
//     //  ($(this).attr('src',"assets/upvote-hover.svg"))
//     // can us this code for each if else statement to enable
//     // hovered states for buttons remain active when clicked
//     console.log($('else if'));
//     $replaceText.text('genius')
//   }
// };
//
// function downvoteFunction () {
//   var $replaceText = $('#quality-text');
//   $qualityText = $('#quality-text').text();
//   console.log($qualityText);
//   if ($qualityText === 'genius') {
//     console.log($('if'));
//     $replaceText.text('plausible')
//   } else if ($qualityText === `plausible`) {
//   //  ($(this).attr('src',"assets/upvote-hover.svg"))
//   // can us this code for each if else statement to enable
//   // hovered states for buttons remain active when clicked
//     console.log($('else if'));
//     $replaceText.text('swill')
//   }
// };
//
// // NEED TO REFACTOR, THIS FUNCTION CAN BE PULL OUT OF ADDCARD
//
// // $(function() {
// //  $('.up-vote').click(function(){
// //    $(this).attr('src',"assets/upvote-hover.svg");
// //     });
// //   });
// //
// // $('.list-toggle').click(function() {
// //   if ($('.list-sort').attr('colspan')) {
// //       $('.list-sort').removeAttr('colspan');
// //   } else {
// //       $('.list-sort').attr('colspan', 6);
// //   }
// // });
//
// $saveButton.on('click', clearInputFields);
//
// function clearInputFields() {
//   $('#idea-title').val('');
//   $('#idea-info').val('');
// };
