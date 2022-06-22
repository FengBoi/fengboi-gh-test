import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {render, screen} from '@testing-library/react'

import PageHeader from '../PageHeader';

Enzyme.configure({ adapter: new Adapter() });

describe("PageHeader testing", () => {
    let headerWrapper: ShallowWrapper;

    beforeEach(() => {
        headerWrapper = shallow(<PageHeader/>)
    })

    it("should render correctly", () => {
        expect(headerWrapper).toBeDefined();
    });

    it("Should display correct text", () => {
        expect(headerWrapper.text()).toEqual('Finding Falcone!');
    });

    it("RTL - Should render correctly", () => {
        render(<PageHeader/>)
        expect(screen.getByText('Finding Falcone!')).toBeInTheDocument()
    });

});