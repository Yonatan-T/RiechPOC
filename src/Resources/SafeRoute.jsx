import { Redirect, Route } from "react-router-dom"

const SafeRoute = ({ path, component, user, exact }) => {
    if (user) {
        return <Route path={path} exact component={component} />
    } else
    return <Route path={path} >
        <Redirect to='/login' />
    </Route>
}

export default SafeRoute
