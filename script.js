var $saveButton = $('.save-btn');
var $newCard = $('.card');

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
          <p class="quality">quality: swill</p>
        </article>`
  $bottomContainer.prepend($newCard);
};
