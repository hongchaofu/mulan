import React, {
  ChangeEvent,
  MouseEventHandler,
  useState,
  useContext,
  useCallback,
} from "react";

import { context, selectAllFlag } from "./CheckboxGroup";

export interface ICheckboxProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  disabled?: boolean;
  label: string;
  value: string | number;
}

const Checkbox: React.FC<ICheckboxProps> = (props: ICheckboxProps) => {
  const { disabled = false, label, value, onChange, ...rest } = props;

  const { toggleOption } = useContext(context);

  const [checked, setChecked] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // judge select-all checkbox
    if (e.target.value === selectAllFlag) {
      onChange && onChange(e);
      return;
    }

    if ("checked" in props) {
      toggleOption(e.target.value);
    } else {
      setChecked((checked) => !checked);
    }
    onChange && onChange(e);
  };

  return (
    <label>
      <input
        type="checkbox"
        data-testid="testid_checkbox"
        checked={"checked" in props ? props.checked : checked}
        value={value}
        disabled={disabled}
        onChange={handleChange}
        {...rest}
      />
      {label}
    </label>
  );
};
// 加上memo，到处时出错！！！
// export default React.memo(Checkbox);
export default Checkbox;
