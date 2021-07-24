import { QTable } from 'quasar/dist/types'

export interface AreaData {
  edgeID: string;
  name: string;
  floorID: string;
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
export type Column = {
  name: keyof AreaData,
  align?: 'left' | 'right' | 'center'
  field: keyof AreaData,
} & Omit<QColumnType, 'name' | 'align'>

export interface AreaStateInterface {
  columns: Column[];
  rows: AreaData[];
}

function state (): AreaStateInterface {
  return {
    // Todo: Customized columns
    columns: [
      // Header column
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
      },
      // Other columns
      { name: 'name', align: 'center', label: 'Name', field: 'name', sortable: true },
      { name: 'floorID', align: 'center', label: 'Floor ID', field: 'floorID', sortable: true },
      { name: 'assetsCount', align: 'center', label: 'Assets Count', field: 'assetsCount', sortable: true },
      { name: 'lastUpdated', align: 'center', label: 'Last Update', field: 'lastUpdated', sortable: true }
    ],

    rows: []
  }
}

/** Type of state of this module.
 * It is used in definitions of getters, mutations and actions.
 */
export type State = ReturnType<typeof state>

export default state
