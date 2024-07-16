import { createRoot } from "react-dom/client"

const root = createRoot(document.getElementById('root'))

let element = <div>
  <div>xing:xing</div>
  <div>guang: guang</div>
  <div>电子书: <a style={{color: 'blue'}} href="bw">xing</a></div>
</div>

root.render(element)
