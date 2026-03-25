import AddDrone from "./AddDrone";
import {render, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { errorMessages } from "../Functionality/Drone";
import { labels } from "./AddDrone";


test("Formularz wysyła się poprawnie przy poprawnym wypełnieniu", async () => {
    render(<AddDrone />);

    const modelInput = screen.getByLabelText(labels.modelName)
    userEvent.type(modelInput, "test-model-name");

    const snInput = screen.getByLabelText(labels.serialNumber)
    userEvent.type(snInput, "SN-ABCD-123");

    const maxSpeed= screen.getByLabelText(labels.maxSpeed);
    userEvent.clear(maxSpeed);
    userEvent.type(maxSpeed, "50");
    expect(maxSpeed).toHaveValue(50);

    const batteryType = screen.getByLabelText(labels.batteryType);
    userEvent.selectOptions(batteryType, "Li-Ion")
    expect(batteryType).toHaveValue("Li-Ion");

    const sensor = screen.getByPlaceholderText("sensor name");
    userEvent.type(sensor, "Sensor 1");

    const returnHome = screen.getByLabelText(labels.returnHome)
    userEvent.click(returnHome);

    const submit = screen.getByText("Submit");
    userEvent.click(submit);
    expect(submit).toHaveTextContent("Loading...");
})

test("Pusty formularz się nie wysyła", async () => {
    render(<AddDrone />);

    const submit = screen.getByText("Submit");
    userEvent.click(submit);

    await waitFor(() => {
        expect(submit).not.toHaveTextContent(/Loading.../i);
    })

    const expecterErrors = [
        errorMessages.modelName,
        errorMessages.serialNumber,
        errorMessages.sensorName
    ];

    expecterErrors.forEach(error => {
        expect(screen.getByText(error)).toBeInTheDocument();
    })

})

test("Sensory poprawnie się dodają i usuwają", async () => {
    render(<AddDrone />);

    const sensor = screen.getByPlaceholderText(/sensor name/i);
    userEvent.type(sensor, "test sensor name 1");
    const addBtn = screen.getByText(/add sensor/i);
    userEvent.click(addBtn);

    const sensor2 = screen.getAllByPlaceholderText(/sensor name/i);
    expect(sensor2[1]).toHaveValue("");

    userEvent.type(sensor2[1]!, "test sensor name 2");
    userEvent.click(addBtn);

    const sensor3 = screen.getAllByPlaceholderText(/sensor name/i);
    expect(sensor3[2]).toBeInTheDocument();
    userEvent.type(sensor3[2]!, "test sensor name 3");

    expect(sensor3.length).toBe(3);

    const deletes = screen.getAllByText(/delete/i);
    userEvent.click(deletes[2]!);
    userEvent.click(deletes[0]!);

    const sensors= screen.getAllByPlaceholderText(/sensor name/i);
    expect(sensors).toHaveLength(1);
    expect(sensors[0]).toHaveValue("test sensor name 2");
})

test("Emergency parachute jeśli zaznaczony nie wysyła się bez wartości daty", async () => {
    render(<AddDrone />);

    const emergencyParachute = screen.getByLabelText(labels.emergencyParachute);
    userEvent.click(emergencyParachute);

    const submit = screen.getByText("Submit");
    userEvent.click(submit);
    await waitFor(() => {
        expect(submit).not.toHaveTextContent("Loading...");
    })

    expect(screen.getByText(errorMessages.parachuteTestDate)).toBeInTheDocument();
})

test("Emergency parachute czyści się po odznaczeniu", async () => {
    render(<AddDrone />);

    const emergencyParachute = screen.getByLabelText(labels.emergencyParachute);
    userEvent.click(emergencyParachute);

    const testDate = screen.getByLabelText(labels.parachuteTestDate)
    userEvent.type(testDate, "2026-03-19");
    expect(testDate).toHaveValue("2026-03-19");

    userEvent.click(emergencyParachute);
    userEvent.click(emergencyParachute);

    const newTestDate = screen.getByLabelText(labels.parachuteTestDate)
    expect(newTestDate).toHaveValue("");
})

test("Walidacja modelName: wyświetla błąd, gdy nazwa jest krótsza niż 5 znaków", async () => {
    render(<AddDrone />);

    const modelInput = screen.getByLabelText(labels.modelName);

    // Wpisujemy za krótki tekst
    userEvent.type(modelInput, "abc");

    // Oczekujemy, że pojawi się komunikat o błędzie (findByText czeka, aż element pojawi się w DOM)
    expect(await screen.findByText(errorMessages.modelName)).toBeInTheDocument();
});

test("Walidacja serialNumber: wyświetla błąd przy nieprawidłowym formacie", async () => {
    render(<AddDrone />);

    const snInput = screen.getByLabelText(labels.serialNumber);

    // Zły format (brak SN, za dużo cyfr itp.)
    userEvent.type(snInput, "ZŁY-NUMER-1234");
    expect(await screen.findByText(errorMessages.serialNumber)).toBeInTheDocument();

    // Czyszczenie i próba wpisania innego błędnego formatu (za mało cyfr na końcu)
    userEvent.clear(snInput);
    userEvent.type(snInput, "SN-ABCD-12");
    expect(await screen.findByText(errorMessages.serialNumber)).toBeInTheDocument();

    // Czyszczenie i próba poprawnego formatu - sprawdzamy czy błąd znika
    userEvent.clear(snInput);
    userEvent.type(snInput, "SN-WXYZ-987");

    // Używamy waitFor, żeby upewnić się, że komunikat o błędzie zniknął z DOM
    await waitFor(() => {
        expect(screen.queryByText(errorMessages.serialNumber)).not.toBeInTheDocument();
    });
});

test("Walidacja maxSpeed: wyświetla błąd, gdy prędkość jest poza zakresem 10-180", async () => {
    render(<AddDrone />);

    const maxSpeedInput = screen.getByLabelText(labels.maxSpeed);

    // Wartość poniżej minimum
    userEvent.clear(maxSpeedInput);
    userEvent.type(maxSpeedInput, "5");
    await waitFor(() => {
        expect(screen.getByText(errorMessages.maxSpeed)).toBeInTheDocument();
    })

    // Wartość powyżej maksimum
    userEvent.clear(maxSpeedInput);
    userEvent.type(maxSpeedInput, "200");
    await waitFor(() => {
        expect(screen.getByText(errorMessages.maxSpeed)).toBeInTheDocument();
    })

    // Prawidłowa wartość
    userEvent.clear(maxSpeedInput);
    userEvent.type(maxSpeedInput, "120");
    await waitFor(() => {
        expect(screen.queryByText(errorMessages.maxSpeed)).not.toBeInTheDocument();
    });
});

test("Walidacja sensors: wyświetla błąd, gdy wpisana nazwa sensora zostanie usunięta (pusty string)", async () => {
    render(<AddDrone />);

    const sensorInput = screen.getByPlaceholderText(/sensor name/i);

    // Wpisujemy coś, a potem to kasujemy, żeby wyzwolić walidację 'onChange'
    userEvent.type(sensorInput, "Lidar");
    userEvent.clear(sensorInput);

    expect(await screen.findByText(errorMessages.sensorName)).toBeInTheDocument();
});