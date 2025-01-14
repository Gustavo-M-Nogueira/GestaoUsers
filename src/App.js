import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserListPage from './pages/userListPage';
import UserFormPage from './pages/userFormPage';
import UserDetailsPage from './pages/userDetailsPage';
import Header from './components/header'; // Import Header
import Footer from './components/footer'; // Import Footer
import { UserProvider } from './context/userContext';

function App() {
    return (
        <UserProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<UserListPage />} />
                    <Route path="/user/new" element={<UserFormPage />} />
                    <Route path="/user/:id" element={<UserFormPage />} /> {/* Edit page */}
                </Routes>
                <Footer />
            </Router>
        </UserProvider>
    );
}

export default App;
