import { createRoot } from "react-dom/client"

const root = createRoot(document.getElementById('root'))

let element = <div>
  <div>xing:xing</div>
  <div>guang: guang</div>
  <div>电子书: <a href="bw">xing</a></div>
</div>

console.log("index.jsx", element)

root.render(element)
