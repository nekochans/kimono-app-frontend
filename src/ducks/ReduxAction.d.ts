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
  error: {
    name?: string;
    message?: string;
    code?: string;
    stack?: string;
  };
  meta: {
    requestId: string;
    arg: ThunkArg;
    aborted: boolean;
  };
}
