/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "0ovhgliyg823p5e",
    "created": "2024-10-06 13:40:57.192Z",
    "updated": "2024-10-06 13:40:57.192Z",
    "name": "typing",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "bp7tafpj",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("0ovhgliyg823p5e");

  return dao.deleteCollection(collection);
})
