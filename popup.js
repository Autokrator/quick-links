// Checks if URL is valid or not.
function ValidUrl(str) {
  var pattern = new RegExp('(http|ftp|https)://[\\w-]+(\\.[\\w-]+)+([\\w-.,@?^=%&:/~+#-]*[\\w@?^=%&;/~+#-])?');
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
	
	// Get all commands, and set texts on divs.
    chrome.commands.getAll(function (commandsArray) {
        for(var i = 1; i < commandsArray.length; i++){
			
            var statusShortcut = document.getElementById("shortcut" + i);
		
            if (commandsArray[i].shortcut == "") {
				statusShortcut.innerText = "Not Set";
                statusShortcut.style.backgroundColor = "red";
            } else {
				statusShortcut.innerText = commandsArray[i].shortcut;
                statusShortcut.style.backgroundColor = "#00E676";
			}
        }
    });
	
	// Load dark theme if darkTheme = true.
	chrome.storage.sync.get(["darkTheme"], function(items) {
		if(items.darkTheme) {
			var wrapper = document.getElementById("wrapper");
			wrapper.style.backgroundColor = "#333333";
			document.body.style.backgroundColor = "#333333";
			wrapper.style.color = "#FFFFFF";
			document.getElementById("icon").src="images/icon_48x48_light.png";
			document.getElementById("darktheme").value = "Light Theme";
		}
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
	if ((!ValidUrl(link1))&&(link1)) {
		alert("Link 1 has an invalid URL! Please try again.");
		invalidURL = true;
	}
	if ((!ValidUrl(link2))&&(link2)) {
		alert("Link 2 has an invalid URL! Please try again.");
		invalidURL = true;
	}
	if ((!ValidUrl(link3))&&(link3)) {
		alert("Link 3 has an invalid URL! Please try again.");
		invalidURL = true;
	}
	if ((!ValidUrl(link4))&&(link4)) {
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

function toggleDarkTheme() {
	// Change GUI theme.
	chrome.storage.sync.get(["darkTheme"], function(items) {
		// Grab wrapper from HTML.
		var wrapper = document.getElementById("wrapper");
		
		// Toggle GUI colors.
		if(items.darkTheme) {
			wrapper.style.backgroundColor = "#FFFFFF";
			document.body.style.backgroundColor = "#FFFFFF";
			wrapper.style.color = "#000000";
			var icon = document.getElementById("icon").src="images/icon_48x48.png";
		} else {
			wrapper.style.backgroundColor = "#333333";
			document.body.style.backgroundColor = "#333333";
			wrapper.style.color = "#FFFFFF";
			var icon = document.getElementById("icon").src="images/icon_48x48_light.png";
		}
		
		// Save new dark theme settings.
		chrome.storage.sync.set({"darkTheme": !items.darkTheme}, function() {
			// Notify that we saved.
			message('Settings saved');
		});
	});
}

function onStatusClick() {
	chrome.tabs.create({url: "chrome://extensions/configureCommands"});
}

function onMouseHover() {	
	var statusElement = this;
	var current = parseInt(this.id.slice(-1));
	// Check statuses if shortcuts are set, and change colors accordingly on hover.
	chrome.commands.getAll(function (commandsArray) {
		
		if (commandsArray[current].shortcut == "") {
			statusElement.style.backgroundColor = "#C62828";
		} else {
			statusElement.style.backgroundColor = "#00C853";
		}
    });
}

function onMouseOut() {
	var statusElement = this;
	var current = parseInt(this.id.slice(-1));
	// Check statuses if shortcuts are set, and change colors accordingly on hover.
	chrome.commands.getAll(function (commandsArray) {
		
		if (commandsArray[current].shortcut == "") {
			statusElement.style.backgroundColor = "red";
		} else {
			statusElement.style.backgroundColor = "#00E676";
		}
    });
}

// Load links.
window.onload = onLoad;

// Save links.
document.getElementById("submit").onclick = onSubmit;

// Clicking status opens up 'Keyboard shortcuts' in extensions menu.
document.getElementById("shortcut1").onclick = onStatusClick;
document.getElementById("shortcut2").onclick = onStatusClick;
document.getElementById("shortcut3").onclick = onStatusClick;
document.getElementById("shortcut4").onclick = onStatusClick;

// On mouse hover, make background color darker.
document.getElementById("shortcut1").onmouseover = onMouseHover;
document.getElementById("shortcut2").onmouseover = onMouseHover;
document.getElementById("shortcut3").onmouseover = onMouseHover;
document.getElementById("shortcut4").onmouseover = onMouseHover;

// On mouse out, make background color lighter.
document.getElementById("shortcut1").onmouseout = onMouseOut;
document.getElementById("shortcut2").onmouseout = onMouseOut;
document.getElementById("shortcut3").onmouseout = onMouseOut;
document.getElementById("shortcut4").onmouseout = onMouseOut;

// Clicking icon toggles dark theme
document.getElementById("icon").onclick = toggleDarkTheme;