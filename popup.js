// Checks if URL is valid or not.
function ValidUrl(str) {
  var pattern = new RegExp('(http|ftp|https)://[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?'); // fragment locator
  if(!pattern.test(str)) {
    return false;
  } else {
    return true;
  }
}

function onLoad() {
	// Load link array on chrome.storage.sync API on start.
	chrome.storage.sync.get(["linkArray"], function(items) {
		document.getElementById("link1").value = items.linkArray[0];
	});
	
	chrome.storage.sync.get(["linkArray"], function(items) {
		document.getElementById("link2").value = items.linkArray[1];
	});
	
	chrome.storage.sync.get(["linkArray"], function(items) {
		document.getElementById("link3").value = items.linkArray[2];
	});
	
	chrome.storage.sync.get(["linkArray"], function(items) {
		document.getElementById("link4").value = items.linkArray[3];
	});
}

function onSubmit() {
	// Update link array values.
	var link1 = document.getElementById("link1").value;
	var link2 = document.getElementById("link2").value;
	var link3 = document.getElementById("link3").value;
	var link4 = document.getElementById("link4").value;
	
	// Reject save if URLs are not valid.
	var invalidURL = false;
	if (!ValidUrl(link1)) {
		alert("Link 1 has an invalid URL! Please try again.");
		invalidURL = true;
	}
	if (!ValidUrl(link2)) {
		alert("Link 2 has an invalid URL! Please try again.");
		invalidURL = true;
	}
	if (!ValidUrl(link3)) {
		alert("Link 3 has an invalid URL! Please try again.");
		invalidURL = true;
	}
	if (!ValidUrl(link4)) {
		alert("Link 4 has an invalid URL! Please try again.");
		invalidURL = true;
	}
	if (invalidURL)
		return;
	
	var linkArray = [link1, link2, link3, link4];
	
	// Store link array in chrome storage API.
	chrome.storage.sync.set({"linkArray": linkArray}, function() {
		// Notify that we saved.
		message('Settings saved');
	});
}

// Load links.
window.onload = onLoad;

// Save links.
document.getElementById("submit").onclick = onSubmit;