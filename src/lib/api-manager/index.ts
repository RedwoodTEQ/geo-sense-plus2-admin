import { loadCollectionSnapshot, ICollectionCallbacks as IFirebaseCollectionCallbacks } from '../firebase'

export enum DatabaseCategory {
  Firebase, RESTFull
}

type ProcessCallback = (id: any, data: any) => void;

export interface IRESTFullCallbacks {
  onLoad?: ProcessCallback;
  onUpdate?: ProcessCallback;
  onDelete?: ProcessCallback;
}

/**
 * Fetch options for RESTFull API.
 * @property category - Has to be `DatabaseCategory.RESTFull`
 */
export interface RESTFullOptions {
  category: DatabaseCategory.RESTFull
  api: string,
  callbacks: IRESTFullCallbacks
}

/**
 * Fetch options for firebase.
 * @property category - Has to be `DatabaseCategory.Firebase`
 */
export interface FirebaseOptions {
  category: DatabaseCategory.Firebase
  path: string,
  callbacks: IFirebaseCollectionCallbacks
}

export { IFirebaseCollectionCallbacks }

class APIManager {
  /**
   * Fetch data by given collection path or RESTFull api.
   * @typeParam DB - enum `DatabaseCategory`. It visually implies type of option.
   * @param options - It has to match the type of generic type `DB`.
   */
  fetch<DB> (
    options: DB extends DatabaseCategory.Firebase ? FirebaseOptions: RESTFullOptions
  ) {
    this._fetch(options)
  }

  private _fetch (options: FirebaseOptions | RESTFullOptions) {
    const category = options.category
    let opt

    switch (category) {
      case DatabaseCategory.Firebase:
        opt = options as FirebaseOptions
        loadCollectionSnapshot(opt.path, opt.callbacks)
        break
      case DatabaseCategory.RESTFull:
        opt = options as RESTFullOptions
        this._getAPI(opt.api, opt.callbacks)
        break
      default:
        break
    }
  }

  // eslint-disable-next-line
  private _getAPI(api: string, callbacks: IRESTFullCallbacks) {}
}

export default APIManager
