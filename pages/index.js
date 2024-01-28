import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to the Lord of the Rings - Fanpage!</h1>
      <Link href="/volumes">Go to all books</Link>
    </div>
  );
}
