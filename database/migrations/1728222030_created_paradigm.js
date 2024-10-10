/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "anlmepdbmugx0kb",
    "created": "2024-10-06 13:40:30.553Z",
    "updated": "2024-10-06 13:40:30.553Z",
    "name": "paradigm",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "tvhp3djh",
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
  const collection = dao.findCollectionByNameOrId("anlmepdbmugx0kb");

  return dao.deleteCollection(collection);
})
