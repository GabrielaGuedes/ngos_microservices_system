import React, { useEffect, useState } from "react";
import { CheckBoxGroup } from "grommet";
import invert from "lodash.invert";
import mapKeys from "lodash.mapkeys";

interface ICheckboxGroupField {
  value: { [index: string]: any };
  onChange: (value: {}) => void;
  mapper: { [index: string]: string };
}

const CheckBoxGroupField: React.FC<ICheckboxGroupField> = ({
  value,
  onChange,
  mapper,
}) => {
  const [options, setOptions] = useState<string[]>();
  const [activeOptions, setActiveOptions] = useState<string[]>();

  useEffect(() => {
    setActiveOptions(getActiveOptions());
    setOptions(getOptions());
  }, []);

  const getOptions = () =>
    Object.keys(value)
      .filter((valueItem) => Object.keys(mapper).includes(valueItem))
      .map((valueItem) => mapper[valueItem]);

  const getActiveOptions = () =>
    Object.entries(value)
      .filter(
        (entry) => entry[1] === true && Object.keys(mapper).includes(entry[0])
      )
      .map((entry) => mapper[entry[0]]);

  const optionsArrayToObject = (optionsArray: string) => {
    const object: { [index: string]: boolean } = {};

    options?.forEach((option) => {
      object[option] = optionsArray.includes(option);
    });

    return object;
  };

  const handleChange = (value: string[] | any) => {
    setActiveOptions(value);

    const objectFromArray = optionsArrayToObject(value as any);
    const mappedObject = mapKeys(
      objectFromArray,
      (_value: any, key: any) => invert(mapper)[key]
    );

    onChange(mappedObject);
  };

  return (
    <CheckBoxGroup
      options={options || []}
      value={activeOptions}
      onChange={(event) => handleChange(event?.value)}
    />
  );
};

export default CheckBoxGroupField;
