import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [links, setlinks] = useState([]);
  const [text, settext] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/");
  }, []);
  useEffect(() => {
    loaded();
  }, [links]);
  const handlechange = (event) => {
    event.preventDefault();
    settext(event.target.value);
  };

  const loaded = async () => {
    const ans = await fetch("http://localhost:3001/find", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }).then((response) => response.json());
    let finalans = [];
    for (const key of ans) {
      finalans.push(key.longurl + "  " + key.shorturl);
    }
    setlinks(finalans);
  };
  const handlesubmit = async (event) => {
    event.preventDefault();
    if (text === "") {
      return;
    }
    const data = await fetch("http://localhost:3001/create", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ longurl: text }),
    }).then((response) => response.json());
    await setlinks((links) => [...links, text + "  " + data.shorturl]);
    console.log(links);
    settext("");
  };

  return (
    <div>
      <h1>Enter Your URL Here</h1>
      <div className="form-container">
        <form onSubmit={handlesubmit}>
          <input type="text" value={text} onChange={handlechange} />
          <div className="button-container">
            <button>Submit</button>
          </div>
        </form>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Long URL</th>
              <th>Short URL</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link, index) => {
              var small = link.split("  ");
              return (
                <tr key={index}>
                  <td>{small[0]}</td>
                  <td>
                    <a href={small[0]}>{small[1]}</a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
