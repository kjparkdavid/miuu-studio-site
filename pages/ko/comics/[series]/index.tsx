import type { GetStaticPaths, GetStaticProps } from "next";
import SeriesPage from "@/components/seriesPage";
import { SERIES } from "@/lib/content";

export default function Series({ id }: { id: string }) {
  return <SeriesPage locale="ko" id={id} />;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: SERIES.map((s) => ({ params: { series: s.id } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => ({ props: { id: params?.series } });
