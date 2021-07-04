/*eslint-disable */
import firebase from 'firebase'

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

function edgeCollectionRef (): firebase.firestore.CollectionReference {
  return firestore.collection('edges')
}

enum SnapshotChangeType {
  Added = 'added', Modified = 'modified', Removed = 'removed'
}

export const loadCollectionSnapshot = () => {

  edgeCollectionRef()
    .onSnapshot(snapshot => {
      console.log('edges.vue/edgelist ~ onSnapshot')
      snapshot.docChanges().forEach(change => {
        const type = change.type;

        const data: firebase.firestore.DocumentData = change.doc.data()
        const deviceId = change.doc.id
        const floorplanId = data.EdgeMarkerRef
          ? data.EdgeMarkerRef!.parent!.parent!.id
          : ''
        const deviceName: string = data.Name ? data.Name : '(not named)'
        const assetRefNumber: number = data.AssetRefs ? data.AssetRefs.length : 0
        const lastUpdateTime: string = data.LastUpdate

        console.log('Change type: ', type, data, deviceId, floorplanId, deviceName, assetRefNumber, lastUpdateTime)
      })
    })
}
