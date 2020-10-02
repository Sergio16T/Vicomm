import styled from 'styled-components'; 

const PageContent = styled.div`
    padding-left: 210px; 
    padding-top: 80px; 
    width: 100%; 
    height: 100%;
    box-sizing: border-box; 
    .welcome-section {
        padding: 1.5rem; 
    }
    .feature-section {
        display: grid; 
        grid-template-columns: 400px 400px; 
        grid-gap: 30px;
        box-sizing: border-box;  
        padding: 0 2rem 2rem 2rem; 
        justify-content: center; 
       .feature-suggestion:first-child {
            border-left: ${props => "3px solid" + props.theme.purple};
        }
        .feature-suggestion:last-child {
            border-left: ${props => "3px solid" + props.theme.pink};
        }
        .feature-suggestion {
            box-shadow: ${props => props.theme.bs}; 
            padding: 2.25rem 2rem; 
            &:hover {
                cursor: pointer; 
            }
            h3 {
                margin-top: 0; 
                margin-bottom: .75rem; 
                font-size: 1.4rem; 
                font-family: 'ubuntu'; 
            }
            span {
                font-size: 1.2rem; 
                color: rgba(0,0,0,0.54);
                margin-bottom: 1rem; 
            }
        }
    }
    @media (max-width: 1100px) {
        .welcome-section {
            /* padding-top: 100px;  */
        }
        .feature-section {
            padding: 0 4rem 2rem 4rem; 
            grid-template-columns: 1fr; 
        }
    }
    @media (max-width: 800px) {
        padding: 0; 
    }
    @media (max-width: 480px) {
        .feature-section {
            .feature-suggestion {
                h3 {
                    font-size: 1.2rem;
                }
                span {
                    font-size: 1.1rem; 
                }
            }
        }
    }
`;

export { PageContent }; 