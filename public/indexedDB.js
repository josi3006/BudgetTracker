



const request = window.indexedDB.open("budget", 1);
let db;


request.onupgradeneeded = function (event) {
  const db = event.target.result;
  db.createObjectStore("holding", { keyPath: "_id" });
};



request.onerror = function (event) {
  console.log("There was an error: ", event.target.err);
};


request.onsuccess = function (event) {
  db = event.target.result;

  if (navigator.onLine) {

    console.log('I am gonna do it!');

    processTransactions();
  }
}




function saveRecord(record) {

  transaction = db.transaction(["holding"], "readwrite");
  store = transaction.objectStore("holding");
  store.add(record);
}




function processTransactions() {

  transaction = db.transaction(["holding"], "readwrite");
  store = transaction.objectStore("holding");

  db.onerror = function (event) {
    console.log("Error: ", event);
  };


  if (method === "put") {
    store.put(object);
  } else if (method === "get") {
    const all = store.getAll();
    all.onsuccess = function () {
      resolve(all.result);
    };
  } else if (method === "delete") {
    store.delete(object._id);
  }
  transaction.oncomplete = function () {
    db.close();
  };
};





window.addEventListener("online", processTransactions);


