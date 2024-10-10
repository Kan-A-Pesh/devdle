/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yi0l5qfj5qdzljb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yupncktk",
    "name": "order_id",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": true
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yi0l5qfj5qdzljb")

  // remove
  collection.schema.removeField("yupncktk")

  return dao.saveCollection(collection)
})
