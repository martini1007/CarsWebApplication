import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../App";
import CarList from "../Components//CarList";
import CarDetails from "../Components/CarDetails";
import CarEdit from "../Components/CarEdit";
import CarCreate from "../Components/CarCreate";
import NotFound from "../Components/NotFound";
import Login from "../Login/Login"
import Register from "../Login/Register"

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children:[
            {path: 'cars', element: <CarList />},
            {path: 'cars/:id', element: <CarDetails />},
            {path: 'edit/:id', element: <CarEdit />},
            {path: 'create', element: <CarCreate />},
            {path: 'login', element: <Login />},
            {path: 'register', element: <Register />},
            {path: 'not-found', element: <NotFound />},
            {path: '*', element: <Navigate replace to='/not-found' />}
        ]
    }
]

export const router = createBrowserRouter(routes);