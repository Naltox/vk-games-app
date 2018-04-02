import * as Nedb from "nedb";

export function find<T>(db: Nedb, query: any): Promise<Nedb.Cursor<T>> {
    return new Promise<Nedb.Cursor<T>>((resolve, reject) => {
        db.find(query, (err, data) => {
            if (err) {
                reject(err)
                return
            }

            resolve(data)
        })
    })
}

export function remove(db: Nedb, query: any): Promise<void> {
    return new Promise((resolve, reject) => {
        db.remove(query, err => {
            if (err) {
                reject(err)
                return
            }

            resolve()
        })
    })
}

export function insert<T>(db: Nedb, newDoc: T, cb?: (err: Error, document: T) => void): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        db.insert(newDoc, (err, doc) => {
            if (err) {
                reject(err)
                return
            }

            resolve(doc)
        })
    })
}

export function update<T>(db: Nedb, query: any, updateQuery: any, options?: Nedb.UpdateOptions): Promise<void> {
    return new Promise((resolve, reject) => {
        db.update(query, updateQuery, {}, (err, numberOfUpdated, upsert) => {
            if (err) {
                reject(err)
                return
            }

            resolve()
        })
    })
}