// Checks if URL is valid or not.
function ValidUrl(str) {
    // Check if URL is valid.
<<<<<<< HEAD
    if(str.split(".").length == 2) //case ex: google.com
        return true;
    else if(str.split(".").length >= 3){ //case ex: https://www.goggle.com | www.google.com
        var ary = str.split(".");
        if(ary[0].indexOf("www") != 0){ //check for proper "www" sequence
            if(ary[0].indexOf("https://www") == 0 || ary[0].indexOf("http://www") == 0) //check http cases
                return true
            else
                return false;
        }
        else
            return true;
    }
    else
        return false;
=======
	var pattern = new RegExp('(http|ftp|https)://[\\w-]+(\\.[\\w-]+)+([\\w-.,@?^=%&:/~+#-]*[\\w@?^=%&;/~+#-])?');
	if(!pattern.test(str)) {
		return false;
	} else {
		return true;
	}
>>>>>>> 2ae1eb8c23fa6722b7a48e4d2bac773aa6322f11
}

function onLoad() {
    // Load link array on chrome.storage.sync API on start.
    chrome.storage.sync.get(["linkArray"], function(items) {
        document.getElementById("link1").value = items.linkArray[0];
        document.getElementById("link2").value = items.linkArray[1];
        document.getElementById("link3").value = items.linkArray[2];
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
            document.body.style.color = "#FFFFFF";
            wrapper.style.color = "#FFFFFF";
            document.getElementById("icon").src="images/icon_48x48_light.png";
            document.getElementById("link1").style.color = "#FFFFFF";
            document.getElementById("link2").style.color = "#FFFFFF";
            document.getElementById("link3").style.color = "#FFFFFF";
            document.getElementById("link4").style.color = "#FFFFFF";
        }
    });
}

function onSubmit() {
    // Reject save if URLs are not valid.
    var invalidURL = false;
    for(i = 1; i < 5; i++){
        if((!ValidUrl(document.getElementById("link" + i).value))
                    &&(document.getElementById("link" + i).value)){
            document.getElementById("link" + i).className = "invalidInput";
            invalidURL = true;
        }
    }
    if (invalidURL)
		return;

    //update the link array
    var linkArray = [document.getElementById("link1").value,
                     document.getElementById("link2").value,
                     document.getElementById("link3").value,
                     document.getElementById("link4").value];

    // Store link array in chrome storage API.
    chrome.storage.sync.set({"linkArray": linkArray}, function(){
        document.getElementById("notification").style.display = "none";
        document.getElementById("notification").style.display = "block";
    });
	
	// On click, keep save changes green.
	document.getElementById("submit").className = "saved";
}

function toggleDarkTheme() {
    // Change GUI theme.
    chrome.storage.sync.get(["darkTheme"], function(items) {
        // Grab wrapper from HTML.
        var wrapper = document.getElementById("wrapper");

        // Toggle GUI colors.
        if(items.darkTheme) {
            wrapper.style.backgroundColor = "#F5F5F5";
            document.body.style.backgroundColor = "#F5F5F5";
            wrapper.style.color = "#000000";
            document.getElementById("link1").style.color = "#000000";
            document.getElementById("link2").style.color = "#000000";
            document.getElementById("link3").style.color = "#000000";
            document.getElementById("link4").style.color = "#000000";
            var icon = document.getElementById("icon").src="images/icon_48x48.png";
        } else {
            wrapper.style.backgroundColor = "#333333";
            document.body.style.backgroundColor = "#333333";
            wrapper.style.color = "#FFFFFF";
            document.getElementById("link1").style.color = "#FFFFFF";
            document.getElementById("link2").style.color = "#FFFFFF";
            document.getElementById("link3").style.color = "#FFFFFF";
            document.getElementById("link4").style.color = "#FFFFFF";
            var icon = document.getElementById("icon").src="images/icon_48x48_light.png";
        }

        // Save new dark theme settings.
        chrome.storage.sync.set({"darkTheme": !items.darkTheme}, function() {});
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
        //Checking to see if shortcut is set
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

function onInputFocus(){
    // resets style to default in case it was previously invalid
    this.className = "input";
}

function onType() {
	document.getElementById("submit").className = "unsaved";
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
document.getElementById("cf").onclick = toggleDarkTheme;

// Input focus resets input style
document.getElementById("link1").onfocus = onInputFocus;
document.getElementById("link2").onfocus = onInputFocus;
document.getElementById("link3").onfocus = onInputFocus;
document.getElementById("link4").onfocus = onInputFocus;

// Change save button color when user types in field.
document.getElementById("link1").onkeypress = onType;
document.getElementById("link2").onkeypress = onType;
document.getElementById("link3").onkeypress = onType;
document.getElementById("link4").onkeypress = onType;