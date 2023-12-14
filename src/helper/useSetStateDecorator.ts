import { Dispatch, SetStateAction, useCallback } from "react";

export function decoratorComputeNewState<S, K>(prevState: S, update: K | ((prev: S) => K)): S {
  return typeof update === "function" ? (update as any)(prevState) : update;
}

export function useSetStateDecorator<S>(
  result: [S, Dispatch<SetStateAction<S>>],
  decorator: (prevState: S, newState: S) => S | void,
): [S, Dispatch<SetStateAction<S>>] {
  const [state, setState] = result;

  return [
      state,
      useCallback(
          (update: S | ((prevState: S) => S)) => {
              setState(prevState => {
                  const newState = decoratorComputeNewState(prevState, update);
                  const decoratedResult = decorator(prevState, newState);
                  if (decoratedResult !== undefined) return decoratedResult;
                  else return newState;
              });
          },
          [decorator, setState],
      ),
  ];
}