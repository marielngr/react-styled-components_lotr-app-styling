import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { volumes } from "../../lib/data";
import styled from "styled-components";

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 0.5rem;
  padding: 2rem;
`;

const Section = styled.section`
  display: flex;
  justify-content: space-around;
  padding: 2rem;
  color: white;
  background-color: ${({ $bgcolor }) => $bgcolor};
  margin-left: -3rem;
  margin-right: -3rem;
`;

const StyledUl = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  line-height: 150%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledNav = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledImage = styled(Image)`
  border: 2px solid green;
  margin-top: 2.5rem;
`;

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

  const { title, description, cover, books, color } = volume;
  console.log(title, color);

  return (
    <FlexContainer>
      <StyledLink href="/volumes">
        <StyledImage
          src="/images/chevron-left.svg"
          alt=""
          width={20}
          height={20}
        />
        All Volumes
      </StyledLink>
      <h1>{title}</h1>
      <p>{description}</p>
      <Section $bgcolor={color}>
        <StyledUl>
          {books.map(({ ordinal, title }) => (
            <li key={title}>
              {ordinal} <br />
              <strong>{title}</strong>
            </li>
          ))}
        </StyledUl>
        <Image
          src={cover}
          alt={`Cover image of ${title}`}
          width={140}
          height={230}
        />
      </Section>

      {previousVolume ? (
        <div>
          <StyledLink href={`/volumes/${previousVolume.slug}`}>
            <StyledImage
              src="/images/arrow-left.svg"
              alt=""
              width={20}
              height={20}
            />
            Previous Volume: {previousVolume.title}
          </StyledLink>
        </div>
      ) : null}
      {nextVolume ? (
        <StyledNav>
          <StyledLink href={`/volumes/${nextVolume.slug}`}>
            Next Volume: {nextVolume.title}
            <StyledImage
              src="/images/arrow-right.svg"
              alt=""
              width={20}
              height={20}
            />
          </StyledLink>
        </StyledNav>
      ) : null}
    </FlexContainer>
  );
}
