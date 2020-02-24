import React from "react";
import {render} from "@testing-library/react";
import Commands from "./Commands";
import userEvent from "@testing-library/user-event";

describe("Commands", () => {
    it("should call the callbacks when buttons are clicked", () => {
        const leftMock = jest.fn();
        const rightMock = jest.fn();
        const moveMock = jest.fn();

        const characterId = "id";
        const listeners = {
            left: leftMock, move: moveMock, right: rightMock
        };

        const commands = render(<Commands characterId={characterId} listeners={listeners}/>);

        userEvent.click(commands.getByTestId("left-button-id"));
        expect(leftMock).toBeCalledWith(characterId);

        userEvent.click(commands.getByTestId("move-button-id"));
        expect(moveMock).toBeCalledWith(characterId);

        userEvent.click(commands.getByTestId("right-button-id"));
        expect(rightMock).toBeCalledWith(characterId);
    });
});
