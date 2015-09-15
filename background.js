chrome.commands.onCommand.addListener(function(command) {
	//Checks to verify the pressed command
	switch(command){
	case "link1": //command for link1 registered
		chrome.storage.sync.get(["linkArray"], function(items) {
			if (items.linkArray[0]){
				if(items.linkArray[0].indexOf("http") == 0)
					chrome.tabs.create({url: items.linkArray[0]});
				else {
					var str = "https://" + items.linkArray[0];
					chrome.tabs.create({url: str});
				}
			}
		});
	  break;

	case "link2": //command for link2 registered
		chrome.storage.sync.get(["linkArray"], function(items) {
			if (items.linkArray[1]){
				if(items.linkArray[1].indexOf("http") == 0)
					chrome.tabs.create({url: items.linkArray[1]});
				else {
					var str = "https://" + items.linkArray[1];
					chrome.tabs.create({url: str});
				}
			}
		});
	  break;

	case "link3": //command for link3 registered
	  chrome.storage.sync.get(["linkArray"], function(items) {
			if (items.linkArray[2]){
			if(items.linkArray[2].indexOf("http") == 0)
				chrome.tabs.create({url: items.linkArray[2]});
			else {
				var str = "https://" + items.linkArray[2];
				chrome.tabs.create({url: str});
			}
		}
		});
	  break;

	case "link4": //command for link4 registered
	  chrome.storage.sync.get(["linkArray"], function(items) {
			if (items.linkArray[3]){
			if(items.linkArray[3].indexOf("http") == 0)
				chrome.tabs.create({url: items.linkArray[3]});
			else {
				var str = "https://" + items.linkArray[3];
				chrome.tabs.create({url: str});
			}}		});
	  break;

	default:
	  break; //do nothing
	}
});
