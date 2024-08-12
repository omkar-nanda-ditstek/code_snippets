// import { IConnectionManager } from '@demo/service/.dist/interfaces';
// import * as pb from '@demo/demo-common/dist/demo-proto';
// import PbServiceProxy from '@demo/demo-common/dist/PbServiceProxy';
import { IConnectionManager } from '@demo/service/.dist/interfaces';
export interface IServiceProxy {}

export function proxyProvider(conn: IConnectionManager): IServiceProxy {
  return {};
}
