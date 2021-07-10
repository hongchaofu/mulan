import React, { useMemo } from "react";

import {Option} from "../Checkbox/CheckboxGroup";

const useGroupByColumnCount = (options: Option[],selectAllOption:Option|null, columns: number) => {
  const newOptions: Array<any> = [];
  const optionValues:Array<string> = [];
  useMemo(() => {
    // console.log('useGroupByColumnCount')
    let _columns = columns;
    const _options = selectAllOption?[selectAllOption,...options]:[...options];
    const length = _options.length;
    const aliquot = Math.floor(length / columns);
    let remainder = length % columns;
    let i = 0;
    if (aliquot === 0) {
      _columns = remainder;
      remainder = 0;
    }
    options.forEach((item,index)=>{
      optionValues.push(item.value);
    })
    while (i < _columns) {
      if (aliquot === 0) {
        newOptions.push(_options.splice(0, 1));
      } else if (aliquot !== 0 && remainder !== 0) {
        newOptions.push(_options.splice(0, aliquot + 1));
        remainder--;
      } else if (aliquot !== 0 && remainder === 0) {
        newOptions.push(_options.splice(0, aliquot));
      }
      i++;
    }
  }, [options, columns, newOptions]);
  return [newOptions,optionValues];
};

export default useGroupByColumnCount;
