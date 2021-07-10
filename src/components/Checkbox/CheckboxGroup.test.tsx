import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CheckboxGroup, {Option, selectAllFlag} from './CheckboxGroup';
import { forceReRender } from '@storybook/react';
import userEvent from '@testing-library/user-event';

const options: Option[] = [
  {label: 'aaa', value: 'aaa',},
  {label: 'bbb', value: 'bbb',},
  {label: 'ccc', value: 'ccc',},
  {label: 'ddd', value: 'ddd',},
]
const defalutProps = {
  label:"my checkbox group",
  columns: 3,
  options,
  onChange:jest.fn()
}

describe('basic',()=>{
  test('basic', () => {
    render(<CheckboxGroup {...defalutProps} />);

    const label = screen.getByText(defalutProps.label);
    expect(label).toBeInTheDocument();

    const checkboxs = screen.getAllByTestId("testid_checkbox");
    expect(checkboxs.length).toBe(options.length+1);

    userEvent.dblClick(checkboxs[1]);
    expect(checkboxs[1]).not.toBeChecked();
  });
  test('options = []',()=>{
    const props = {...defalutProps}
    props.options = [];
    const {container} = render(<CheckboxGroup {...props}  />);
    const wrapper = container.getElementsByClassName("checkbox-group-wrapper")[0]
    expect(wrapper.children.length).toBe(0);
  })
})
describe('select-all change with other checkboxs',()=>{
  beforeEach(()=>{
    render(<CheckboxGroup {...defalutProps} />);
  })
  test('select-all rendered',()=>{
    const select_all = screen.getByText(selectAllFlag);
    expect(select_all).toBeInTheDocument();
  })
  test('select-all checked, other checkboxs will checked',()=>{
    const checkboxs = screen.getAllByTestId("testid_checkbox");
    userEvent.click(checkboxs[0]);
    expect(defalutProps.onChange).toHaveBeenCalled();
    checkboxs.forEach((checkbox,index)=>{
      expect(checkbox).toBeChecked();
    });
  })
  test('when all other checkboxs checked, select-all will be checked',()=>{
    const checkboxs = screen.getAllByTestId("testid_checkbox");
    checkboxs.forEach((checkbox,index)=>{
      if(index!==0){
        userEvent.click(checkbox);
        expect(checkbox).toBeChecked();
      }
    });
    expect(checkboxs[0]).toBeChecked();
  })
  test('when all checkboxs checked, uncheck one, select-all will be uncheck',()=>{
    const checkboxs = screen.getAllByTestId("testid_checkbox");
    userEvent.click(checkboxs[0]);
    userEvent.click(checkboxs[1]);
    checkboxs.forEach((checkbox,index)=>{
      if(index===0||index===1){
        expect(checkbox).not.toBeChecked();
      }else{
        expect(checkbox).toBeChecked();
      }
    });
  })
})
describe('column counts',()=>{
  test('aliquot === 0',()=>{
    const props = {...defalutProps}
    props.columns = 7;
    render(<CheckboxGroup {...props}  />);
    const div = screen.getAllByTestId("testid_checkbox-group-column");
    expect(div.length).toBe(props.options.length+1);
  })
  test('aliquot ！== 0 && remainder === 0',()=>{
    const props = {...defalutProps};
    props.options = [...props.options,...props.options];
    props.columns = 3;
    render(<CheckboxGroup {...props}  />);
    const div = screen.getAllByTestId("testid_checkbox-group-column");
    expect(div.length).toBe(props.columns);
  })
  test('aliquot ！== 0 && remainder !== 0',()=>{
    const props = {...defalutProps}
    props.columns = 3;
    render(<CheckboxGroup {...props}  />);
    const div = screen.getAllByTestId("testid_checkbox-group-column");
    expect(div.length).toBe(props.columns);
  })
})