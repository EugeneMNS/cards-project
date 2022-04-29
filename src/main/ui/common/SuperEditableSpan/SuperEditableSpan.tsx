import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  HTMLAttributes,
  useState,
} from "react";
import classes from "./SuperEditableSpan.module.css";
import { SuperInputText } from "../SuperInputText/SuperInputText";

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
type DefaultSpanPropsType = DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;

type SuperEditableSpanType = DefaultInputPropsType & {
  onChangeText?: (value: string) => void;
  onEnter?: () => void;
  error?: string;
  spanClassName?: string; // input props

  spanProps?: DefaultSpanPropsType; // span props
};

export const SuperEditableSpan: React.FC<SuperEditableSpanType> = ({
  autoFocus, // игнорировать изменение этого пропса
  onBlur,
  onEnter,
  spanProps,

  ...restProps // все остальные пропсы попадут в объект restProps
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const { children, onDoubleClick, className, ...restSpanProps } =
    spanProps || {};

  const onEnterCallback = () => {
    setEditMode(false);

    onEnter && onEnter();
  };
  const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
    setEditMode(false);

    onBlur && onBlur(e);
  };
  const onDoubleClickCallBack = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    setEditMode(true);

    onDoubleClick && onDoubleClick(e);
  };

  const spanClassName = `${classes.editableSpan} ${className}`;

  return (
    <>
      {editMode ? (
        <SuperInputText
          autoFocus
          onBlur={onBlurCallback}
          onEnter={onEnterCallback}
          {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
        />
      ) : (
        <span
          onDoubleClick={onDoubleClickCallBack}
          className={spanClassName}
          {...restSpanProps}
        >
          {/*если нет захардкодженного текста для спана, то значение инпута*/}
          {children || restProps.value}
        </span>
      )}
    </>
  );
};
