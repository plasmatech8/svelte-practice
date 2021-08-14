<script>
  import Tab, { Label } from "@smui/tab";
  import Card from "@smui/card";
  import TabBar from "@smui/tab-bar";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import { useLocation, Link } from "svelte-navigator";

  const location = useLocation();
  let tabs = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Login", to: "/login" },
  ];
  $: active = tabs.find((t) => t.to === $location.pathname);
  console.log(active);
</script>

<LayoutGrid>
  <Cell span={3}>
    <Card>
      <TabBar {tabs} let:tab bind:active>
        <Link to={tab.to} style="text-decoration: none;">
          <Tab {tab}>
            <Label>{tab.name}</Label>
          </Tab>
        </Link>
      </TabBar>
    </Card>
  </Cell>
</LayoutGrid>
