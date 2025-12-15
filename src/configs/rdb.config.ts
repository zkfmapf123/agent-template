import Database from 'better-sqlite3'
import fs from 'fs'

// https://github.com/WiseLibs/better-sqlite3/blob/HEAD/docs/api.md
export class RDBConfig {
  private db!: Database.Database

  init(initSQLFile = 'table.sql') {
    const db = new Database('table.db')

    /**
     * 기본 - 쓰기 중 읽기차단 (단일 파일)
     * WAL - 쓰기 중 읽기 허용 (멀티 파일) **
     */
    db.prepare('journal_mode = WAV')

    const sql = fs.readFileSync(initSQLFile, 'utf8')
    db.exec(sql)

    this.db = db
    return this
  }
}
