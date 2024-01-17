export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: "admin",
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: "createAdmin",
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: "createFaculty",
      },
      {
        name: "Create Student",
        path: "create-student",
        element: "createStudent",
      },
    ],
  },
  {
    name: "Course Management",
    children: [
      {
        name: "Offered Course",
        path: "offered-course",
        element: "OfferedCourse",
      },
    ],
  },
];

const adminRoutes = adminPaths.reduce((acc, item) => {
  if (item.path && item.element) {
    acc.push({
      path: item.path,
      element: item.element,
    });
  }
  if (item.children) {
    item.children.forEach((item) => {
      acc.push({
        path: item.path,
        element: item.element,
      });
    });
  }
  return acc;
}, []);
const adminNavlinks = adminPaths.reduce((acc, item) => {
  if (item.path && item.name) {
    acc.push({
      key: item.name,
      label: item.path,
    });
  }
  if (item.children) {
    acc.push({
      key: item.name,
      label: item.path,
      children: item.children.map((child) => ({
        key: child.name,
        label: child.path,
      })),
    });
  }
  return acc;
}, []);
console.log(adminNavlinks);
