import withApollo from '../lib/ApolloClient'; 
import SignUp from '../components/SignUp'; 

const SignupPage = () => {
    return (
        <SignUp/>
    );
};

export default withApollo(SignupPage);