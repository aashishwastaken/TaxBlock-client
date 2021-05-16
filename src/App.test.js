import React from "react";
import { screen, render, fireEvent, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoanForm from "./components/LoanForm";

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYTEyY2NjZmVkMzJkMzVlMGNkN2M2NyIsIm5hbWUiOiJFbGl6YWJldGggU3dhbiIsImVtYWlsIjoicUBrIiwiaWF0IjoxNjIxMTkyMDk3LCJleHAiOjE2MjExOTU2OTd9.GL2EPAKiDqeVmT-ZiPoMK1_ovI1dc5eX_teSCr4pKlo';

describe("LoanForm ", () => {
  it("should render the basic fields", () => {
    render(<LoanForm token={token} />);
    expect(screen.getByText(/New Loan \(Our Rate:/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /amount/i })).toBeInTheDocument();
    expect(screen.getAllByLabelText(/date/i)).toHaveLength(2);
    expect(screen.getByRole("button", { name: /Add Loan/i })).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(2);

  });

  it("should submit incorrect form data", async () => {

    render(<LoanForm token={token} />);
    fireEvent.input(screen.getByRole("textbox", { name: /amount/i }), {
      target: { value: "" }
    });


    fireEvent.click(screen.getByRole("button", { name: /Add Loan/i }));


    const items = await screen.findByText(/Error/i);
    expect(items).toBeInTheDocument();




  });

  it("should submit correct form data", async () => {
    global.alert = jest.fn();

    render(<LoanForm token={token} />);
    fireEvent.input(screen.getByRole("textbox", { name: /amount/i }), {
      target: { value: "1000" }
    });


    fireEvent.click(screen.getByRole("button", { name: /Add Loan/i }));

    setTimeout(async()=>{
      const item = await screen.findByRole("textbox", { name: /amount/i });
      expect(item.value).toBe('');
    },200);
    




  });
});