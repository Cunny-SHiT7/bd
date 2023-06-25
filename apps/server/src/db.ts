import { JsonDB, Config } from 'node-json-db';

// The first argument is the database filename. If no extension is used, '.json' is assumed and automatically added.
// The second argument is used to tell the DB to save after each push
// If you set the second argument to false, you'll have to call the save() method.
// The third argument is used to ask JsonDB to save the database in a human readable format. (default false)
// The last argument is the separator. By default it's slash (/)
var db = new JsonDB(new Config("renders", true, false, '/'));

// Configure lowdb to write data to JSON file
export type Data = {
  render: {
    name: string
    gender: string

    // from backend
    id: string
    url: string | null
    process: number,
    isError: boolean,
  }[]
}


export const createRender = async (payload: {
  name: string
  gender: string
}) => {
  const id = Math.random().toString(36).substr(2, 9)
  await db.push(`/render/${id}`, {
    ...payload,
    id,
    url: null,
    process: 0,
  })
  return id
}

export const updateRender = async (id: string, payload: {
  url?: string | null,
  process?: number,
  isError?: boolean,
}) => {
  const data = await db.getData(`/render/${id}`)
  const changedData = {
    ...data,
    ...payload
  }
  await db.push(`/render/${id}`, changedData)
  return
}

export const getRender = async (id: string) => {
  const render = await db.getData(`/render/${id}`)
  if (!render) {
    throw new Error(`No render with the ID ${id} found`)
  }
  return render
}

export default db