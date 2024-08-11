enum RolesTypes {
  UNKNOWN = "UNKNOWN",
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
  TECHNICIAN = "TECHNICIAN",
  CREATOR = "CREATOR",
}

export enum AllRolesTypes {
  ALL = 0,
}

export default RolesTypes;
export type RolesTypesWithAll = RolesTypes | AllRolesTypes;

export function getRoleColor(role?: RolesTypes) {
  switch (role) {
    case RolesTypes.ADMIN:
      return "error";

    case RolesTypes.CLIENT:
      return "warning";

    case RolesTypes.CREATOR:
      return "success";

    case RolesTypes.TECHNICIAN:
      return "primary";

    default:
      return "primary";
  }
}
