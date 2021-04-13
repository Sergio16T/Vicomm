import Home from '../components/Home';
import withApollo from '../lib/ApolloClient';

const HomePage = () => {
    return (
        <Home/>
    );
}
export default withApollo(HomePage)