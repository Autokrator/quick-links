chrome.commands.onCommand.addListener(function(command) {
  //Checks to verify the pressed command
  switch(command){
    case "link1": //command for link1 registered
		chrome.storage.sync.get(["linkArray"], function(items) {
			chrome.tabs.create({url: items.linkArray[0]});
		});
      break;

    case "link2": //command for link2 registered
		chrome.storage.sync.get(["linkArray"], function(items) {
			chrome.tabs.create({url: items.linkArray[1]});
		});
      break;

    case "link3": //command for link3 registered
      chrome.storage.sync.get(["linkArray"], function(items) {
			chrome.tabs.create({url: items.linkArray[2]});
		});
      break;

    case "link4": //command for link4 registered
      chrome.storage.sync.get(["linkArray"], function(items) {
			chrome.tabs.create({url: items.linkArray[3]});
		});
      break;

    default:
      break; //do nothing
  }
});
