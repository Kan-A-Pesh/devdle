/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("anlmepdbmugx0kb")

  collection.name = "paradigms"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("anlmepdbmugx0kb")

  collection.name = "paradigm"

  return dao.saveCollection(collection)
})
