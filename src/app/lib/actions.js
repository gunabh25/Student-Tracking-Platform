"use server";

import { revalidatePath } from "next/cache";
import { User, Student} from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { toast } from "sonner";
import { signIn, auth, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";

// Function to add a new teacher
export const addUser = async (formData) => {
  // Extract user data from form
  const { username, email, password, phone, address, img, isAdmin, isActive, companyID, admissionNumber, rollNumber, branch, year, section } =
    Object.fromEntries(formData);

    console.log("formData is", formData);

  try {
    connectToDB();

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user object
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      img,
      address,
      isAdmin,
      isActive,
      companyID,
      admissionNumber,
      rollNumber,
      branch, 
      year, 
      section, 
    });

    // Save user to database
    await newUser.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create user!");
  }

  // Revalidate the users page and redirect
  revalidatePath("/dashboard/all_students");
  redirect("/dashboard/all_students");
};

// Function to update an existing teacher
export const updateUser = async (formData) => {
  // Extract updated user data from form
  const { id, username, email, password, phone, address, isAdmin, isActive, year, section, admissionNumber, rollNumber } =
    Object.fromEntries(formData);

    console.log("formData is", formData);

  try {
    connectToDB();

    // Prepare update fields
    const updateFields = {
      username,
      email,
      password,
      phone,
      address,
      isAdmin,
      isActive,
      year: year || undefined, // Ensure value is passed
      section: section || undefined, // Ensure value is passed
      admissionNumber,
      rollNumber,
    };
    console.log("updateFields is", updateFields);
    // Remove empty fields
    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );


    // console.log
    // Update user in database
    await User.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }

  // Revalidate the users page and redirect
  revalidatePath("/dashboard/all_students");
  redirect("/dashboard/all_students");
};

// Function to delete a user
export const deleteUser = async (id) => {
  console.log("id for deleted user is", id);

  try {
    await connectToDB();
    // Delete user from database
    await User.findByIdAndDelete(id);

    // Revalidate the users page
    revalidatePath("/dashboard/users");
    return { success: true };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user!");
  }
};


// Function to add a new student
export const addStudent = async (formData) => {
  // Extract student data from form
  const { firstName, lastName, year, section, admissionNumber, address, phone, companyID } = Object.fromEntries(formData);

  console.log("formData is", formData);

  try {
    await connectToDB();

    // Create a new student
    const newStudent = new Student({
      firstName,
      lastName,
      year,
      section,
      admissionNumber,
      address,
      phone,
      companyID,
    });

    // Save the student to the database
    await newStudent.save();

    console.log("Student added successfully");
    toast.success("Student added successfully");
    revalidatePath("/students");
  } catch (err) {
    console.log(err);
    toast.error("Failed to add student!");
    throw new Error("Failed to add student!");
  }
};

// Function to update an existing student
export const updateStudent = async (id, formData) => {
  // Extract student data from form
  const { firstName, lastName, year, section, admissionNumber, address, phone, companyID, attendance } = Object.fromEntries(formData);

  console.log("formData is", formData);

  try {
    await connectToDB();

    // Find the student by ID and update their details
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        year,
        section,
        admissionNumber,
        address,
        phone,
        companyID,
        attendance: attendance.map((att) => ({
          date: new Date(att.date),
          status: att.status,
        })),
      },
      { new: true }
    );

    console.log("Student updated successfully");
    toast.success("Student updated successfully");
    revalidatePath("/students");
    return updatedStudent;
  } catch (err) {
    console.log(err);
    toast.error("Failed to update student!");
    throw new Error("Failed to update student!");
  }
};


// Function to authenticate a user
export const authenticate = async (prevState, formData) => {
  const { username, password, companyid } = Object.fromEntries(formData);
  try {
    // Attempt to sign in user
    await signIn("credentials", { username, password, companyid });
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
  }
    console.error(err);
    if (err.message.includes("CredentialsSignin")) {
      return "Incorrect username, company ID or password. Please try again.";
    }
    throw err;
  }
};

// Function to sign up a new user
export const signup = async (prevState, formData) => {
  // Extract signup data from form
  const { username, email, password, companyid, company, isAdmin } =
    Object.fromEntries(formData);
  console.log("username", username);
  console.log("email", email);
  console.log("password", password)
  console.log("companyid", companyid);
  console.log("company", company);
  try {
    connectToDB();

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user object
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      companyID: companyid,
      companyName: company,
      isAdmin,
    });

    // Save user to database
    await newUser.save();

    // Redirect to login page
    redirect("/login");
  } catch (err) {
    if (err.message.includes("E11000")) {
      return "User already exists";
    }
    throw err;
  }
};

// Function to delete all records for a company
export const deleteCompanyRecords = async (formData) => {
  const session = await auth();

  const { companyID: inputCompanyID } = Object.fromEntries(formData);
  // console.log("inputCompanyID is", inputCompanyID);

  const currentCompanyID = session?.user?.companyID;
  try {
    await connectToDB();

    // Delete all records for the company
    await User.deleteMany({ companyID: currentCompanyID });
    await Product.deleteMany({ companyID: currentCompanyID });
    await Customer.deleteMany({ companyID: currentCompanyID });
    await Enquiry.deleteMany({ companyID: currentCompanyID });

    console.log(`All records for companyID: '${currentCompanyID}' have been deleted.`);    
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete company records!");
  }
  // Sign out the user and redirect to home page
  finally {
    await signOut({ redirectTo: "/deleted" });
    redirect("/deleted")

  }
};

// export const handleSelfDelete = async (formData) => {
//   const { id } = Object.fromEntries(formData);
//   console.log("Deleting own account with id:", id);

//   try {
//     await connectToDB();
//     // Delete user from database
//     await User.findByIdAndDelete(id);

//     // Sign out the current user
//     await signOut({ redirect: false });

//     // Use permanentRedirect to redirect to home page
//     permanentRedirect('/');
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to delete own account!");
//   }
// };