import { createBrowserRouter } from "react-router-dom"
// first landing
import Splash from "../pages/Splash"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Onboarding from "../pages/Onboarding"

// main app
import Application from "../pages/home/Application"
// presensi
import Presensi from "../pages/presensi/Presensi"
// child of presensi
import RequestOvertime from "../pages/presensi/child/RequestOvertime"
import RequestPermission from "../pages/presensi/child/RequestPermission"
import RequestChangeShift from "../pages/presensi/child/RequestChangeShift"
import RequestReimburse from "../pages/presensi/child/RequestReimburse"
import ClientVisits from "../pages/presensi/child/ClientVisits"
import LogPresence from "../pages/presensi/child/LogPresence"
// project
import Project from "../pages/project/Project"
// child of project
import AddNewProject from "../pages/project/child/AddNewProject"
import AddNewGroup from "../pages/project/child/AddNewGroup"
import AddNewMeeting from "../pages/project/child/AddNewMeeting"
import AddNewTasks from "../pages/project/child/AddNewTasks"
// request
import RequestManagement from "../pages/request-management/RequestManagement"
// child of request
import ManageOvertime from "../pages/request-management/child/ManageOvertime"
import ManageChangeShift from "../pages/request-management/child/ManageChangeShift"
import ManagePermission from "../pages/request-management/child/ManagePermission"
import ManageReimburse from "../pages/request-management/child/ManageReimburse"
import ManageSalaryClaims from "../pages/request-management/child/ManageSalaryClaims"
import ManageClientVisits from "../pages/request-management/child/ManageClientVisits"
// settings
import Settings from "../pages/settings/Settings"
// child of settings
import SalaryCalculator from "../pages/settings/child/SalaryCalculator"
import SalaryClaims from "../pages/settings/child/SalaryClaims"
import ChangeProfile from "../pages/settings/child/ChangeProfile"
import ManageMembers from "../pages/settings/child/ManageMembers"
import ManageInvitation from "../pages/settings/child/ManageInvitation"
import OfficeSettings from "../pages/settings/child/OfficeSettings"
import DivisionRoles from "../pages/settings/child/DivisionRoles"
// Check In Out
import CheckIn from "../pages/CheckIn"
import CheckOut from "../pages/CheckOut"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Splash />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/onboarding",
    element: <Onboarding />,
  },
  {
    path: "/app",
    element: <Application />,
  },
  {
    path: "/presensi",
    element: <Presensi />,
    children: [
      {
        path: "request-overtime",
        element: <RequestOvertime />,
      },
      {
        path: "request-permission",
        element: <RequestPermission />,
      },
      {
        path: "request-change-shift",
        element: <RequestChangeShift />,
      },
      {
        path: "request-reimburse",
        element: <RequestReimburse />,
      },
      {
        path: "client-visits",
        element: <ClientVisits />,
      },
      {
        path: "log-presence",
        element: <LogPresence />,
      },
    ],
  },
  {
    path: "/project",
    element: <Project />,
    children: [
      {
        path: "add-new-project",
        element: <AddNewProject />,
      },
      {
        path: "add-new-group",
        element: <AddNewGroup />,
      },
      {
        path: "add-new-meeting",
        element: <AddNewMeeting />,
      },
      {
        path: "add-new-tasks",
        element: <AddNewTasks />,
      },
    ],
  },
  {
    path: "/request-management",
    element: <RequestManagement />,
    children: [
      {
        path: "overtime",
        element: <ManageOvertime />,
      },
      {
        path: "change-shift",
        element: <ManageChangeShift />,
      },
      {
        path: "permission",
        element: <ManagePermission />,
      },
      {
        path: "reimburse",
        element: <ManageReimburse />,
      },
      {
        path: "client-visit",
        element: <ManageClientVisits />,
      },
      {
        path: "salary-claims",
        element: <ManageSalaryClaims />,
      },
    ],
  },
  {
    path: "/settings",
    element: <Settings />,
    children: [
      {
        path: "salary-calculator",
        element: <SalaryCalculator />,
      },
      {
        path: "claims-salary",
        element: <SalaryClaims />,
      },
      {
        path: "change-profile",
        element: <ChangeProfile />,
      },
      {
        path: "manage-members",
        element: <ManageMembers />,
      },
      {
        path: "manage-invitation",
        element: <ManageInvitation />,
      },
      {
        path: "office",
        element: <OfficeSettings />,
      },
      {
        path: "division-roles",
        element: <DivisionRoles />,
      },
    ],
  },
  {
    path: "/check-in",
    element: <CheckIn />,
  },
  {
    path: "/check-out",
    element: <CheckOut />,
  },
])

export default router
