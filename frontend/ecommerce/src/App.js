import{BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './pages/Login'
import ProductsPage from './pages/ProductsPage'
import ProductManage from './pages/ProductManage'
import SignUp from './pages/Signup'
import NavBar from './component/Navbar'
import ManageProfile from './pages/ManageProfile'
import ManageUsers from './pages/ManageUsers';
import ManageOrder from './pages/ManageOrder';
import MyOrders from './pages/myOrders';
import MyDelivery from './pages/MyDelivery';
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
           path="/ProfilePage"
           element= {<ManageProfile/>}
            />
        </Routes>
         <Routes>
           <Route
           path="/ManageUser"
           element= {<ManageUsers/>}
            />
        </Routes>
           <Routes>
           <Route
           path="/ManageOrders"
           element= {<ManageOrder/>}
            />
        </Routes>
       <Routes>
           <Route
           path="/MyOrders"
           element= {<MyOrders/>}
            />
        </Routes>
        <Routes>
           <Route
           path="/MyDelivery"
           element= {<MyDelivery/>}
            />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
