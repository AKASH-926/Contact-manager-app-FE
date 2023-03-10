
import './App.css';
import ContactPage from './components/contactpage/ContactPage';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from './components/signup/Signup';
import Login from "../src/components/Login/Login"
import Protected_route from './components/Protected_routes/Protected_route';
import ContactProvider from './components/Context/ContactProvider';
import SearchProvider from './components/Context/SearchProvider';
import ImportProvider from './components/Context/ImportProvider';
function App() {
  return (
    <>
      <BrowserRouter>
        <ImportProvider>
          <ContactProvider>
            <SearchProvider>
              <Routes>
                <Route path='/signup' element={<Signup />} />
                <Route path='/' element={<Login />} />
                {/* eslint-disable-next-line  */}
                <Route element={<Protected_route />}>
                  <Route path='/contacts' element={
                    <ContactPage />} />
                </Route>
              </Routes>
            </SearchProvider>
          </ContactProvider>
        </ImportProvider>
      </BrowserRouter>

    </>
  );
}

export default App;
