/*eslint-disable */
import firebase from 'firebase/app'
import 'firebase/firestore'

import CollectionReference = firebase.firestore.CollectionReference
import DocumentChangeType = firebase.firestore.DocumentChangeType

const config = {
  apiKey: 'AIzaSyAIE_G616Gz5SB3hq0SC9kSlQohHl_8E5U',
  authDomain: 'outdoor-tracking.firebaseapp.com',
  databaseURL: 'https://outdoor-tracking.firebaseio.com',
  projectId: 'outdoor-tracking',
  storageBucket: 'outdoor-tracking.appspot.com',
  messagingSenderId: '479687503633'
}

export const firebaseApp = firebase.initializeApp(config)
export const firestore = firebaseApp.firestore()

// Todo: interface of data, type of id
type ProcessCallback = (id: string, data: any) => void;

// Todo: user customized call back?
export interface ICollectionCallbacks {
  onAdded?: ProcessCallback;
  onModified?: ProcessCallback;
  onRemoved?: ProcessCallback;
  onComplete?: () => void;
}

function getCollectionRef (path: string): CollectionReference {
  return firestore.collection(path)
}

/**
 * Load collection snapshot by path and assign document change events.
 * @param path
 * @param callbacks
 */
export const loadCollectionSnapshot = (path: string, callbacks: ICollectionCallbacks) => {
  getCollectionRef(path)
    .onSnapshot(snapshot => {
      // console.log('edges.vue/edgelist ~ onSnapshot')

      snapshot.docChanges().forEach(change => {

        const type = change.type as DocumentChangeType
        const deviceId = change.doc.id
        const data = change.doc.data()

        // All cases have to be exist in union type {@link DocumentChangeType},
        // otherwise getting transpile error.
        switch (type) {
          case 'added':
            !!callbacks?.onAdded && callbacks.onAdded(deviceId, data)
            break;
          case 'removed':
            !!callbacks?.onRemoved && callbacks.onRemoved(deviceId, data)
            break;
          case 'modified':
            !!callbacks?.onModified && callbacks.onModified(deviceId, data)
            break;
          default:
            break;
        }

        const floorplanId = data.EdgeMarkerRef
          ? data.EdgeMarkerRef!.parent!.parent!.id
          : ''
        const deviceName: string = data.Name ? data.Name : '(not named)'
        const assetRefNumber: number = data.AssetRefs ? data.AssetRefs.length : 0
        const lastUpdateTime: string = data.LastUpdate

        // console.log('Change type: ', type, data, deviceId, floorplanId, deviceName, assetRefNumber, lastUpdateTime)
      })
    })
}
