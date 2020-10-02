import styled from 'styled-components'; 

const DropZone = styled.div`
    padding: 2rem 1rem; 
    border-style: dashed;
    border-color: #d9e4ec;
    display: flex; 
    justify-content: center;
    flex-direction: column;
    align-items: center; 
    &:focus {
        outline: none; 
    }
    #dropZoneImg {
        width: 120px;
        height: 120px; 
        /* cursor: pointer;  */
        margin: -30px 0; 
    }
    .retroCam {
        margin-top: .5rem;
        font-size: 4.5rem;
        color: #A3AFBF;
    }
    p {
        font-size: 1.2rem; 
        text-transform: uppercase; 
        /* color: #A3AFBF;  */
        color: rgba(0,0,0,0.38);
    }
    .line-break-container {
        display: flex; 
        align-items: center; 
        padding: .75rem 0; 
        margin: 0; 
        .lineBreak {
            width: 100px;
            height: 2px; 
            background-color: #eee; 
        }
        #or-text { 
            /* color: #A3AFBF;  */
            color: rgba(0,0,0,0.38);
            margin: 0 1rem; 
            text-transform: uppercase; 
            font-size: 1.2rem; 
        }
    }
    .browse-btn {
        text-transform: uppercase; 
        outline: none; 
        background-color: rgba(158,158,158,0.2);
        border-radius: 6px; 
        border: 0;
        padding: 1rem 1.2rem;
        margin: 1rem 0;
        font-size: 1.1rem; 
        color: rgba(0,0,0,0.38);
        display: flex; 
        align-items: center;
        cursor: pointer;
        .imgIcon {
            margin-right: 1rem;
        }
    }
`; 
export default DropZone; 