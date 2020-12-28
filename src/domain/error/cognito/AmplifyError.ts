export type AmplifyErrorCode =
  | 'UsernameExistsException'
  | 'InvalidPasswordException'
  | 'InvalidParameterException'
  | 'CodeMismatchException'
  | 'LimitExceededException'
  | 'ExpiredCodeException'
  | 'CodeDeliveryFailureException'
  | 'UserNotConfirmedException'
  | 'PasswordResetRequiredException'
  | 'NotAuthorizedException'
  | 'UserNotFoundException';

export type AmplifyError = {
  code: AmplifyErrorCode;
  message: string;
  name: AmplifyErrorCode;
};
