import { Refine } from "@refinedev/core";
//import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { AntdInferencer } from "@refinedev/inferencer/antd";

import {
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  ThemedTitleV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { App as AntdApp, ConfigProvider, Layout } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import dataProvider from "./components/dataProvider";
import {
  ClientCreate,
  ClientEdit,
  ClientList,
  ClientShow,
} from "./pages/client";
import {
  DatabaseOutlined,
  FolderOutlined,
  PieChartOutlined,
  PrinterOutlined,
  ProjectOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  ProjectCreate,
  ProjectEdit,
  ProjectList,
  ProjectShow,
} from "./pages/project";
import {
  PrinterCreate,
  PrinterEdit,
  PrinterList,
  PrinterShow,
} from "./pages/printer";
import { JobEdit, JobList, JobShow } from "./pages/job";
import { Dashboard } from "./pages/dashboard";

function App() {
  const API_URL = import.meta.env.VITE_API_URL;

  return (
    console.log(import.meta.env.VITE_API_URL),
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          {/* <ConfigProvider theme={themeConfig}> */}
            <AntdApp>
              {/* <DevtoolsProvider> */}
              <Refine
                dataProvider={dataProvider(API_URL)}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                resources={[
                  {
                    name: "dashboard",
                    list: "/",
                    meta: {
                      label: "Dashboard",
                      canDelete: false,
                      icon: <PieChartOutlined />,
                    },
                  },
                  {
                    name: "project",
                    list: "/project",
                    create: "/project/create",
                    edit: "/project/edit/:id",
                    show: "/project/show/:id",
                    meta: {
                      canDelete: true,
                      icon: <ProjectOutlined />,
                    },
                  },
                  {
                    name: "job",
                    list: "/job",
                    edit: "/job/edit/:id",
                    show: "/job/show/:id",
                    meta: {
                      canDelete: true,
                      icon: <FolderOutlined />,
                    },
                  },
                  {
                    name: "client",
                    list: "/client",
                    create: "/client/create",
                    edit: "/client/edit/:id",
                    show: "/client/show/:id",
                    meta: {
                      canDelete: true,
                      icon: <UserOutlined />,
                    },
                  },
                  {
                    name: "printer",
                    list: "/printer",
                    create: "/printer/create",
                    edit: "/printer/edit/:id",
                    show: "/printer/show/:id",
                    meta: {
                      canDelete: true,
                      icon: <PrinterOutlined />,
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "SHzJAm-gbWyKh-kL7d5G",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <ThemedLayoutV2
                        Header={() => <Header sticky />}
                        Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                        Title={({ collapsed }) => (
                          <ThemedTitleV2
                            collapsed={collapsed}
                            icon={
                              collapsed ? (
                                <DatabaseOutlined />
                              ) : (
                                <DatabaseOutlined />
                              )
                            }
                            text="ProjectaLogs"
                          />
                        )}
                        Footer={() => (
                          <Layout.Footer
                            style={{
                              textAlign: "center",
                              color: "#fff",
                            }}
                          >
                            ProjectaLogs ©2025 Created by Simone Traversi
                          </Layout.Footer>
                        )}
                      >
                        <Outlet />
                      </ThemedLayoutV2>
                    }
                  >
                    <Route index element={<Dashboard />} />
                    <Route
                      index
                      element={<NavigateToResource resource="project" />}
                    />
                    <Route
                      index
                      element={<NavigateToResource resource="job" />}
                    />
                    <Route
                      index
                      element={<NavigateToResource resource="client" />}
                    />
                    <Route path="/project">
                      <Route path="/project" element={<ProjectList />} />
                      <Route
                        path="/project/create"
                        element={<ProjectCreate />}
                      />
                      <Route
                        path="/project/edit/:id"
                        element={<ProjectEdit />}
                      />
                      <Route
                        path="/project/show/:id"
                        element={<ProjectShow />}
                      />
                    </Route>
                    <Route path="/job">
                      <Route path="/job" element={<JobList />} />
                      <Route path="/job/create" element={<AntdInferencer />} />
                      <Route
                        path="/job/edit/:id"
                        element={<JobEdit />}
                      />
                      <Route
                        path="/job/show/:id"
                        element={<JobShow />}
                      />
                    </Route>
                    <Route path="/client">
                      <Route path="/client" element={<ClientList />} />
                      <Route path="/client/create" element={<ClientCreate />} />
                      <Route path="/client/edit/:id" element={<ClientEdit />} />
                      <Route path="/client/show/:id" element={<ClientShow />} />
                    </Route>
                    <Route path="/printer">
                      <Route path="/printer" element={<PrinterList />} />
                      <Route
                        path="/printer/create"
                        element={<PrinterCreate />}
                      />
                      <Route
                        path="/printer/edit/:id"
                        element={<PrinterEdit />}
                      />
                      <Route
                        path="/printer/show/:id"
                        element={<PrinterShow />}
                      />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              {/* 
              <DevtoolsPanel />
            </DevtoolsProvider> */}
            </AntdApp>
          {/* </ConfigProvider> */}
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
