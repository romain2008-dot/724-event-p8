import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      setTimeout(() => {
        screen.findByText("En cours");
        screen.findByText("Envoyer");
    }, 1500) 
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    render(<Home />);
    const eventList = screen.getByTestId("events");
    expect(eventList).toBeDefined();
  })
  it("a list a people is displayed", () => {
    render(<Home />);
    const peopleList = screen.getByTestId("people");
    expect(peopleList).toBeDefined();
  })
  it("a footer is displayed", () => {
    render(<Home />);
    const footer = screen.getByTestId("footer");
    expect(footer).toBeDefined();
  })
  it("an event card, with the last event, is displayed", () => {
    render(<Home />);
    const lastEvent = screen.findByTestId("card-testid");
    expect(lastEvent).toBeDefined();
  })
});
