document.addEventListener('keydown', function(event) {
  if (event.command && String.fromCharCode(event.keyCode) === '1') {
    console.log("you pressed ctrl-D");
    event.preventDefault();
    event.stopPropagation();
  }
}, true);
