
export const formJson = {
  questions: {
    name: { type: "text", label: "Name" },
    dateOfBirth: { type: "date", label: "Date of Birth" },
    mobile: { type: "phone", label: "Mobile" },
    email: { type: "text", label: "Email" },
    occupation: { type: "select", label: "Occupation" },
    gender: { type: "radio", label: "Select Gender" },
    annualIncome: { type: "number", label: "Annual Income" },
    address1: { type: "text", label: "Address Line 1" },
    address2: { type: "text", label: "Address Line 2" },
    zipcode: { type: "text", label: "Zip Code" },
    state: { type: "select", label: "State" },
    district: { type: "select", label: "District" },
    city: { type: "text", label: "City" },
    member1Percentage: { type: "number", label: "Member 1 Percentage" },
    member2Percentage: { type: "number", label: "Member 2 Percentage" },
    member3Percentage: { type: "number", label: "Member 3 Percentage" },
    salarySlip: { type: "file", label: "Upload Salary Slip" }
  },
  sections: {
    PrimaryDetails: ["name", "email", "gender", "mobile"],
    OtherDetails: ["annualIncome", "occupation"],
    AddressDetails: ["address1", "address2", "zipcode", "state", "district", "city"],
    MembersAllocation: []
  }
};