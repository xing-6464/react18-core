import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root'))
function FunctionComponent() {
    return <div>
        <div>ssss</div>
        <div>sssadas</div>
        <div>asdas<a style={{ color: 'blue' }} href="https://www.yangyitao.com/react18">https://www.yangyitao.com/react18</a></div>
    </div>
}
root.render(<FunctionComponent/>)
console.log("index.jsx", <FunctionComponent/>);