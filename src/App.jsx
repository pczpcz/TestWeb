import { useEffect, useState } from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//ref: https://github.com/donalffons/opencascade.js
import "@google/model-viewer";
import { visualizeShapes } from "./occtest/visualize.js";
import { initOcc } from "./occtest/initocc.js";
//import initOpenCascade from "opencascade.js";
const oc = await initOcc();
//const oc = await initOpenCascade();
//const { sphereSize } = params;
const box = new oc.BRepPrimAPI_MakeBox_2(1, 1, 1);
const sphere = new oc.BRepPrimAPI_MakeSphere_5(new oc.gp_Pnt_3(0.5, 0.5, 0.5), 50);
//const cut = new oc.BRepAlgoAPI_Cut_3(box.Shape(), sphere.Shape(), new oc.Message_ProgressRange_1());
//cut.Build(new oc.Message_ProgressRange_1());
const modelUrl = visualizeShapes(oc, sphere.Shape());

import { createClient } from "@supabase/supabase-js";
//const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

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

  //useEffect(() => { getAccounts(); }, []);

  return (
    <><model-viewer src={modelUrl} camera-controls enable-pan /></>
      
      //<div>

        //<ul>
        //  {accounts.map((item) => (
        //    <li key={item.name}>{item.name}</li>
       //   ))}
       // </ul>
      //</div>
  );
}

export default App
