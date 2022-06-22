import Result from '../Results';
import { render, screen } from '@testing-library/react';
import { ResultObject } from '../../../objects/resultObject';
import { Provider } from 'react-redux';
import store from '../../../store';
import SHIP_DATA from '../../../data/ships.data';
import fakeResultsObject from '../../../data/fakeResultsObject.data';
import fakeFailedResultsObject from '../../../data/fakeFailedResultsObject.data';
import userEvent from '@testing-library/user-event';

describe("Results page testing", () => {
    const getRender = (resultObject: ResultObject) => {
        return render(
            <Provider store={store}>
                <Result resultObject={resultObject} setHasSearched={setHasSearch} ships={SHIP_DATA}/>
            </Provider>
        );
    }

    const setHasSearch = jest.fn();

    it("Should display the container correctly -> Happy Path", () => {
        getRender(fakeResultsObject);
        expect(screen.getAllByTestId('container')).toHaveLength(1);
        expect(screen.getAllByTestId('row')).toHaveLength(4);
        expect(screen.getAllByTestId('col')).toHaveLength(4);
    });

    it("Should display the container correctly -> Failed Path", () => {
        getRender(fakeFailedResultsObject);
        expect(screen.getAllByTestId('container')).toHaveLength(1);
        expect(screen.getAllByTestId('row')).toHaveLength(2);
        expect(screen.getAllByTestId('col')).toHaveLength(2);
    });

    it("Should correct message -> Happy Path", () => {
        getRender(fakeResultsObject);
        expect(screen.getByText('Success! Congratulations on Finding Falcone. King Shan is mighty pleased.')).toBeInTheDocument();
        expect(screen.getByText('Time taken: 20')).toBeInTheDocument();
        expect(screen.getByText('Planet found: fakePlanet')).toBeInTheDocument();
    });

    it("Should corret message -> Failed Path", () => {
        getRender(fakeFailedResultsObject);
        expect(screen.getByText('Unsucessful, please try again commander')).toBeInTheDocument();

    });

    it("Button should work as intended", () => {
        getRender(fakeResultsObject);
        const buttonElement = screen.queryByTestId("button") as HTMLElement
        userEvent.click(buttonElement);
        expect(setHasSearch).toBeCalled()
    });

});