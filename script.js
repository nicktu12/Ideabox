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

};

function deleteCard () {
  console.log('working3');
  console.log($(this));
  $(this).parent().remove();
};

function upvoteFunction () {
  // var $thisSpan = $('#quality-text')
  // $qualityText = $thisSpan.val();
  // $qualityText = innerHTML('#quality-text');
  $qualityText = $('#quality-text')[0];
  console.log($qualityText);
  if ($qualityText === `<span id="quality-text">swill</span>`) {
    console.log($('if'));
    $qualityText.text('plausible')
  } else if ($qualityText === `<span id="quality-text">plausible</span>`) {
  //  ($(this).attr('src',"assets/upvote-hover.svg"))
    console.log($('else if'));
    $qualityText.text('genius')
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
