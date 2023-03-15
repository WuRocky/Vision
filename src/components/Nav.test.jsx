import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { AppContext } from "../Layout";
import Nav from "./Nav";
import renderer from "react-test-renderer"; // Add this import

const renderWithContext = (user) => {
    return render(
        <AppContext.Provider value={{ user }}>
            <Router>
                <Nav />
            </Router>
        </AppContext.Provider>
    );
};

describe("Nav component", () => {
    // Add the snapshot test for no user
    test("renders Nav component as a snapshot without user", () => {
        const tree = renderer
            .create(
                <AppContext.Provider value={{ user: null }}>
                    <Router>
                        <Nav />
                    </Router>
                </AppContext.Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    // Add the snapshot test for logged-in user
    test("renders Nav component with logged-in user as a snapshot", () => {
        const user = { uid: "123", displayName: "John Doe" };
        const tree = renderer
            .create(
                <AppContext.Provider value={{ user }}>
                    <Router>
                        <Nav />
                    </Router>
                </AppContext.Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("shows Register / Sign In link when user is not logged in", () => {
        renderWithContext(null);
        const signInLink = screen.getByText(/Register \/ Sign In/i);
        expect(signInLink).toBeInTheDocument();
    });

    test("shows Write, Member, and Sign out links when user is logged in", () => {
        const user = { uid: "123", displayName: "John Doe" };
        renderWithContext(user);
        const writeLink = screen.getByText(/Write/i);
        const memberLink = screen.getByText(/Member/i);
        const signOutLink = screen.getByText(/Sign out/i);

        expect(writeLink).toBeInTheDocument();
        expect(memberLink).toBeInTheDocument();
        expect(signOutLink).toBeInTheDocument();
    });
});
