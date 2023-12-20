// https://www.freecodecamp.org/news/typescript-satisfies-operator/
type personName = "John" | "Jack" | "Justin";
type otherDetails = {
  id: number;
  age: number;
};
type personInfo = personName | otherDetails;
type Person = {
  myInfo: personInfo;
  myOtherInfo: personInfo;
};


const applicant = {
  myInfo: "John",
  myOtherInfo: { id: 123, age: 22 },
} satisfies Person;

applicant.myInfo.toUpperCase(); // satisfies 不会报错, as 会报error
