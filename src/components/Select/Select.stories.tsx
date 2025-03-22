import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Select from './Select';
import { SelectProps } from './types';
import MenuItem from './MenuItem/MenuItem';

export default {
  title: 'Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    onChange: { action: 'changed' },
    value: { control: 'number' },
  },
} as Meta;

const Template: StoryFn<SelectProps> = (args) => {
  const [selectedValue, setSelectedValue] = useState(args.value || '');

  const handleChange = (value: string | number) => {
    setSelectedValue(value);
    args.onChange?.(value);
  };

  return (
    <Select {...args} value={selectedValue} onChange={handleChange}>
      <MenuItem value={10}>10</MenuItem>
      <MenuItem value={20}>20</MenuItem>
      <MenuItem value={30}>30</MenuItem>
    </Select>
  );
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: 'Age',
  value: '',
  children: (
    <>
      <MenuItem value={10}>10</MenuItem>
      <MenuItem value={20}>20</MenuItem>
      <MenuItem value={30}>30</MenuItem>
    </>
  ),
};
