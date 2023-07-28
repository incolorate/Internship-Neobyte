import { BsCheckCircleFill } from "react-icons/bs";

export default function PostCard({ postData }) {
  console.log(postData);
  return (
    <>
      <div>
        <p>
          <BsCheckCircleFill className="text-blue-500" /> {postData.userEmail}
        </p>
        <p>{postData.postText}</p>
      </div>
    </>
  );
}
