import { Dispatch, SetStateAction, useCallback } from "react";
import { decoratorComputeNewState } from "./useSetStateDecorator";
import isEqual from "react-fast-compare";

export function useDeepEqualsSetState<S>(
  result: [S, Dispatch<SetStateAction<S>>],
  comparator: (a: S, b: S) => boolean = isEqual,
): [S, Dispatch<SetStateAction<S>>] {
  const [state, setState] = result;

  return [
      state,
      useCallback(
          (update: S | ((prevState: S) => S)) =>
              setState(prev => {
                  const newState = decoratorComputeNewState(prev, update);
                  return comparator(prev, newState) ? prev : newState;
              }),
          [comparator, setState],
      ),
  ];
}