export const CL_PRIMARY = "#FFBF00";
export const CL_PRIMARY_LIGHT = "#FFEF00";
export const CL_PRIMARY_DARK = "#CFBF00";
export const CL_SECONDARY = "#2072AF";
export const CL_SECONDARY_LIGHT = "#6CB4EE";
export const CL_SECONDARY_DARK = "#18629F";
export const CL_INFO = "#00BFFF";

export function getOrderStatus(
  is_confirmed: boolean,
  is_cooked: boolean,
  is_paid: boolean
) {
  return is_cooked
    ? "Ready!"
    : is_paid
    ? "Paid"
    : is_confirmed
    ? "Confirmed and processing"
    : "Ordering";
}
