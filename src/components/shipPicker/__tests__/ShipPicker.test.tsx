import PLANET_DATA from '../../../data/planets.data';
import ShipPicker from '../ShipPicker';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import userEvent from '@testing-library/user-event';
import testStore from '../../../store/testIndex';

describe("ShipPicker page testing", () => {
    const getRender = () => {
        return render(
            <Provider store={testStore}>
                <ShipPicker id={1} planets={PLANET_DATA} setOption={setOption} />
            </Provider>);
    }

    const setOption = jest.fn();

    it("Dropdown should have nothing selected initally", async () => {
        getRender();

        const dropdownInput = screen.queryByTestId("1-dropdown-input") as HTMLElement;
        expect(dropdownInput).toHaveProperty('value', '');
    })

    it("selecting a planet should work as intended", () => {
        getRender();
        const dropdownInput = screen.getByTestId("1-dropdown-input") as HTMLElement;

        userEvent.click(screen.getByTestId("1-dropdown-button"));
        userEvent.click(screen.getByTestId("1-dropdown-Donlon"));

        expect(dropdownInput).toHaveProperty('value', 'Donlon');
        expect(setOption).toBeCalled();
    })

    it("should render the radio group correctly after selecting a planet", () => {
        getRender();
        userEvent.click(screen.getByTestId("1-dropdown-button"));
        userEvent.click(screen.getByTestId("1-dropdown-Donlon"));
        userEvent.click(screen.getByRole("radio", { name: "Space pod" }));

        expect(screen.getByText('Space pod')).toBeInTheDocument();
        expect(screen.getByText('Space rocket')).toBeInTheDocument();
        expect(screen.getByText('Space shuttle')).toBeInTheDocument();
        expect(screen.getByText('Space ship')).toBeInTheDocument();
        expect(setOption).toBeCalledTimes(2);
    });
});