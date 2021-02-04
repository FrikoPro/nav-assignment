import { fireEvent, render } from '@testing-library/react';
import App from './App';

test('Test user interaction when response is valid', () => {
	const { getByLabelText, getByText } = render(<App />);

	const input1 = getByLabelText('Hva tjente du i fjor?');
	const input2 = getByLabelText('Hva tjente du for 2 år siden?');
	const input3 = getByLabelText('Hva tjente du for 3 år siden?');

	fireEvent.change(input1, { target: { value: '500000' } });
	fireEvent.change(input2, { target: { value: '450000' } });
	fireEvent.change(input3, { target: { value: '400000' } });
	fireEvent.click(getByText('Sjekk'));

	getByText('Du har rett til dagpenger');
	getByText('din dagsats: 1923');
});

test('test user interaction when response is not valid', () => {
	const { getByLabelText, getByText } = render(<App />);

	const input1 = getByLabelText('Hva tjente du i fjor?');
	const input2 = getByLabelText('Hva tjente du for 2 år siden?');
	const input3 = getByLabelText('Hva tjente du for 3 år siden?');

	fireEvent.change(input1, { target: { value: '1000000' } });
	fireEvent.change(input2, { target: { value: '450000' } });
	fireEvent.change(input3, { target: { value: '400000' } });
	fireEvent.click(getByText('Sjekk'));

	getByText('Du er ikke innvilget for dagpenger');
});

test('test user interaction when typing wrong value', () => {
	const { getByLabelText, getByText } = render(<App />);

	const input1 = getByLabelText('Hva tjente du i fjor?');
	const input2 = getByLabelText('Hva tjente du for 2 år siden?');
	const input3 = getByLabelText('Hva tjente du for 3 år siden?');

	fireEvent.change(input1, { target: { value: 'f' } });
	fireEvent.change(input2, { target: { value: '' } });
	fireEvent.change(input3, { target: { value: '1' } });
	fireEvent.click(getByText('Sjekk'));

	getByText('Du må fylle inn feltet');
	getByText('Du kan bare taste inn tall (0-9)');
});
