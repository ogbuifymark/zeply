import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import {rest} from 'msw'
const axios = require('axios');
import { setupServer } from 'msw/node'
import Landing from '../components/Landing';
import GeneralProvider from '../Context';
import userEvent from '@testing-library/user-event';

describe('testing Landing Page', () => {
    
    test('renders landing page', () => {
        const landingComponent = render(<GeneralProvider><BrowserRouter><Landing /></BrowserRouter></GeneralProvider>);
        expect(landingComponent.getByTestId('heading')).toBeInTheDocument();
        expect(landingComponent.getByTestId('heading')).toHaveTextContent(/Welcome To Bitcoin Information Dashboard/);


    });

    test('renders other components ', () => {
        const otherComp = render(<GeneralProvider><BrowserRouter><Landing /></BrowserRouter></GeneralProvider>);
        expect(otherComp.getByTestId('search-button')).toBeInTheDocument();
        expect(otherComp.getByTestId('search-input')).toBeInTheDocument();

        expect(otherComp.getByTestId('trans-header')).toHaveTextContent(/Transactions/);
        expect(otherComp.getByTestId('address-header')).toHaveTextContent(/Overview/);
        expect(otherComp.getByTestId('block-header')).toHaveTextContent(/Blocks/);


    });

 
})
