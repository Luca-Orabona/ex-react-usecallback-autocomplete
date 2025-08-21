import { useEffect, useState } from "react";


function App() {

  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);

  const handleFetch = async () => {
    if (!query.trim()) {
      setProducts([]);
      return
    }

    try {
      const resp = await fetch(`http://localhost:3333/products?search=${query}`);
      const dataProducts = await resp.json();
      setProducts(dataProducts);
    } catch (error) {
      console.error(`Errore! Non è stato possibile ottenere i dati`, error.message);
    }
  };

  useEffect(() => {
   handleFetch()
  }, [query]);
  console.log(products);

  return (
    <div className="container">

      <div className="d-flex flex-column align-items-center gap-3">

        <div className="dropdown w-75">

          <input
            type="text"
            placeholder="Cerca un prodotto"
            className="form-control"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />

          {products.length > 0 &&
            <ul className={`dropdown-menu w-100 ${query ? "show" : ""}`}>
              {products.map((p, i) => (
                <li key={i}>
                  <a className="dropdown-item" href="#">
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>}

        </div>

      </div>

    </div>
  )
}

export default App
