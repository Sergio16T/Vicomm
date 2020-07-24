import Home from '../components/Home'; 
import WithApollo from '../lib/ApolloClient'; 

const HomePage = (props) => {
    return (
        <Home/>
    );
}
export default WithApollo(HomePage)