import Navbar from "./Navbar";
import { useRouter } from "next/router";
import Footer from "./Footer";
import AddSlots from "./AddSlots";

function HomePageContent({ data }: { data: any }) {
  const router = useRouter();
  return (
    <div className="flex flex-col overflow-auto">
      <Navbar />
      <div className="pt-20 max-w-[70%] self-center min-h-screen">
        <h1>
          Lorem, ip Lorem, ipsum. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Nisi repudiandae nobis quaerat dignissimos libero!
          Aut, cumque. Necessitatibus ipsa dolorem fugit reprehenderit, vel
          nostrum iste esse eius assumenda odio. Provident officia nihil tenetur
          aspernatur?{" "}
        </h1>
        <div className="flex justify-center my-10">
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-[#407CE2] text-white px-5 py-3 rounded-md hover:bg-[#3767ba] transition"
          >
            View appointments
          </button>
        </div>
        <AddSlots data={data} />
      </div>
      <Footer />
    </div>
  );
}

export default HomePageContent;
