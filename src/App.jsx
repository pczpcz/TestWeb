import { useEffect, useState } from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

function App() {
  const [accounts, setAccounts] = useState([]);

  async function getAccounts() {
    console.log("Fetching accounts from Supabase...");
    const { data, error } = await supabase.from("Acount").select();
    console.log("Supabase response:", { data, error });
    console.log("__________")
    if (error) {
        console.error("Both table names failed");
        setAccounts([]);
    } else {
      setAccounts(data || []);
    }
  }

  useEffect(() => { getAccounts(); }, []);

  return (
      <ul>
        {accounts.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
  );
}

export default App
