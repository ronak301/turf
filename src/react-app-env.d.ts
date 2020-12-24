/// <reference types="react-scripts" />

// Redux
interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
}

// Overwritable type
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type Prefer<P, T> = P & Omit<T, keyof P>;
type ElementPropsWithoutRef<T extends ReactType> = Pick<
  ComponentPropsWithoutRef<T>,
  keyof ComponentPropsWithoutRef<T>
>;
type OverwritableType<OwnProps, Type extends ReactType> = Prefer<
  OwnProps,
  ElementPropsWithoutRef<Type>
>;
