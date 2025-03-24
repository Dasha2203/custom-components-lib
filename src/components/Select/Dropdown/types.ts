export type DropdownProps = {
  isOpen: boolean;
  children: React.ReactNode;
  handleSelect: (value: string | number) => void;
  selected?: string | number;
  focused: number;
};
