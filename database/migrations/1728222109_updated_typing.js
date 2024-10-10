/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0ovhgliyg823p5e")

  collection.name = "typings"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0ovhgliyg823p5e")

  collection.name = "typing"

  return dao.saveCollection(collection)
})
