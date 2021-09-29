let db;
const request = indexedDB.open("indexed-budget", 1);

request.onupgradeneeded = function (event) {
  const updatedDB = event.target.result;
  updatedDB.createObjectStore("pending", { autoincrement: true });
};

request.onsucccess = function (event) {
  db = event.target.result;

  if (navigator.online) {
    updateDatabase();
  }
};

//This is called in index.js in the CATCH of the POST request.
function saveRecord(data) {
  const transaction = db.transaction(["pending"], "readwrite");
  const pendingStore = transaction.objectStore("pending");

  pendingStore.add(data);
  console.log("this is working");
  console.log("data");
}
