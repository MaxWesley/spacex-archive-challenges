import type { Launch } from "../types/launch";

const placeholderSrc = "/launch-placeholder.png";

function getLaunchImageSrc(launch: Launch) {
  const patchSmall = launch.links?.patch?.small;
  const patchLarge = launch.links?.patch?.large;
  const flickrFirst = launch.links?.flickr?.original?.[0];
  return patchSmall || patchLarge || flickrFirst || placeholderSrc;
}

function getLaunchStatus(launch: Launch) {
  if (launch.upcoming) return "upcoming";
  if (launch.success) return "success";
  return "failure";
}

function getLaunchDate(launch: Launch) {
  const date = new Date(launch.date_utc);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

export { getLaunchImageSrc, getLaunchStatus, getLaunchDate };
