import React from 'react';
import { Story, Meta } from '@storybook/react';

import Checkbox, { ICheckboxProps } from './Checkbox';

export default {
  title: '表单/Checkbox',
  component: Checkbox,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<ICheckboxProps> = (args) => <Checkbox {...args} />;

export const basic = Template.bind({});
basic.args = {
  value: 'hello world',
  label: '标签',
  onChange: (e) => {
    console.log(e.target.checked);
  }
};



