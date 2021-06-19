import { screen, render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import SignIn from '../components/SignIn';
import { GET_USER_QUERY } from '../components/Layout/PageProvider';

const loggedInMock = [{
    request: {
        query: GET_USER_QUERY,
    },
    result: {
        data: {
            user: {
                fst_nm: "Appa",
                lst_nm: "Airbender",
            },
        },
    },
}];

const notLoggedInMock = [{
    request: {
        query: GET_USER_QUERY,
    },
    result: {
        data: {
            user: null,
        },
    },
}];

jest.mock("next/router", () => ({
    useRouter: () => {
        return {
            route: "",
            pathname: "",
            query: "",
            asPath: "",
        };
    },
    prefetch: jest.fn(),
    push: jest.fn(),
}));

/* spyOn creates a mock function similar to jest.fn but also tracks calls to object[methodName]. Returns a Jest mock function.
creating mockfunctions for the mock I declared globally above for next/router. This will track calls to router
*/
// const useRouter = jest.spyOn(require("next/router"), "useRouter");
const preFetch = jest.spyOn(require("next/router"), "prefetch");
const push = jest.spyOn(require("next/router"), "push");

describe('Sign In', () => {
    it('prefetches dashboard page', async () => {
        render(
            <MockedProvider mocks={loggedInMock}>
                <SignIn/>
            </MockedProvider>,
        );
        await waitFor(() => {
            expect(preFetch).toHaveBeenCalledWith("/dashboard");
        });
    });
    it('redirects to dashboard when user response is present', async () => {
        render(
            <MockedProvider mocks={loggedInMock}>
                <SignIn/>
            </MockedProvider>,
        );
        await waitFor(() => {
            expect(push).toHaveBeenCalledWith({
                pathname: "/dashboard",
            });
        });
    });
    it('renders login form when user is null', async () => {
        render(
            <MockedProvider mocks={notLoggedInMock}>
                <SignIn/>
            </MockedProvider>,
        );
        await waitFor(() => {
            expect(screen.getByTestId('sign-in-form')).toBeInTheDocument()
        });
    });
});