import LayoutContainer from "@/components/spacing/LayoutContainer";
import TabNav, { Tab } from "@/components/pages/dashboard/TabNav";

type PageProps = {
  children: Readonly<React.ReactNode>;
};

export default function Layout({ children }: PageProps) {
  return (
    <LayoutContainer>
      <TabNav>
        <Tab href="/dashboard/posts" name="Posts" />
        <Tab href="/dashboard/works" name="Works" />
      </TabNav>
      {children}
    </LayoutContainer>
  );
}
