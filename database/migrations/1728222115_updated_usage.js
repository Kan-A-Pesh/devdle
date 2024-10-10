/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x2nnjor63i8mffu")

  collection.name = "usages"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x2nnjor63i8mffu")

  collection.name = "usage"

  return dao.saveCollection(collection)
})
