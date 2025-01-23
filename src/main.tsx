import "./App.css"
import App from "./App"
import { createRoot } from "react-dom/client"

const rootElement = document.getElementById("root")

if(rootElement){
  const root = createRoot(rootElement);
  root.render(
      <App/>
  )
}else{
  console.log("No se encontro el root")
}