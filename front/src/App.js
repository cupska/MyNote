
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { About } from './page/account';
import { MyList } from './page/myList';
import { MyMemo } from './page/myMemo';
import { Layout } from './page/layout';
import { MyMemoCard } from './page/myMemoCard';
import { Auth } from './page/auth/auth';

function App() {
  return (
    <div className="App polka flex justify-center items-center min-h-screen ">
      <BrowserRouter>
          <Routes>
            <Route path='/auth' element={<Auth/>}/>
            <Route path="/" element={<Layout/>}>
              <Route path='myList' element={<MyList/>}/>
              <Route path='myMemo' element={<MyMemo/>}/>
              <Route path='myMemo/card' element={<MyMemoCard/>}/>
              <Route path='about' element={<About/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
