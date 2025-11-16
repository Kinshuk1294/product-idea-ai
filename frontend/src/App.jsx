import { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateIdea = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResult("");

    const res = await fetch("http://localhost:8000/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setLoading(false);
    setResult(data.result);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>✨ AI Product Inspiration Generator</h1>

      <textarea
        style={styles.textarea}
        placeholder="Describe your product idea…"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button style={styles.button} onClick={generateIdea}>
        {loading ? "Generating…" : "Generate Inspiration"}
      </button>

      {loading && <p style={styles.loading}>⏳ Thinking...</p>}

      {result && (
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Generated Inspiration</h2>
          <pre style={styles.result}>{result}</pre>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    maxWidth: "700px",
    margin: "auto",
    fontFamily: "Arial",
  },
  title: {
    fontSize: "30px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
  },
  textarea: {
    width: "100%",
    height: "120px",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    outline: "none",
    marginBottom: "15px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#4f46e5",
    color: "white",
    fontSize: "18px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
  },
  loading: {
    textAlign: "center",
    marginTop: "10px",
    fontSize: "16px",
    opacity: 0.7,
  },
  card: {
    marginTop: "25px",
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
  },
  cardTitle: {
    marginBottom: "10px",
    fontSize: "22px",
    fontWeight: "bold",
  },
  result: {
    whiteSpace: "pre-wrap",
    fontSize: "16px",
  },
};

export default App;
