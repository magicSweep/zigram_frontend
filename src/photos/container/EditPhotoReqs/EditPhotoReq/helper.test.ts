import { FirestoreFieldsToEdit } from "../../../types";
import {
  makeEditPhotoData,
  isInSearchTerms,
  makeEditPhotoWorkerProps,
} from "./helper";

describe("makeEditPhotoWorkerProps", () => {
  test("If empty fieldsToUpdate", () => {
    const data = makeEditPhotoWorkerProps(
      {},
      "photoId",
      "userUid",
      "photoFile" as any
    );

    expect(data).toEqual({
      photoFile: "photoFile",
      photoId: "photoId",
      userUid: "userUid",
    });
  });

  test("", () => {
    const fieldsToUpdate: FirestoreFieldsToEdit = {
      tags: { wertet: true, erwqre: true },
      description: "Super description",
      date: new Date("2020-08-05"),
    };
    let photoId = "photoId";
    let userUid = "userUid";
    let photoFile = "photoFile";

    const data = makeEditPhotoWorkerProps(
      fieldsToUpdate,
      photoId,
      userUid,
      photoFile as any
    );

    expect(data).toEqual({
      date: "Wed, 05 Aug 2020 00:00:00 GMT",
      description: "Super description",
      photoFile: "photoFile",
      photoId: "photoId",
      tags: '{"wertet":true,"erwqre":true}',
      userUid: "userUid",
    });
  });
});

describe("makeEditPhotoData - depends on what fields on form fill user - what change in photo", () => {
  let photo: any = {
    description: "hello desc",
    date: {
      toDate: () => new Date("2020-05-05"),
    },
    tags: {
      //h12: false,
      er3: true,
      //"22w": false,
      r34: true,
    },
  };

  const editPhotoFormData: any = {
    desc: "hello desc",
    date: new Date("2020-05-05"),
    photoFile: {},
    tags: {
      h12: false,
      er3: true,
      "22w": false,
      r34: true,
    },
  };

  /* test.only("Our main test", () => {
      const photoFormData = {
        desc: "Hello, from desc",
        date: "2019-05-12",
        photoFile: undefined,
        tags: { absdre: true },
      };
  
      const fieldsToUpdate = makeEditPhotoData(photoFormData);
  
      expect(fieldsToUpdate).toEqual({});
    });
   */
  test("If we set empty data - we got nothing to change", () => {
    //const fieldsToUpdate = makeEditPhotoData({} as any, photo);

    const fieldsToUpdate = makeEditPhotoData({} as any, photo);
    //const fieldsToUpdate = start();

    expect(fieldsToUpdate).toEqual({});
  });

  test("", () => {
    const fieldsToUpdate = makeEditPhotoData(editPhotoFormData, photo);
    //const fieldsToUpdate = start();

    expect(fieldsToUpdate).toEqual({});
    //expect(Object.keys(fieldsToUpdate).length).toEqual(0);
  });

  test("", () => {
    photo = {
      description: "goodbye from hell",
      date: {
        toDate: () => new Date("2021-07-11"),
      },
      tags: {
        h12: true,
        er3: false,
        "22w": true,
        r34: false,
      },
    };

    const fieldsToUpdate = makeEditPhotoData(editPhotoFormData, photo);
    //const fieldsToUpdate = start();

    expect(fieldsToUpdate.date.toString()).toEqual(
      "Tue May 05 2020 03:00:00 GMT+0300 (Moscow Standard Time)"
    );
    expect(fieldsToUpdate.description).toEqual("hello desc");
    expect(fieldsToUpdate.tags).toEqual({ er3: true, r34: true });
    expect(fieldsToUpdate.yearsOld).toEqual(1);
  });
});

describe("isInSearchTerms", () => {
  test.each([
    {
      count: 0,
      search: { age: -1, tags: undefined },
      fieldsToUpdate: { date: undefined, tags: { by: true } },
      expected: true,
    },
    {
      count: 1,
      search: { age: 2, tags: undefined },
      fieldsToUpdate: { date: new Date("2020-08-23"), tags: { by: true } },
      expected: true,
    },
    {
      count: 2,
      search: { age: 1, tags: undefined },
      fieldsToUpdate: { date: new Date("2020-08-23"), tags: { by: true } },
      expected: false,
    },
    {
      count: 3,
      search: { age: 1, tags: { by: true } },
      fieldsToUpdate: { date: new Date("2020-08-23"), tags: { by: true } },
      expected: false,
    },
    {
      count: 4,
      search: { age: 2, tags: { by: true } },
      fieldsToUpdate: { date: new Date("2020-08-23"), tags: { by: true } },
      expected: true,
    },
    {
      count: 5,
      search: { age: 2, tags: { by: true } },
      fieldsToUpdate: { date: new Date("2020-08-23"), tags: { by: true } },
      expected: true,
    },
    {
      count: 6,
      search: { age: 2, tags: { by: true, three: true, your: true } },
      fieldsToUpdate: { date: new Date("2020-08-23"), tags: { by: true } },
      expected: false,
    },
    {
      count: 7,
      search: { age: 2, tags: { by: true, three: true, your: true } },
      fieldsToUpdate: {
        date: new Date("2020-08-23"),
        tags: { by: true, three: true, your: true },
      },
      expected: true,
    },
  ])("Test number - $count", ({ search, fieldsToUpdate, expected }: any) => {
    expect(isInSearchTerms(search, fieldsToUpdate)).toEqual(expected);
  });
});
