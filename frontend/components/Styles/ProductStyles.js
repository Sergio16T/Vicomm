import styled from 'styled-components'; 

const ProductPageContent = styled.div`
    padding-left: 210px; 
    padding-top: 120px; 
    width: 100%; 
    height: 100%;
    box-sizing: border-box; 

    @media (max-width: 800px) {
        padding: 100px 0 0 0; 
    }
`; 


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
    max-width: 800px;
    .formRow, .flex-row {
        width: 100%; 
        margin: 2rem 0; 
        label {
            color: #A3AFBF; 
            /* text-transform: uppercase;  */
            font-size: 2rem; 
            margin-bottom: .5rem;
            display: block; 
            transform: translateY(-33px);
            transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
            transform-origin: top left; 
            pointer-events: none; 
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap
        }
        .active-content {
                transform: translateY(-58px) scale(.7);
        }
        input {
            font-size: 2rem; 
            border: 0;
            border-bottom: 1px solid #d9e4ec; 
            /* border-radius: 4px;  */
            padding: .25rem; 
            width: 100%; 
            box-sizing: border-box; 
            z-index: 2;
            &:focus {
                outline: none;
                box-shadow: inset 0 -2px 1px -2px grey;
                &:focus + label {
                    transform: translateY(-58px) scale(.7);
                }
            }
        }
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }
    input[type=number] {
    -moz-appearance: textfield;
    }
    .flex-row {
        display: flex; 
        flex-direction: row; 
        .flex-group {
            display: flex;
            flex-grow: 1;
            margin-right: 1rem;
        }
        .formCol {
            flex-grow: 1; 
            margin-right: 1rem; 
            position: relative;
            &:last-child {
                margin-right: 0; 
            }
        }
    }
    .input-addOn {
        position: absolute; 
        right: 3px; 
        transform: translateY(-68px);
        font-size: 2rem;
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
   @media (max-width: 800px) {
       .flex-row {
           flex-direction: column;
       }
   }
`; 

export { ProductPageContent, Body, Form }; 