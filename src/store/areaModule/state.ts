export interface AreaData {
  id: number;
  name: string;
  edgeID: string;
  floorID: string;
  assetsCount: number;
  lastUpdated: string;
}

export interface AreaStateInterface {
  columns: any;
  rows: AreaData[];
}

function state (): AreaStateInterface {
  return {
    columns: [
      {
        name: 'id',
        required: true,
        label: 'Areas(ID)',
        align: 'left',
        field: (row: AreaData) => row.id,
        format: (val: string) => `${val}`,
        sortable: true,
        classes: 'bg-grey-2 ellipsis',
        style: 'max-width: 100px',
        headerClasses: 'bg-primary text-white'
      },
      { name: 'name', align: 'center', label: 'Name', field: 'name', sortable: true },
      { name: 'edgeID', align: 'center', label: 'Edge ID', field: 'edgeID', sortable: true },
      { name: 'floorID', label: 'Floor ID', field: 'floorID', sortable: true },
      { name: 'assetsCount', label: 'Assets Count', field: 'assetsCount', sortable: true },
      { name: 'lastUpdated', label: 'Last Update', field: 'lastUpdated', sortable: true }
    ],

    rows: [
      {
        id: 0,
        name: 'area 12',
        edgeID: '0092769BB9EA2F03',
        floorID: '3cRUIEprlnW8bciES7vO',
        assetsCount: 7,
        lastUpdated: new Date('Jun 3 2021').toDateString()
      },
      {
        id: 1,
        name: 'area 31',
        edgeID: '0092969BB9EA2F03',
        floorID: '3cR0IEprlnW8bciES7vO',
        assetsCount: 3,
        lastUpdated: new Date('Jun 13 2021').toDateString()
      },
      {
        id: 2,
        name: 'area 34',
        edgeID: '0092769BB9EA2F03',
        floorID: '3cRoIEprlnW8bciES7vO',
        assetsCount: 3,
        lastUpdated: new Date().toDateString()
      },
      {
        id: 3,
        name: 'area 64',
        edgeID: '0090789BB9EA2F03',
        floorID: '3cRooEirlnW8bciES7vO',
        assetsCount: 2,
        lastUpdated: new Date('Jun 23 2021').toDateString()
      }
    ]
  }
}

/** Type of state of this module.
 * It is used in definitions of getters, mutations and actions.
 */
export type State = ReturnType<typeof state>

export default state
