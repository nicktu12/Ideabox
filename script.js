var $saveButton = $('.save-btn');
var $newCard = $('.card');
var $qualityText;

console.log('working1');
$saveButton.on('click', addCard);

function addCard(e) {

  e.preventDefault();
  console.log('working2');

  var $bottomContainer = $('.bottom-container');
  var $ideaTitle = $('#idea-title').val();
  var $ideaInfo = $('#idea-info').val();

  $newCard = `<article class="card">
        <h3 class="card-title">${$ideaTitle}</h3>
        <img class="delete" src="assets/delete.svg" alt="delete button" />
        <p class="card-text">${$ideaInfo}</p>
        <img class="up-vote" src="assets/upvote.svg" alt="up-vote button" />
        <img class="down-vote" src="assets/downvote.svg" alt="down-vote button" />
        <p class="quality">quality: <span id="quality-text">swill</span></p>
      </article>`

  $bottomContainer.prepend($newCard);

  $('.delete').on('click', deleteCard);

  $('.up-vote').on('click', upvoteFunction);

  $('.down-vote').on('click', downvoteFunction);

};

function deleteCard () {
  console.log('working3');
  console.log($(this));
  $(this).parent().remove();
};

function upvoteFunction () {
  var $replaceText = $('#quality-text');
  $qualityText = $('#quality-text').text();
  console.log($qualityText);
  if ($qualityText === 'swill') {
    console.log($('if'));
    $replaceText.text('plausible')
  } else if ($qualityText === `plausible`) {
    //  ($(this).attr('src',"assets/upvote-hover.svg"))
    // can us this code for each if else statement to enable
    // hovered states for buttons remain active when clicked
    console.log($('else if'));
    $replaceText.text('genius')
  }
};

function downvoteFunction () {
  var $replaceText = $('#quality-text');
  $qualityText = $('#quality-text').text();
  console.log($qualityText);
  if ($qualityText === 'genius') {
    console.log($('if'));
    $replaceText.text('plausible')
  } else if ($qualityText === `plausible`) {
  //  ($(this).attr('src',"assets/upvote-hover.svg"))
  // can us this code for each if else statement to enable
  // hovered states for buttons remain active when clicked
    console.log($('else if'));
    $replaceText.text('swill')
  }
};

// NEED TO REFACTOR, THIS FUNCTION CAN BE PULL OUT OF ADDCARD

// $(function() {
//  $('.up-vote').click(function(){
//    $(this).attr('src',"assets/upvote-hover.svg");
//     });
//   });
//
// $('.list-toggle').click(function() {
//   if ($('.list-sort').attr('colspan')) {
//       $('.list-sort').removeAttr('colspan');
//   } else {
//       $('.list-sort').attr('colspan', 6);
//   }
// });

$saveButton.on('click', clearInputFields);

function clearInputFields() {
  $('#idea-title').val('');
  $('#idea-info').val('');
};

// var $searchInput = $('.search');
// $searchInput.on('keyup', runSearch);
//I THINK THIS WILL START WORKING IF WE GET OBJECTS-ARRAYS
// function runSearch() {
//   var filter = $(this).val();
//   console.log(filter);
//   $('.card').each(function () {
//     if ($(this).text().search(new RegExp(filter, 'i')) < 0) {
//       $(this).fadeOut();
//     } else {
//       $(this).fadeIn();
//     }
//   });
// };

//mine:
// function runSearch() {
//   var search = $(this).val();
//   console.log(search);
//   $('$searchInput:contains(' + search + ')').closest('.card-title').show();
//   $('$searchInput:not(:contains(' + search + ')').closest('.card-title').hide();
// }
