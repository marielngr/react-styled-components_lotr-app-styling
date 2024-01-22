import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { volumes } from "../../lib/data";

export default function VolumeDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const volumeIndex = volumes.findIndex((volume) => volume.slug === slug);

  const volume = volumes[volumeIndex];
  const previousVolume = volumes[volumeIndex - 1];
  const nextVolume = volumes[volumeIndex + 1];

  if (!volume) {
    return null;
  }

  const { title, description, cover, books } = volume;

  return (
    <>
      <Link href="/volumes">
        <Image src="/images/chevron-left.svg" alt="" width={20} height={20} />
        All Volumes
      </Link>
      <h1>{title}</h1>
      <p>{description}</p>
      <ul>
        {books.map(({ ordinal, title }) => (
          <li key={title}>
            {ordinal}: <strong>{title}</strong>
          </li>
        ))}
      </ul>
      <Image
        src={cover}
        alt={`Cover image of ${title}`}
        width={140}
        height={230}
      />
      {previousVolume ? (
        <div>
          <Link href={`/volumes/${previousVolume.slug}`}>
            <Image src="/images/arrow-left.svg" alt="" width={20} height={20} />
            Previous Volume: {previousVolume.title}
          </Link>
        </div>
      ) : null}
      {nextVolume ? (
        <div>
          <Link href={`/volumes/${nextVolume.slug}`}>
            Next Volume: {nextVolume.title}
            <Image
              src="/images/arrow-right.svg"
              alt=""
              width={20}
              height={20}
            />
          </Link>
        </div>
      ) : null}
    </>
  );
}
