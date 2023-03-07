
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Account } from './page/account';
import { MyList } from './page/myList';
import { MyMemo } from './page/myMemo';
import { Layout } from './page/layout';
import { MyMemoCard } from './page/myMemoCard';

function App() {
  return (
    <div className="App polka flex justify-center items-center min-h-screen ">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route path='myList' element={<MyList/>}/>
              <Route path='myMemo' element={<MyMemo/>}/>
              <Route path='myMemo/card' element={<MyMemoCard/>}/>
              <Route path='account' element={<Account/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
