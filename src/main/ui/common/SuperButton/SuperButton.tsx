import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import classes from "./SuperButton.module.css";

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type SuperButtonPropsType = DefaultButtonPropsType & {
  red?: boolean;
};

export const SuperButton: React.FC<SuperButtonPropsType> = ({
  red,
  className,
  ...restProps // все остальные пропсы попадут в объект restProps, там же будет children
}) => {
  const finalClassName = `${red ? classes.red : classes.default} ${className}`;

  return (
    <button
      className={finalClassName}
      {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
    />
  );
};
