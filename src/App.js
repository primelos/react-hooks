import React, { useState } from "react";
import UseHackerNewsApi from './components/dataHook'

function App() {
  const [query, setQuery] = useState("");
  const [{ data, isLoading, isError }, setUrl] = UseHackerNewsApi(
    "https://hn.algolia.com/api/v1/search?query=redux"
  , []);
  console.log("data -_-_->", data); 
  return (
    <>
      <form onSubmit={(e) => {setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`); e.preventDefault()}}>
        <input
          type="text"
          value={query}
          required
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit">search</button>
      
      </form>

      {
        isError && <div>Something went Wrong</div>
      }
      {
        isLoading ? (
          <div>Data Fetching...</div>
        ) : (
        <ul>
          {data.map((item) => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>

        )
      }
    </>
  );
}

export default App;
