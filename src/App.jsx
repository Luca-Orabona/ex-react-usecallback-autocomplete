import { useEffect, useState, useCallback } from "react";

const debounce = (callback, delay) => {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay)
  };
};


function App() {



  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);

  const handleFetch = async (query) => {
    if (!query.trim()) {
      setProducts([]);
      return
    }

    try {
      const resp = await fetch(`http://localhost:3333/products?search=${query}`);
      const dataProducts = await resp.json();
      setProducts(dataProducts);
      console.log(products);
    } catch (error) {
      console.error(`Errore! Non è stato possibile ottenere i dati`, error.message);
    }
  };

  const fetchProduct = async (id) => {
    try {
      const resp = await fetch(`http://localhost:3333/products/${id}`);
      const data = await resp.json();
      setProduct(data);
      setQuery("");
      setProducts([]);
    } catch (error) {
      console.log(error);
    }

  };

  const debouncefetch = useCallback(debounce(handleFetch, 500), [])

  useEffect(() => {
    debouncefetch(query)
  }, [query]);


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
                  <a className="dropdown-item" href="#" onClick={() => fetchProduct(p.id)}>
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>}

        </div>

        {product &&
          <div>
            <h1>{product.name}</h1>
            <img src="https://picsum.photos/id/237/300/200"
              alt={product.name} />
            <p>{product.description}</p>
            <span>{product.price}</span>
          </div>
        }

      </div>

    </div>
  )
}

export default App
