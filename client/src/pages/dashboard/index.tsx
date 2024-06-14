import DashboardPageContent from "@/components/DashboardPageContent";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import axios from "axios";
export default function Home({ data }: { data: any }) {
  return (
    <>
      <Navbar />
      <DashboardPageContent avalableSlotsList={data} />
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  try {
    const res = await axios.get(
      false?"http://my-domain-for-learn.work.gd:3050/api/appointment/all":"http://localhost:6000/appointment/all"
    );

    return {
      props: {
        data: res?.data,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        data: [],
      },
    };
  }
}
