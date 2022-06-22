import { render, screen } from '@testing-library/react';
import Selector from '../Selector';
import PLANET_DATA from '../../../data/planets.data';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import testStore from '../../../store/testIndex';

describe("Selector page testing", () => {
    const getRender = () => {
        return render(
            <Provider store={testStore}>
                <Selector planets={PLANET_DATA} setHasSearched={jest.fn()} setResult={setResults}/>
            </Provider>);
    }

    const setResults = jest.fn();

    it("Should display the container correctly", () => {
        getRender();
        expect(screen.getAllByTestId('container')).toHaveLength(1);
        expect(screen.getAllByTestId('row')).toHaveLength(3);
        expect(screen.getAllByTestId('col')).toHaveLength(7);
    });

    it("Should display the main text properly", () => {
        getRender();
        expect(screen.getByText('Select planets you want to search in:')).toBeInTheDocument();
        expect(screen.getByText('Maximum Time: 0')).toBeInTheDocument();
    });

    it("Button should not be working on start", () => {
        getRender();

        const buttonElement = screen.queryByTestId("button") as HTMLElement;
        expect(screen.getByText('Find Falcone!')).toBeInTheDocument();
        userEvent.click(buttonElement);
        expect(setResults).toBeCalledTimes(0);
        expect(buttonElement).toHaveProperty('disabled', true);
    });

    it("Button should be clickable when the form is completed", () => {
        getRender();
        userEvent.click(screen.getByTestId("1-dropdown-button"));
        userEvent.click(screen.getByTestId("1-dropdown-Donlon"));

        userEvent.click(screen.getByTestId("2-dropdown-button"));
        userEvent.click(screen.getByTestId("2-dropdown-Enchai"));

        userEvent.click(screen.getByTestId("3-dropdown-button"));
        userEvent.click(screen.getByTestId("3-dropdown-Jebing"));

        userEvent.click(screen.getByTestId("4-dropdown-button"));
        userEvent.click(screen.getByTestId("4-dropdown-Pingasor"));

        userEvent.click(screen.getByTestId("1-radio-group-Space pod"));
        userEvent.click(screen.getByTestId("2-radio-group-Space rocket"));
        userEvent.click(screen.getByTestId("3-radio-group-Space shuttle"));
        userEvent.click(screen.getByTestId("4-radio-group-Space ship"));

        const buttonElement = screen.getByTestId("button") as HTMLElement;

        userEvent.click(buttonElement);
        expect(buttonElement).toHaveProperty('disabled', false);
        expect(screen.getByText('Maximum Time: 60')).toBeInTheDocument();
    });

    it("Shouldn't allow the user to select the same planet", () => {
        getRender();
        userEvent.click(screen.getByTestId("1-dropdown-button"));
        userEvent.click(screen.getByTestId("1-dropdown-Donlon"));
        userEvent.click(screen.getByTestId("2-dropdown-button"));

        expect(screen.queryByTestId("2-dropdown-Donlon")).toBeNull();
    });

    it("Should disable the radio button when the ship runs out of stock", () => {
        getRender();
        userEvent.click(screen.getByTestId("1-dropdown-button"));
        userEvent.click(screen.getByTestId("1-dropdown-Donlon"));

        userEvent.click(screen.getByTestId("2-dropdown-button"));
        userEvent.click(screen.getByTestId("2-dropdown-Enchai"));

        userEvent.click(screen.getByTestId("3-dropdown-button"));
        userEvent.click(screen.getByTestId("3-dropdown-Jebing"));

        userEvent.click(screen.getByTestId("4-dropdown-button"));
        userEvent.click(screen.getByTestId("4-dropdown-Pingasor"));

        userEvent.click(screen.getByTestId("1-radio-group-Space ship"));
        userEvent.click(screen.getByTestId("2-radio-group-Space ship"));
 
        expect(screen.getByTestId("3-radio-group-Space ship")).toHaveClass("Mui-disabled");
    });
});