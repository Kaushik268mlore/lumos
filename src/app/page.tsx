import Link from "next/link";
import {db} from "~/server/db";
const randURLs=[
  "https://utfs.io/f/0e8873a9-cbbe-4836-a72b-d072408b95e6-kbo461.jpg",
  "https://utfs.io/f/ec692bb8-2722-4812-bd76-22c7f11f656e-n3ej4z.jpg",
  "https://utfs.io/f/ded6030a-21e0-4160-a6fa-69245a25609c-kcvpf0.png",
  "https://utfs.io/f/50d03f88-53de-45dd-ad00-1ce6505fa221-xnzt.jpg.jfif",
];
const randImages= randURLs.map((url,index)=>({
  id:index+1,
  url,
}));
export default async function HomePage() {
  const posts= await db.query.posts.findMany(); 
  console.log(posts);
  // this won't show up because this happens on the server side
  
  return (
    <main className="">
        <div className="flex flex-wrap gap-4">
          {[...randImages,...randImages,...randImages].map((image,index)=>(
            <Link key={image.id+"-"+index} href={`/image/${image.id}`} className="w-48">
              <img src={image.url} alt="image" className="w-full h-full object-cover" />
          
          </Link>))
        }
        </div>

    </main>
  );
} 
