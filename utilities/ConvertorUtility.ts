export default class ConvertorUtility {
  static classToInterface = <C, I>(data: C): I => {
    return JSON.parse(JSON.stringify(data)) as I;
  };
}
