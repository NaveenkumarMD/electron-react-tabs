import * as sqlite3 from 'sqlite3'
const DB = new sqlite3.Database('even.db')

function initDatabase(): void {
  try {
    DB.run('CREATE TABLE IF NOT EXISTS TABDATA (id INT PRIMARY KEY, value INT DEFAULT 0)')
  } catch (e) {
    console.log('Error occurred while executing SQL queries', e)
  }
}
function createNewtab(id: number): void {
  try {
    DB.all(
      'SELECT * FROM TABDATA WHERE id = ?',
      [id], // Use positional placeholder with an array
      (err, data) => {
        if (err) {
          console.error('Error fetching data:', err)
          return
        }
        if (data.length > 0) {
          console.log('Tab Id already exists')
        } else {
          DB.run('INSERT INTO TABDATA (id, value) VALUES(?, ?)', [id, 0])
        }
      }
    )
  } catch (e) {
    console.log('Error occurred while executing SQL queries', e)
  }
}
function updateTabValue(id: number, value: number): void {
  try {
    DB.run('UPDATE TABDATA SET value = ? WHERE id = ?', [value, id], function (err) {
      if (err) {
        console.error('Error updating value:', err)
      }
    })
  } catch (e) {
    console.log('Error occurred while executing SQL queries', e)
  }
}
interface tabData {
  id: number
  value: number
}
const getTableData = (): Promise<tabData[]> =>
  new Promise((resolve, reject) => {
    DB.all('SELECT * FROM TABDATA', (err, data) => {
      if (err) {
        reject(err)
      }
      console.log(data)
      resolve(data as tabData[])
    })
  })

export default initDatabase
export { createNewtab, updateTabValue, getTableData }
