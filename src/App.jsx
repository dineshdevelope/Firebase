import { useForm } from "react-hook-form";
import FormInput from "./components/forms/FormInput";
import FormTextArea from "./components/forms/FormTextArea";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import Header from "./components/Header";

const formSchema = z.object({
  labelName: z.string(),
  labelFor: z.string(),
  fullName: z.string().min(5).max(120),
  email: z.string(),
  address: z.string().min(10).max(120),
  qualification: z.string().min(10).max(120).url(),
  comments: z.string().min(10).max(2000),
});

const App = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const [candidates, setCandidates] = useState([]);

  const COLLECTION_NAME = "candidates";

  const sendThisToServer = async (data) => {
    // EVERY VALIDATION SHOULD PASS!
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), data);
      console.log("Document written with ID: ", docRef.id);
      alert("Added as you said!");
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    reset();
  };

  useEffect(() => {
    // Fetch data from server
    async function getDataFromFirebase() {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));

      setCandidates(querySnapshot.docs.map((doc) => doc.data()));

      if (querySnapshot.docs.length === 0) {
        console.log("No record exist!");
      }
    }

    getDataFromFirebase();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-5">
      <Header />
      <main className="container mx-auto my-5">
        <section className="bg-white p-5 rounded shadow">
          <form
            className="space-y-4 mt-5 max-w-2xl mx-auto"
            onSubmit={handleSubmit(sendThisToServer)}
          >
            <FormInput
              name="fullName"
              placeholder="Enter the movie name of the Song... like Vikram Vedha,Soorarai Pottru.."
              register={register("fullName")}
              error={errors.fullName}
            />
            <FormInput
              name="email"
              placeholder="Enter the song name like Tasakku Tasakku  "
              register={register("email")}
              error={errors.email}
            />
            <FormTextArea
              name="address"
              placeholder="Enter your description about the song"
              register={register("address")}
              error={errors.address}
            />
            <FormTextArea
              name="qualification"
              placeholder="Paste youtube thumbnail link"
              register={register("qualification")}
              error={errors.qualification}
            />
            <FormTextArea
              name="comments"
              placeholder="Enter your comments for this Song"
              register={register("comments")}
              error={errors.comments}
            />
            <button className="px-4 p-2 rounded bg-blue-500 hover:bg-green-600 text-white ">
              Submit
            </button>
          </form>
        </section>

        {/* Display values */}
        <section className="my-10">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 w-20">
                    S. No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Movie Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Song Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    YT LINK
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{candidate.fullName}</td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {candidate.jobRole}
                    </th>
                    <td className="px-6 py-4">{candidate.email}</td>
                    <td className="px-6 py-4">{candidate.qualification}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
