/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "x2nnjor63i8mffu",
    "created": "2024-10-06 13:41:17.199Z",
    "updated": "2024-10-06 13:41:17.199Z",
    "name": "usage",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "wnzqnedi",
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
  const collection = dao.findCollectionByNameOrId("x2nnjor63i8mffu");

  return dao.deleteCollection(collection);
})
