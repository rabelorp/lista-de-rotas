import apiMapBox from "../providers/apiMapBox";

const getLocation = (location: string) =>
  apiMapBox.get(
    `${location}.json?access_token=pk.eyJ1IjoicmFiZWxvcnAiLCJhIjoiY2w2eG5lbjQyMnB6cTNlbno0OHFucWp1cSJ9.NOAE0m38qRcgUB6VG7F1Zw`
  );
export const LocationService = {
  getLocation,
};
