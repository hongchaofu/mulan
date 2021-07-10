import React from 'react';
import { Story, Meta } from '@storybook/react';

import CheckboxGroup, { CheckBoxGroupProps,Option } from './CheckboxGroup';

export default {
  title: '表单/CheckboxGroup',
  component: CheckboxGroup,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<CheckBoxGroupProps> = (args) => <CheckboxGroup {...args} />;

// const options: Option[] = [
//   {label: 'aaa', value: '111',},
//   {label: 'bbb', value: '222',},
//   {label: 'ccc', value: '333',},
//   {label: 'ddd', value: '444',},
//   {label: 'eee', value: '555',},
//   {label: 'fff', value: '666',},
//   {label: 'ggg', value: '777',},
//   {label: 'hhh', value: '888',},
//   {label: 'iii', value: '999',},
// ]
const options: Option[] = [];
for(let i=0;i<9;i++){
  let random = `${Math.random()}`;
  options.push({label:random,value:random})
}

export const basic = Template.bind({});
basic.args = {
  options: options,
  columns: 5,
  label:'MultiCheck'
};




