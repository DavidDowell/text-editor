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
export const putDb = async (id, content) => { 
  console.log('PUT to database');
  //create a connection to the database and version
  const contactDb = await openDB('jate', 1);

  //create a new transaction and specify the store and data privileges
  const tx = contactDb.transaction('jate', 'readwrite');

  //open up the desired object store
  const store = tx.objectStore('jate');

  //use .add method on the store to pass the content
  const request = store.put({ id: id, content: content })

  //Get confirmation of the request
  const result = await request;
  console.log('🎓 data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => { 
  console.log('GET from database');

  const contactDb = await('jate', 1);

  const tx = contactDb.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);
  return result;
}

initdb();
