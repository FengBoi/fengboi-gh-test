import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {render, screen} from '@testing-library/react'

import PageFooter from '../PageFooter';

Enzyme.configure({ adapter: new Adapter() });

describe("PageFooter testing", () => {
    let footerWrapper: ShallowWrapper;

    beforeEach(() => {
        footerWrapper = shallow(<PageFooter/>)
    })

    it("should render correctly", () => {
        expect(footerWrapper).toBeDefined();
    });

    it("Should display correct text", () => {
        expect(footerWrapper.text()).toEqual('From Andy Zhao Truong');
    });

    it("RTL - Should render correctly", () => {
        render(<PageFooter/>)
        expect(screen.getByText('From Andy Zhao Truong')).toBeInTheDocument();
    });
});