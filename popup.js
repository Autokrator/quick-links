function onSubmit() {
	// Store link array in chrome storage API.
	chrome.storage.sync.set({'linkArray': linkArray}, function() {
		// Notify that we saved.
		message('Settings saved');
	});
}

// Save link values.
var link1 = document.getElementById("link1").value;
var link2 = document.getElementById("link2").value;
var link3 = document.getElementById("link3").value;
var link4 = document.getElementById("link4").value;

// Create link array.
var linkArray = [link1, link2, link3, link4];

document.getElementById("submit").onclick = onSubmit;