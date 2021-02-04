import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { Button, Card, Container, Form, Row } from 'react-bootstrap';

function App() {
	const g = 101351;

	const [input, setInput] = useState({
		input1: '',
		input2: '',
		input3: '',
	});

	const [result, setResult] = useState('');

	const [textHelp, setTextHelp] = useState({
		textHelp1: '',
		textHelp2: '',
		textHelp3: '',
	});

	const checkValidSalary = () => {
		const lastYear = parseInt(input.input1);
		const secondYear = parseInt(input.input2);
		const thirdYear = parseInt(input.input3);

		const totalInntekt = lastYear + secondYear + thirdYear;

		if (lastYear <= 0) {
			return setResult(<h5>Du er ikke innvilget for dagpenger</h5>);
		} else if (totalInntekt <= 3 * g || thirdYear <= 1.5 * g) {
			return setResult(<h5>Du er ikke innvilget for dagpenger</h5>);
		} else if (
			lastYear <= 6 * g ||
			(thirdYear + lastYear + secondYear) / 3 <= 6 * g
		) {
			const dagsats = lastYear / 260;

			return setResult(
				<div>
					<h5>Du har rett til dagpenger</h5>
					<h5>din dagsats: {Math.floor(dagsats)}</h5>
				</div>
			);
		} else {
			return setResult(<h5>Du er ikke innvilget for dagpenger</h5>);
		}
	};

	const checkInput = () => {
		var numbers = /^[0-9]+$/;

		setResult('');

		const isInputValid = (val) => {
			if (val === '') return 'Du må fylle inn feltet';
			else if (!val.match(numbers)) return 'Du kan bare taste inn tall (0-9)';
			else return '';
		};

		let newState = {};

		for (var [key, val] of Object.entries(input)) {
			switch (key) {
				case 'input1':
					newState = { ...newState, textHelp1: isInputValid(val) };
					break;
				case 'input2':
					newState = { ...newState, textHelp2: isInputValid(val) };
					break;
				case 'input3':
					newState = { ...newState, textHelp3: isInputValid(val) };
					break;
				default:
					return;
			}
		}

		setTextHelp(newState);

		if (
			newState.textHelp1 === '' &&
			newState.textHelp2 === '' &&
			newState.textHelp3 === ''
		) {
			console.log('valid');
			checkValidSalary();
		}
	};

	return (
		<Container className="h-100">
			<Row className="h-100">
				<Card className="w-75 mx-auto my-auto">
					<Card.Body className="pl-5">
						<Card.Title>Sjekke grunnlag for dagpenger</Card.Title>
						<Form>
							<Form.Group controlId="formSalary1">
								<Form.Label>Hva tjente du i fjor?</Form.Label>
								<Form.Control
									type="text"
									onChange={(e) =>
										setInput({ ...input, input1: e.target.value })
									}
								/>
								<Form.Text className="text-danger">
									{textHelp.textHelp1}
								</Form.Text>
							</Form.Group>
							<Form.Group controlId="formSalary2">
								<Form.Label>Hva tjente du for 2 år siden?</Form.Label>
								<Form.Control
									onChange={(e) =>
										setInput({ ...input, input2: e.target.value })
									}
								/>
								<Form.Text className="text-danger">
									{textHelp.textHelp2}
								</Form.Text>
							</Form.Group>
							<Form.Group controlId="formSalary3">
								<Form.Label>Hva tjente du for 3 år siden?</Form.Label>
								<Form.Control
									onChange={(e) =>
										setInput({ ...input, input3: e.target.value })
									}
								/>
								<Form.Text className="text-danger">
									{textHelp.textHelp3}
								</Form.Text>
							</Form.Group>
							<Button onClick={checkInput}>Sjekk</Button>
						</Form>
						<Row className="justify-content-center text-center">{result}</Row>
					</Card.Body>
				</Card>
			</Row>
		</Container>
	);
}

export default App;
