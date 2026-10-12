import type { GetStaticPaths, GetStaticProps } from "next";
import ComicReader from "@/components/comicReader";
import { ALL_EPISODES } from "@/lib/content";

export default function Episode({ seriesId, slug }: { seriesId: string; slug: string }) {
  return <ComicReader locale="ko" seriesId={seriesId} slug={slug} />;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: ALL_EPISODES.map((e) => ({ params: { series: e.series.id, slug: e.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: { seriesId: params?.series, slug: params?.slug },
});
