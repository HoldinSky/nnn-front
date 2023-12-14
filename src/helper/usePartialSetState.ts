import { Dispatch, SetStateAction, useCallback } from "react";
import { decoratorComputeNewState } from "./useSetStateDecorator";

export type PartialSetStateAction<S> = Partial<S> | ((prevState: S) => Partial<S>);

export function usePartialSetState<S>(
    result: [S, Dispatch<SetStateAction<S>>],
): [S, Dispatch<PartialSetStateAction<S>>] {
    const [state, setState] = result;

    return [
        state,
        useCallback(
            (update: PartialSetStateAction<S>) => {
                setState(prevState => {
                    const newState = decoratorComputeNewState(prevState, update);
                    return {
                        ...prevState,
                        ...newState,
                    };
                });
            },
            [setState],
        ),
    ];
}