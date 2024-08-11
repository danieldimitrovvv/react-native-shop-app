import WeekDays from "../types/WeekDays";

export default interface IWorktime {
  day: WeekDays;
  from?: Date | string;
  to?: Date | string;
  isLunchBreak: boolean;
}
