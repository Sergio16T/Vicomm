import styled from 'styled-components';

const ProductPageContent = styled.div`
    padding-left: 210px;
    padding-top: 120px;
    padding-bottom: 100px;
    width: 100%;
    box-sizing: border-box;
    background: linear-gradient(#221b43 440px, white 440px);
    @media (max-width: 800px) {
        padding: 100px 0 100px 0;
    }
`;


const Body = styled.div`
    display: flex;
    flex-direction: column;
    justify-content:center;
    padding: 1rem 2rem;
    align-items: center;
    /* background-color: #F2F2F2;  */
    /* margin: 0 auto;  */
    .form-container {
        background: white;
        box-shadow: ${props => props.theme.bs};
        padding: .5rem;
        border-radius: 4px;
        margin: 2rem 0;
    }
    @media (max-width: 800px) {
        padding: 2rem;
    }
`;

const Form = styled.form`
    position: relative;
    font-family: 'Lato';
    width: 100%;
    max-width: 720px;
    .formCol, .flex-group {
        height: 70px;
        box-sizing: border-box;
    }
    .formRow, .flex-row {
        width: 100%;
        margin: 2rem 0;
        &:first-of-type {
            margin-top: 1.5rem;
        }
        label {
            font-size: 2rem;
            margin-bottom: .5rem;
            display: block;
            transform: translateY(-33px);
            transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
            transform-origin: top left;
            pointer-events: none;
            /* overflow: hidden; */
            text-overflow: ellipsis;
            white-space: nowrap;
            color: rgba(255,255,255,0.3);
        }
        .active-content {
            transform: translateY(-58px) scale(.55);
        }
        .required-label, .label-error {
            transform: translateY(-26px);
            color: rgba(255,255,255,0.7);
        }
        input {
            font-size: 2rem;
            border: 0;
            border-bottom: 1px solid rgba(255,255,255,0.3);
            padding: .25rem 0;
            width: 100%;
            box-sizing: border-box;
            height: 35px;
            z-index: 2;
            background: transparent;
            color: white;
            border-radius: 0;
            -webkit-border-radius: 0;
            &:focus {
                outline: none;
                border-bottom: 2px solid rgba(255,255,255,0.3);
                &:focus + label {
                    transform: translateY(-58px) scale(.55);
                    color: rgba(255,255,255,0.7);
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
            margin-right: 1rem;
            flex-basis: 72.75%;
        }
        .formCol {
            flex-grow: 2;
            margin-right: 1rem;
            position: relative;
            &:last-child {
                margin-right: 0;
                .row2 {
                    max-width: 184.2px;
                }
            }
        }
    }
    .input-addOn {
        position: absolute;
        right: 3px;
        transform: translateY(-68px);
        font-size: 2rem;
        color: white;
    }
    .form-button-row {
        width: 100%;
        display: flex;
        justify-content: center;
        button {
            margin: auto;
            font-size: 1.4rem;
            border-radius: 6px;
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
    .descriptionRow {
        box-sizing: border-box;
        width: 100%;
        margin: 2rem 0;
        padding: 2rem;
        border-radius: 4px;
        box-shadow: ${props => props.theme.bs};
        label {
            text-transform: uppercase;
            font-size: 1.4rem;
            color: #A3AFBF;
        }
        textArea {
            margin-top: 1rem;
            width: 100%;
            min-height: 300px;
            border: 1px solid #d9e4ec;
            box-sizing: border-box;
            font-family: "Lato";
            padding: .5rem;
            font-size: 1.4rem;
            &:focus {
                outline: none;
            }
        }
    }
    @media (min-width: 971px) {
        .flex-row {
            .flex-group {
                .formCol {
                    max-width: 255.91px;
                }
            }
        }
    }
    @media (max-width: 970px) {
        .form-row, .flex-row {
            margin: 0;
        }
        .mobile-row {
            margin-bottom: 2rem;
        }
        .flex-row {
            flex-direction: column;
            .flex-group {
                    margin-right: 0;
                    flex-basis: auto;
            }
            .formCol {
                    margin-bottom: .75rem;
            }
            .mb-0 {
                margin-bottom: 0;
            }
        }
    }
    @media (max-width: 480px) {
        .formRow, .flex-row {
            input, label, .input-addOn {
                font-size: 1.8rem;
            }
        }
    }
`;

export { ProductPageContent, Body, Form };