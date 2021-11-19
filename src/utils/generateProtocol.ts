import moment from "moment";

export function generateProtocol(): string {
  const random = Math.floor(Math.random() * (99999 - 1000)) + 1000;
  const date = moment(new Date()).format("L");
  const [month, day, year] = date.split("/");
  const protocol = `${random}-${day}${month}${year}`;
  return protocol;
}
