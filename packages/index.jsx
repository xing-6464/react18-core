import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root'))
let element = <div>
    <div>xing</div>
    <div>guang</div>
    <div>book：<a style={{ color: 'blue' }} href="https://www.yangyitao.com/react18">https://www.yangyitao.com/react18</a></div>
</div>
root.render(element)
console.log("index.jsx", element);