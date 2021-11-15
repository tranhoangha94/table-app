export const headerConfig = [
  { label: "ID", value: "id" },
  { label: "First Name", value: "firstName" },
  { label: "Last Name", value: "lastName" },
  { label: "Email", value: "email" },
  { label: "Gender", value: "gender" },
  { label: "Birthday", value: "birthday" },
  { label: "Salary", value: "salary" },
  { label: "Phone", value: "phone" },
];

export const bodyConfig = [
  "id",
  "firstName",
  "lastName",
  "email",
  "gender",
  "birthday",
  "salary",
  "phone",
];

export type SortType = keyof UserType;
// | "id"
// | "firstName"
// | "lastName"
// | "email"
// | "gender"
// | "birthday"
// | "salary"
// | "phone";

export type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  birthday: string;
  salary: number;
  phone: string;
};

export function formartPhoneNumber(phone: string) {
  if (!phone) return "";
  const strNum = phone.replaceAll("-", "");
  return "(+84)" + strNum;
}
