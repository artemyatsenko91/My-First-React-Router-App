import { Routes, Route } from "react-router-dom";
import { UserInfo } from "./pages/UserInfo";
import Users from './pages/Users';
import Error from './components/Errors';
import Header from './components/Header';
import Todos from './pages/Todos';
import UserPosts from './pages/Posts';
import Albums from './pages/Albums';

const App = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Header />}>
					<Route path="users" element={<Users />} />
					<Route path="users/:id" element={<UserInfo />}>
						<Route path="albums" element={<Albums />} />
						<Route path="todos" element={< Todos />} />
						<Route path="posts" element={< UserPosts />} />
					</Route>
					<Route path="*" element={<Error />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;