import {IApiService} from "./domain/IApiService";
import {IApiInstance} from "../domain/IApiInstance";
import {IRoute} from "../domain/IRoute";

class ApiServicesFake implements IApiService {

  deleteApi(apiId: string): any {
  }

  deleteRoute(apiId: string, route: IRoute): any {
  }

  getApi(apiId: string): any {

  }

  getApis(): any {
    const apis: IApiInstance[] = [
      {
        _id: '12356123',
        name: "test",
        port: 5000,
        routes: [],
        settings: {
          enabled: true,
          createdOn: '2019'
        }
      }
    ];
    return new Promise((resolve, reject) => {
      resolve(apis);
    });
  }

  postApis(api: IApiInstance): any {
    return true;
  }

  postRoute(apiId: string, route: IRoute): any {
  }

  putApi(api: IApiInstance): any {
  }

  startApi(apiId: string): any {
  }

  stopApi(apiId: string): any {
  }

  purRoute(apiId: string, route: IRoute): any {
  }
}

export default ApiServicesFake;