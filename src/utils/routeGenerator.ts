import { TRoute, TUserRoute } from "../types";

export const routeGenerator = (items: TUserRoute[]) => {
  const routes = items.reduce((acc: TRoute[], item) => {
    if (item.path && item.element) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    }
    if (item.children) {
      item.children.forEach((item) => {
        acc.push({
          path: item.path!,
          element: item.element,
        });
      });
    }
    return acc;
  }, []);
  return routes;
};
