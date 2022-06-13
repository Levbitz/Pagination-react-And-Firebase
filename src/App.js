import logo from "./logo.svg";
import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./lib/Firebase/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";

function App() {
  const [results, setResults] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [collectionIsEmpty, setCollectionIsEmpty] = useState(false);

  const [error, setError] = useState("");

  const colRef = collection(db, "photos");

  const q = query(colRef, limit(50));

  useEffect(() => {
    // effect

    //check size of collection

    setLoading(true);

    getDocs(q).then((snapshoot) => {
      //get snapshot size

      if (snapshoot.size === 0) {
        alert("collection is empty");
        setLoading(false);
        setCollectionIsEmpty(true);
      } else {
        // console.log(snapshoot.docs);
        setLoading(true);
        // setTimeout(() => {

        const term = snapshoot.docs.map((doc) =>
          // console.log(doc.data())
          ({
            id: doc.id,
            data: doc.data(),
          })
        );

        setResults(term);
        setLoading(false);
        //get the last doc
        setLastDoc(snapshoot.docs[snapshoot.docs.length - 1]);
      }

      //   setLastDoc(snapshoot.docs[snapshoot.docs.length - 1]);
      //   setLoading(false);
      // }, 3000);
      // setResults(
      //   snapshoot.docs.map((doc) =>
      //     // console.log(doc.data())
      //     ({
      //       id: doc.id,
      //       data: doc.data(),
      //     })
      //   )
      // );
    });
    setLoading(false);
    // return () => {
    //   cleanup
    // };
  }, []);

  //console.log(results.length);

  //get the next 10 datas from the database

  //check if the collection size is 0

  const NewData = collection(db, "photos");

  const LoadMoreHandeler = () => {
    // alert("Load more");

    setLoading(true);

    const q = query(
      NewData,

      startAfter(lastDoc),

      limit(50)
    );

    getDocs(q).then((snapshoot) => {
      // setLoading(true);
      // setTimeout(() => {
      if (snapshoot.size === 0) {
        alert("No more data");
        setLoading(false);
        setCollectionIsEmpty(true);
      } else {
        const term = snapshoot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));

        setResults([...results, ...term]);
        setLastDoc(snapshoot.docs[snapshoot.docs.length - 1]);
        setLoading(false);
      }

      // const term = snapshoot.docs.map((doc) =>
      //   // console.log(doc.data())
      //   ({
      //     id: doc.id,
      //     data: doc.data(),
      //   })
      // );

      // setResults([...results, ...term]);
      // setLoading(false);
    });

    //check if all documents in the collection are finished
  };

  return (
    <div className="App">
      {results.length > 0 ? (
        results.map((result) => {
          return (
            <div key={result.id} className="container">
              <div
                style={{
                  height: "50px",
                }}
                className="card "
              >
                <p>{result.data.title}</p>
              </div>
            </div>
          );
        })
      ) : (
        <div>Loading...</div>
      )}

      {loading ? (
        <div>Loading...</div>
      ) : collectionIsEmpty ? (
        <div>Collection is empty</div>
      ) : (
        <button onClick={LoadMoreHandeler}>Load More</button>
      )}
    </div>
  );
}

export default App;
