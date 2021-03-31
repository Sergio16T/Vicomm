import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Spinner } from '../SpinKit/Spinner';

const SaveProductButtonContainer = styled.div`
    display: flex;
    margin-left: 15px;
    .saveButtonContainer {
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;
        .submenu {
            position: absolute;
            width: calc(100%  + 45px);
            top: 34.19px;
            left: 0;
            border-radius: 6px;
            opacity: 0;
            background-color: white;
            box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
            transition: opacity .2s ease;
            &.open {
                opacity: 1;
            }
            ul {
                padding: .25rem 0;
                li {
                    font-size: 1.2rem;
                    padding: .75rem 1.25rem;
                    text-align: left;
                    list-style: none;
                    cursor: pointer;
                    &:hover {
                        background-color: rgba(0, 0, 0, 0.1);
                    }
                }
            }
        }
    }
    button {
        text-transform: uppercase;
    }
    #save-button {
        margin: 0;
        position: relative;
        overflow: hidden;
        outline: none;
        border: 0;
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
        background: rgb(255,171,0);
        cursor: pointer;
        padding: .8rem 2rem;
        color: white;
        font-size: 1.1rem;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
        opacity: ${props => props.disabled ? 0.4 : 1};
        pointer-events: ${props => props.disabled ? "none": "auto"};
        &:focus {
            outline: none;
        }
    }
    .dropdown-menu {
        background: rgb(255,171,0);
        padding: .8rem 1rem;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
        display: flex;
        align-items: center;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
        cursor: pointer;
        opacity: ${props => props.disabled ? 0.4 : 1};
        pointer-events: ${props => props.disabled ? "none": "auto"};
        .fas {
            font-size: 1.3rem;
            color: white;
        }
    }
    #cancel-button {
        outline: none;
        border: none;
        background-color: transparent;
        color: white;
        margin-left: 10px;
        font-size: 1.1rem;
        padding: .4rem;
        cursor: pointer;
    }
    @media (max-width: 400px) {
        margin-left: 0px;
        #save-button {
            padding: .8rem 1.4rem;

        }
        #cancel-button {

        }
    }
`;

const SaveProductButton = ({ cancel, disabled, loading, submitForm }) => {
    const [isOpen, setIsOpen] = useState(false);
    const submenu = useRef();
    const caretMenu = useRef();

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    const handleClick = (e) => {
        if (caretMenu.current.contains(e.target)) {
            return;
        }
        if (!submenu.current.contains(e.target)) {
            setIsOpen(false);
        }
    }

    return (
        <SaveProductButtonContainer disabled={disabled}>
            <div className="saveButtonContainer">
                <button type="button" id="save-button" onClick={submitForm}>
                    {loading ? <Spinner style={{ width: "18px", height: "18px" }} spinner={true}/> : "Save"}
                </button>
                <div ref={caretMenu} className="dropdown-menu" onClick={() => setIsOpen(!isOpen)}>
                    <i className="fas fa-caret-down"></i>
                </div>
                <div ref={submenu} className={`submenu ${isOpen ? "open" : ""}`}>
                    <ul>
                        <li id="save-return-to-list" onClick={submitForm}>Save & return to list</li>
                        <li id="save-stay" onClick={submitForm}>Save & stay</li>
                        <li id="save-create-new" onClick={submitForm}>Save & create new</li>
                    </ul>
                </div>
            </div>
            <button type="button" id="cancel-button" onClick={cancel}>
                Cancel
            </button>
        </SaveProductButtonContainer>
    );
}

export default SaveProductButton;