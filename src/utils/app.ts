import { FirestoreDate } from "lizzygram-common-data/dist/types";
import { intersection } from "lodash-es";

export const calcPhotosLimitPerQuery = (
  photoCardWidth: number,
  photoCardHeight: number
) => {
  if (typeof window !== "undefined") {
    let width = screen.width;
    const height = screen.height;

    //width = width > maxAppWidth ? maxAppWidth : width;

    let numberOfElementsByWidth = Math.floor(width / photoCardWidth);

    numberOfElementsByWidth =
      numberOfElementsByWidth === 0 ? 1 : numberOfElementsByWidth;

    //Math.ceil(height / photoCardHeight)
    // we add two additional rows
    let numberOfElementsByHeight = Math.floor(height / photoCardHeight) + 2;

    const res = numberOfElementsByWidth * numberOfElementsByHeight;

    return res < 5 ? 5 : res;
  } else {
    return 0;
  }
};

export const makePhotoId = () => {
  return (90000000000000 - Date.now()).toString();
};

export const makeDownloadPhotoName = (imageExtention: string) => {
  return `photo_${Math.round(Math.random() * 100000)}.${imageExtention}`;
};

export const makeDownloadPhotoUrl = (
  googleDriveId: string,
  userUid: string,
  //imageExtention: string,
  downloadPhotoUrl: string,
  photoFileName: string
) => {
  let downloadUrl = `${downloadPhotoUrl}/${userUid}${googleDriveId}/${photoFileName}`;
  //if (imageExtention) downloadUrl += `.${imageExtention}`;

  return downloadUrl;
};

// AGE AND DATE

export const getDate = (date: Date | number | string | FirestoreDate): Date => {
  let resultDate = undefined;

  /* console.log(
      "GET DATE",
      date.hasOwnProperty("toDate"),
      (date as any).toDate ? true : false
    );
   */
  if (date instanceof Date) return date;

  if ((date as FirestoreDate).toDate) {
    return (date as any).toDate();
  }

  if (typeof date === "string") {
    resultDate = new Date(date);
    if (resultDate.toString() === "Invalid Date")
      resultDate = new Date(parseInt(date));
  } else {
    // @ts-ignore
    resultDate = new Date(date);
  }

  if (resultDate.toString() === "Invalid Date")
    throw new Error("Bad date in PhotoDesc");

  return resultDate;
};

export const millisecondsToYears = (mSeconds: number) => {
  return Math.floor(mSeconds / 31536000000);
};

export const getLizzyYearsOld = () => {
  const birthday = new Date("2018-07-07");

  const now = new Date();

  const mSeconds = now.getTime() - birthday.getTime();

  return millisecondsToYears(mSeconds);
};

export const getYearsOld = (date: Date) => {
  const birthday = new Date("2018-07-07");

  //console.log("Date", date.getTime(), birthday.getTime());

  const mSeconds = date.getTime() - birthday.getTime();

  //console.log("mSeconds", mSeconds);

  //console.log("result", mSeconds / 31536000000);

  return millisecondsToYears(mSeconds);
};

export const getAlphabetMonth = (date: Date, withDay: boolean = false) => {
  const month = date.getMonth();
  switch (month) {
    case 0:
      return `??????????${withDay ? "??" : "??"}`;
    case 1:
      return `????????????${withDay ? "??" : "??"}`;
    case 2:
      return `????????${withDay ? "??" : ""}`;
    case 3:
      return `??????????${withDay ? "??" : "??"}`;
    case 4:
      return `????${withDay ? "??" : "??"}`;
    case 5:
      return `??????${withDay ? "??" : "??"}`;
    case 6:
      return `??????${withDay ? "??" : "??"}`;
    case 7:
      return `????????????${withDay ? "??" : ""}`;
    case 8:
      return `??????????????${withDay ? "??" : "??"}`;
    case 9:
      return `????????????${withDay ? "??" : "??"}`;
    case 10:
      return `??????????${withDay ? "??" : "??"}`;
    case 11:
      return `????????????${withDay ? "??" : "??"}`;

    default:
      throw new Error(`Unknown month number  ${month}`);
  }
};

export const getFormattedYearsOld = (yearsOld: number): string => {
  switch (yearsOld) {
    case 0:
      return "???????????? ????????";
    case 1:
      return "1 ??????";
    case 2:
      return "2 ????????";
    case 3:
      return "3 ????????";
    case 4:
      return "4 ????????";
    case 5:
      return "5 ??????";
    case 6:
      return "6 ??????";
    case 7:
      return "7 ??????";
    case 8:
      return "8 ??????";
    case 9:
      return "9 ??????";
    case 10:
      return "10 ??????";
    case 11:
      return "11 ??????";
    case 12:
      return "12 ??????";
    case 13:
      return "13 ??????";
    case 14:
      return "14 ??????";
    case 15:
      return "15 ??????";
    case 16:
      return "16 ??????";

    default:
      `${yearsOld}`;
    /* default:
      throw new Error(`No implementation or bad data | ${yearsOld}`); */
  }
};

export const makeYearsOldStringify = (date: Date) => {
  const yearsOld = getYearsOld(date);

  return getFormattedYearsOld(yearsOld);
};

export const getFormatDate = (date: Date) => {
  const day = date.getDate();
  const month = getAlphabetMonth(date);
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

// OTHER

export const isSameArrayValues = (arr1: string[], arr2: string[]) => {
  const resIntersection = intersection(arr1, arr2);
  if (
    resIntersection.length !== arr1.length ||
    resIntersection.length !== arr2.length
  ) {
    return false;
  }

  return true;
};

export const getOnlyTrueTags = (tags: { [name: string]: boolean }) => {
  const result: { [id: string]: boolean } = {};
  for (let id in tags) {
    if (tags[id] === true) {
      result[id] = true;
    }
  }

  return result;
};
