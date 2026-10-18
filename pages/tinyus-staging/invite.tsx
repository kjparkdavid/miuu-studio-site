import InvitePage from "@/components/tinyus/invitePage";

// dev #1212: the staging app's invite fallback (/tinyus-staging/invite/<CODE> → here via 404.tsx). Opens tinyus-staging://.
export default function StagingInvite() {
  return <InvitePage locale="en" staging />;
}
