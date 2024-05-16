type ODataEntity<T> = {
  '@odata.etag': string;
} & T;

export interface ODataResponse<T> {
  '@odata.context': string;
  value: ODataEntity<T>[];
}