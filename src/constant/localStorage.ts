export enum OperationStatus {
  SUCCESS,
  FAILURE,
}

export interface OperationResult {
  status: OperationStatus;
  value?: any;
  error?: any;
}
