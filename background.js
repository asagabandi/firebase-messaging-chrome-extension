// has additional logic

const api = new FirebaseAPI();

chrome.runtime.onInstalled.addListener(firebaseSetup);

function firebaseSetup() {
  api.setUpFirebase();
}
