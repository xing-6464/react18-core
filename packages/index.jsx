import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root'))
function FunctionComponent() {
    return <div 
        onClick={(event) => console.log(`ParentNodeBubble`)}
        onClickCapture={(event) => {
            console.log(`ParentNodeCapture`)
            
        }}>
        <div>课程名称：</div>
        <div onClick={(event) => {
          console.log(`ChildNodeBubble`);
          
        }}
        onClickCapture={(event) => console.log(`ChildNodeCapture`)}>讲师</div>
        <div>电子书：<a style={{ color: 'blue' }} href="https://www.yangyitao.com/react18">https://www.yangyitao.com/react18</a></div>
    </div>
}
root.render(<FunctionComponent />)
console.log("index.jsx", <FunctionComponent />);