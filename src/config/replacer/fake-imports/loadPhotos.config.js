exports.default = [
  {
    pathToFile: "src/photos/loadPhotos/hook/usePhotos/index.ts",
    // identify in log messages
    identifier: "REPLACER | FAKE IMPORTS | PHOTOS SERVICE",
    replaceable: '"../../service/PhotosDb"',
    replacement: '"../../service/PhotosDb/PhotosDb.fake"',
  },
];
