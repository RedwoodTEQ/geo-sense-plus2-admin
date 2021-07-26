import { QTable } from 'quasar/dist/types'

export interface AreaData {
  edgeID: string;
  name: string;
  floor: string;
  assetsCount: number;
  lastUpdated: string;
}

/**
 * Original column type of quasar table
 */
type QColumnType = (typeof QTable.columns)[number]

/**
 * Augmented column type
 */
// export type Column = {
//   name: keyof AreaData,
//   align?: 'left' | 'right' | 'center'
//   field: keyof AreaData,
// } & Omit<QColumnType, 'name' | 'align'>

export type Column = QColumnType

export interface AreaStateInterface {
  columns: Column[];
  rows: AreaData[];
}

function state (): AreaStateInterface {
  return {
    // Todo: Customized columns
    columns: [// Header column
      // Todo: type gard
      {
        name: 'edgeID',
        required: true,
        label: 'Areas(ID)',
        align: 'left',
        field: 'edgeID',
        sortable: true,
        classes: 'bg-grey-2 ellipsis',
        style: 'max-width: 200px',
        headerClasses: 'bg-primary text-white'
      }, // Other columns
      {
        name: 'name',
        align: 'left',
        label: 'Name',
        field: 'name',
        sortable: true
      }, {
        name: 'floor',
        align: 'left',
        label: 'Floor',
        field: 'floor',
        sortable: true
      }, {
        name: 'assetsCount',
        align: 'center',
        label: 'Assets Count',
        field: 'assetsCount',
        sortable: true
      }, {
        name: 'lastUpdated',
        align: 'left',
        label: 'Last Update',
        field: 'lastUpdated',
        sortable: true
      }, {
        name: 'buttons',
        align: 'left',
        label: '',
        field: '',
        sortable: false
      }],

    rows: []
  }
}

/** Type of state of this module.
 * It is used in definitions of getters, mutations and actions.
 */
export type State = ReturnType<typeof state>

export default state
