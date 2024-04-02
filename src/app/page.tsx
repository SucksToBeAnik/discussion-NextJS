import TopicCreateForm from "@/components/topic/topic-create-form";

const Home = async () => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4 ">
      <div className="col-span-3">
        <h1 className="text-xl m-2">Top Posts</h1>
      </div>
      <div className="col-span-1">
        <TopicCreateForm />
      </div>
    </div>
  );
};

export default Home;
