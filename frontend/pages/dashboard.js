import withApollo from '../lib/ApolloClient';
import Dashboard from '../components/Dashboard';

const DashboardPage = () => {
    return (
        <Dashboard/>
    );
};

export default withApollo(DashboardPage);