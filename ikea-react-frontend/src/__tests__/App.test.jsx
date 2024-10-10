// App.test.jsx
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import App from "../App";
import React from 'react';

test("Test that stuff is on the screen", () => {
    const { container } = render(<App />);
    const newUserTitle = screen.getByText("New User");
    const nameInput = container.querySelector('#name');
    const isAdminInput = container.querySelector('#isAdmin');
    const isBadassInput = container.querySelector('#isBadass');
    const submitButton = container.querySelector('#submitButton');

    expect(newUserTitle).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(isAdminInput).toBeInTheDocument();
    expect(isBadassInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
});