import React from 'react';
import { useQuery, gql } from '@apollo/client'; 

const GET_USER_QUERY = gql`
    query GET_USER_QUERY {
        user {
            FST_NAME,
            LST_NAME
        }
    }
`;

const DashBoard = () => {
    const { loading, error, data } = useQuery(GET_USER_QUERY); 
    if(error) console.log(error)
    if(data) console.log(data); 
    return (
        <div>
            
        </div>
    );
};

export default DashBoard;