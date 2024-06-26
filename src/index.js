import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {RecoilRoot} from "recoil";

const root = ReactDOM.createRoot(document.getElementById('root'));
// React.StrictMode : 애플리케이션 내의 잠재적인 문제를 알아내기 위한 도구
root.render(
    <RecoilRoot>
        <App />
    </RecoilRoot>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
