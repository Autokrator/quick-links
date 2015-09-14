chrome.commands.onCommand.addListener(function(command) {
  //Checks to verify the pressed command
  switch(command){
    case "link1": //command for link1 registered
      chrome.tabs.create({url: "http://www.youtube.com"});
      break;

    case "link2": //command for link2 registered
    chrome.tabs.create({url: "http://www.google.com"});
      break;

    case "link3": //command for link3 registered
      chrome.tabs.create({url: "http://www.gmail.com"});
      break;

    case "link4": //command for link4 registered
      chrome.tabs.create({url: "http://www.facebook.com"});
      break;

    default:
      break; //do nothing
  }
});
