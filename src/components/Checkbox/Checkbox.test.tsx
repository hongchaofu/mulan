import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox,{ICheckboxProps} from './Checkbox';

const props:ICheckboxProps = {
    label:"123",
    value:"123",
    
}
const onChange = jest.fn()

describe('checkbox basic usage',()=>{
  it('basic',() => {
    const { getByTestId, getByText } = render(<Checkbox  {...props} onChange={onChange}/>);
    
    const label = getByText(props.label);
    expect(label).toBeInTheDocument();

    const checkbox = screen.getByTestId("testid_checkbox");
    expect(checkbox).toBeInTheDocument();
    
    // !!!fireEvent.change事件不起作用
    userEvent.click(checkbox);
    // fireEvent.click(checkbox, { target: { checked: true } })
    expect(checkbox).toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(1);

    userEvent.click(checkbox);
    // fireEvent.click(checkbox, { target: { checked: false } })
    expect(checkbox).not.toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(2);
  });
})
