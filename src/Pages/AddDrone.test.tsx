import AddDrone from "./AddDrone";
import {render, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";


test("Formularz wysyła się poprawnie przy poprawnym wypełnieniu", async () => {
    render(<AddDrone />);

    const modelInput = screen.getByPlaceholderText("model");
    userEvent.type(modelInput, "test-model-name");

    const snInput = screen.getByPlaceholderText("SN-XXXX-999");
    userEvent.type(snInput, "SN-ABCD-123");

    const maxSpeed= screen.getByLabelText("Drone max speed:");
    userEvent.clear(maxSpeed);
    userEvent.type(maxSpeed, "50");
    expect(maxSpeed).toHaveValue(50);

    const batteryType = screen.getByLabelText("Type of battery:");
    userEvent.selectOptions(batteryType, "Li-Ion")
    expect(batteryType).toHaveValue("Li-Ion");

    const sensor = screen.getByPlaceholderText("sensor name");
    userEvent.type(sensor, "Sensor 1");

    const returnHome = screen.getByLabelText("Return home")
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

    const modelError = screen.getByText(/String must contain at least 5 character\(s\)/i);
    const snError = screen.getByText(/Serial number has to follow pattern: SN-ABCD-123/i);
    const sensorError = screen.getByText(/String must contain at least 1 character\(s\)/i);

    expect(modelError).toBeInTheDocument();
    expect(snError).toBeInTheDocument();
    expect(sensorError).toBeInTheDocument();
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

    const emergencyParachute = screen.getByLabelText(/Emergency parachute/i);
    userEvent.click(emergencyParachute);

    const submit = screen.getByText("Submit");
    userEvent.click(submit);
    await waitFor(() => {
        expect(submit).not.toHaveTextContent("Loading...");
    })

    const dateError = screen.getByText(/Date of last test is required with parachute checked/i);
    expect(dateError).toBeInTheDocument();
})

test("Emergency parachute czyści się po odznaczeniu", async () => {
    render(<AddDrone />);

    const emergencyParachute = screen.getByLabelText(/Emergency parachute/i);
    userEvent.click(emergencyParachute);

    const testDate = screen.getByLabelText(/Date of last parachute test:/i)
    userEvent.type(testDate, "2026-03-19");
    expect(testDate).toHaveValue("2026-03-19");

    userEvent.click(emergencyParachute);
    userEvent.click(emergencyParachute);

    const newTestDate = screen.getByLabelText(/Date of last parachute test:/i)
    expect(newTestDate).toHaveValue("");
})
