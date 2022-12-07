import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => { 
  console.log('PUT to database');
  //create a connection to the database and version
  const jateDb = await openDB('jate', 1);

  //create a new transaction and specify the store and data privileges
  const tx = jateDb.transaction('jate', 'readwrite');

  //open up the desired object store
  const store = tx.objectStore('jate');

  //use .add method on the store to pass the content
  const request = store.put({ id: 1, value: content })

  //Get confirmation of the request
  const result = await request;
  console.log(result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => { 
  console.log('GET from database');

  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  const request = store.get(1);

  const result = await request;
  console.log('result.value', result);
  return result?.value;
}

initdb();
