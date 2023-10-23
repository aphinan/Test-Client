import './App.css';
import { FormProduct } from './Components/FormProduct';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import FormEditProduct from './Components/FormEditProduct';

function App() {


  return (

    <BrowserRouter>
    <div className="App">
      <h1>Form CRUD</h1>
      <Routes>
        <Route path='/' element={<FormProduct/>} />
        <Route path='/edit/:id' element={<FormEditProduct/>} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}
export default App;
