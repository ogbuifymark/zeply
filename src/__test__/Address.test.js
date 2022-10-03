import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AddressOverview from '../components/AddressOverview';
import GeneralProvider from '../Context';

describe('testing Address Component', ()=>{

    test('renders table in the component', async() => {
        render(<GeneralProvider><BrowserRouter><AddressOverview /></BrowserRouter></GeneralProvider>);
        // const tableRowCount = await screen.findAllByRole('tr')
        // expect(tableRowCount).toHaveLength(5)


    });

    
})
