import{BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './pages/Login'
import ProductsPage from './pages/ProductsPage'
import ProductManage from './pages/ProductManage'
import GamePage from './pages/GamePage'
import SignUp from './pages/Signup'
import NavBar from './component/Navbar'


function App() {
  return (
    <div>
      <BrowserRouter>
      <NavBar />
      <div >
        <Routes>
           <Route
           path="/"
           element= {<Login/>}
            />
        </Routes>
         <Routes>
           <Route
           path="/signUp"
           element= {<SignUp/>}
            />
        </Routes>
        <Routes>
           <Route
           path="/EvidencePage"
           element= {<ProductsPage/>}
            />
        </Routes>
        <Routes>
           <Route
           path="/GhostPage"
           element= {<ProductManage/>}
            />
        </Routes>
        <Routes>
           <Route
           path="/GamePage"
           element= {<GamePage/>}
            />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
