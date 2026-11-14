import Image from "next/image";

/**
 * The wide cover photo under the dark header. Its section is dark in the
 * top half and white in the bottom half, so the photo straddles the edge.
 */
export default function ArticleCover({ src }: { src: string }) {
  return (
    <div className="bg-linear-to-b from-ink from-50% to-white to-50%">
      <div className="mx-auto w-full max-w-page page-x">
        <div className="relative aspect-[16/9] overflow-hidden rounded-post shadow-[0_30px_80px_0_rgb(43_26_110/0.2)] md:rounded-feature xl:aspect-auto xl:h-130">
          <Image src={src} alt="" fill preload sizes="(min-width: 1440px) 1280px, 100vw" className="object-cover" />
        </div>
      </div>
    </div>
  );
}
