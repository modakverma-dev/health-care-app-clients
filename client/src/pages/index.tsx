import HomePageContent from "@/components/HomePageContent";
import axios from "axios";

export default function Home({ data }: { data: any }) {
  return <HomePageContent data={data} />;
}
export async function getServerSideProps() {
  try {
    const res = await axios.get(
      false
        ? "http://my-domain-for-learn.work.gd:3050/api/appointment/all"
        : "http://localhost:6000/appointment/details"
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
