



const request = window.indexedDB.open('account', 1);
let db;


request.onupgradeneeded = function (e) {
  const db = request.result;
  db.createObjectStore('holding', { keyPath: "_id" });
};



request.onerror = function (e) {
  console.log("There was an error");
};


request.onsuccess = function (e) {
  db = request.result;

  transaction = db.transaction(["holding"], "readwrite");
  store = tx.objectStore("holding");

  db.onerror = function (e) {
    console.log("error");
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
  tx.oncomplete = function () {
    db.close();
  };
};

