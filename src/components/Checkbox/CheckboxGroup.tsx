import React, {
  createContext,
  useState,
  ChangeEvent,
  useCallback,
} from "react";

import classNames from "classnames";

import useGroupByColumnCount from "../hooks/useGroupByColumnCount";

import Checkbox from "./Checkbox";

// import "./CheckboxGroup.scss";

export interface Option {
  label: string;
  value: string;
}

export interface CheckBoxGroupProps {
  label?: string;
  options: Option[];
  columns: number;
  values?: string[];
  onChange?: (options: Array<string>) => void;
}

export interface contextProps {
  toggleOption: (value: string) => void;
}

export const context = createContext<contextProps>({ toggleOption: () => {} });

export const selectAllFlag = "selectAll";

const CheckboxGroup: React.FC<CheckBoxGroupProps> = (
  props: CheckBoxGroupProps
) => {
  const { label, options, columns, values = [], onChange } = props;

  const [val, setVal] = useState(values);

  const selectAllOption =
    options.length > 0 ? { label: selectAllFlag, value: selectAllFlag } : null;

  const [newOptions, optionValues] = useGroupByColumnCount(
    options,
    selectAllOption,
    columns
  );

  const toggleOption = (value: string) => {
    const index = val.indexOf(value);
    let tempVal = [...val];
    if (index > -1) {
      tempVal.splice(index, 1);
    } else {
      tempVal = [...tempVal, value];
    }
    setVal(tempVal);
    onChange && onChange(tempVal);
  };
  // select-all checkbox logic
  const onSelectallChange = (event: ChangeEvent<HTMLInputElement>) => {
    let tempVal: Array<string | never> = [];
    if (event.target.checked) {
      tempVal = [...optionValues];
    }
    setVal(tempVal);
    onChange && onChange(tempVal);
  };

  const renderCheckboxs = () => {
    return newOptions.map((options, i) => {
      const classString = classNames(
        "checkbox-group-column",
        `checkbox-group-column-${i + 1}`
      );
      return (
        <div
          key={i}
          className={classString}
          data-testid="testid_checkbox-group-column"
        >
          {options.map((item: Option, index: number) => {
            if (item.label === selectAllFlag && item.value === selectAllFlag) {
              return (
                <Checkbox
                  onChange={onSelectallChange}
                  checked={val.length === optionValues.length}
                  key={`${item.label}-${item.value}`}
                  {...item}
                />
              );
            }
            return (
              <Checkbox
                checked={val.includes(item.value)}
                key={`${item.label}-${item.value}`}
                {...item}
              />
            );
          })}
        </div>
      );
    });
  };
  return (
    <context.Provider value={{ toggleOption }}>
      <header className="checkbox-group-header">{label}</header>
      <div className="checkbox-group-wrapper">{renderCheckboxs()}</div>
    </context.Provider>
  );
};

export default CheckboxGroup;
