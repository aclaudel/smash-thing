import React from "react";
import {render} from "@testing-library/react";
import Commands from "./Commands";
import userEvent from "@testing-library/user-event";

describe("Commands", () => {
    it("should call the callbacks when buttons are clicked", () => {
        const leftMock = jest.fn();
        const rightMock = jest.fn();
        const moveMock = jest.fn();
        const listeners = {
            left: leftMock, move: moveMock, right: rightMock
        };
        const commands = render(<Commands listeners={listeners}/>);

        userEvent.click(commands.getByTestId("left-button"));
        expect(leftMock).toBeCalled();

        userEvent.click(commands.getByTestId("move-button"));
        expect(moveMock).toBeCalled();

        userEvent.click(commands.getByTestId("right-button"));
        expect(rightMock).toBeCalled();
    });
});