interface PendingAction<ThunkArg> {
  type: string;
  meta: {
    requestId: string;
    arg: ThunkArg;
  };
}

interface FulfilledAction<ThunkArg, T> {
  type: string;
  payload: T;
  meta: {
    requestId: string;
    arg: ThunkArg;
  };
}

interface RejectedAction<ThunkArg> {
  type: string;
  /* eslint @typescript-eslint/no-explicit-any: 0 */
  error:
    | {
        name?: string;
        message?: string;
        code?: string;
        stack?: string;
      }
    | any;
  meta: {
    requestId: string;
    arg: ThunkArg;
    aborted: boolean;
  };
}
