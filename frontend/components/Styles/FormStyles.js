import styled from 'styled-components';

const Body = styled.div`
    display: flex;
    flex-direction: column;
    justify-content:center;
    padding: 0 2rem;
    align-items: center;
    /* margin: 0 auto;  */
`;

const Form = styled.form`
    position: relative;
    font-family: 'Lato';
    width: 100%;
    .formRow {
        width: 100%;
        margin: 2rem 0;
        label {
            color: #A3AFBF;
            text-transform: uppercase;
            font-size: 1.2rem;
            margin-bottom: .5rem;
            display: block;
        }
        input {
            font-size: 1.4rem;
            border: 1px solid #d9e4ec;
            border-radius: 4px;
            padding: .75rem 1rem;
            width: 100%;
            box-sizing: border-box;
        }
    }
    .form-button-row {
        width: 100%;
        display: flex;
        justify-content: center;
        button {
            margin: auto;
            font-size: 1.4rem;
            border-radius: 6px;
            /* width: 40%;   */
            width: 100%;
            outline: none;
            padding: 1.25rem 1rem;
            background-color: #3BD2A2;
            border: none;
            color: white;
            text-transform: uppercase;
            &:hover {
                cursor: pointer;
            }
        }
    }
    .error {
        color: red;
        font-size: 1rem;
        margin: .25rem 0;
    }

`;

export { Body, Form };