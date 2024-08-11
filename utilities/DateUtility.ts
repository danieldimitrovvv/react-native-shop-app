export default class DateUtility {
  static getDateAfterMinutes(minutes: number, date: Date = new Date()): Date {
    const d = new Date(date);
    d.setMinutes(date.getMinutes() + minutes);
    return d;
  }

  static getDateByTime(
    h: number,
    m: number,
    s: number,
    date: Date = new Date()
  ): Date {
    const d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), h, m, s);
  }

  static getPreviousDate(date = new Date(), beforeDays = 1): Date {
    const nextDay = new Date(date).setDate(date.getDate() + beforeDays);
    return new Date(nextDay);
  }

  static getNextDate(date = new Date(), afterDays = 1): Date {
    const nextDay = new Date(date).setDate(date.getDate() + afterDays);
    return new Date(nextDay);
  }

  static dateFromInterval = (
    searchDate: Date,
    startDate: Date,
    endDate: Date
  ): boolean => {
    return (
      searchDate.getTime() > startDate.getTime() &&
      searchDate.getTime() < endDate.getTime()
    );
  };

  static msToTime = (duration: number) => {
    var milliseconds = (duration % 1000) / 100,
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    return {
      hours,
      minutes,
      seconds,
      milliseconds,
    };
  };

  static compareDateExcludeTime = (d1: Date, d2: Date) => {
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };
  static getDateString(
    date: Date,
    withDay: boolean,
    withMonth: boolean,
    withYear: boolean
  ): string {
    let d = withDay ? DateUtility.getNumberWithZero(date.getDate()) : "";

    let m = withMonth ? DateUtility.getNumberWithZero(date.getMonth() + 1) : "";

    let y = withYear ? date.getFullYear() : "";

    if (withDay && withMonth && withYear) {
      return `${d}.${m}.${y}`;
    }

    if (withDay && withMonth) {
      return `${d}.${m}`;
    }

    if (withDay && withYear) {
      return `${d}.${y}`;
    }

    if (withMonth && withYear) {
      return `${m}.${y}`;
    }

    return date.toDateString();
  }

  static getTimeString(
    date: Date = new Date(),
    options?: { withHours: boolean; withMinutes: Boolean; withSeconds: boolean }
  ): string {
    let {
      withHours = true,
      withMinutes = true,
      withSeconds = false,
    } = options ?? {};

    return `${withHours ? DateUtility.getNumberWithZero(date.getHours()) : ""}${
      withMinutes
        ? withHours
          ? ":" + DateUtility.getNumberWithZero(date.getMinutes())
          : "" + DateUtility.getNumberWithZero(date.getMinutes())
        : ""
    }${
      withSeconds
        ? withMinutes
          ? ":" + DateUtility.getNumberWithZero(date.getSeconds())
          : "" + DateUtility.getNumberWithZero(date.getSeconds())
        : ""
    }`;
  }

  static getNumberWithZero(n: number): string {
    return n > 9 ? n.toString() : "0" + n;
  }

  static getTimePickerInitialTimeString(date: Date = new Date()): string {
    return `${DateUtility.getNumberWithZero(
      date.getHours()
    )}:${DateUtility.getNumberWithZero(date.getMinutes())}`;
  }

  static getDateTimeString(date: Date = new Date()): string {
    return `${DateUtility.getDateString(
      date,
      true,
      true,
      true
    )} ${DateUtility.getTimeString(date)}`;
  }

  static cleatTimeZone(date: Date): string {
    const regex = /GMT\+[0-9]{4}/gi;
    const stringData = date.toString().replace(regex, "GMT+0000");
    const newDate = new Date(stringData);

    return newDate.toISOString().slice(0, 19);
  }
}
