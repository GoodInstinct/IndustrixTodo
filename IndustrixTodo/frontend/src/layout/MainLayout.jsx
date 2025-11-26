import "../styles/mainlayout.css";
import { Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";

const { Sider, Content, Header } = Layout;

export default function MainLayout() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{ background: "#001529" }}
      >
        <div className="logo">Industrix Todo</div>

        <Menu theme="dark" mode="inline">
          <Menu.Item key="1" icon={<UnorderedListOutlined />}>
            <Link to="/todos">Todos</Link>
          </Menu.Item>

          <Menu.Item key="2" icon={<AppstoreOutlined />}>
            <Link to="/categories">Categories</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ background: "#fff", padding: "0 20px" }}>
          Dashboard
        </Header>

        <Content style={{ margin: "20px" }}>
          <Outlet /> {/* 👈 HAL YANG PALING PENTING */}
        </Content>
      </Layout>
    </Layout>
  );
}
