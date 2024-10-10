/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yi0l5qfj5qdzljb")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_name` ON `languages` (`name`)",
    "CREATE UNIQUE INDEX `idx_cDzU9cY` ON `languages` (`order_id`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yi0l5qfj5qdzljb")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_name` ON `languages` (`name`)"
  ]

  return dao.saveCollection(collection)
})
