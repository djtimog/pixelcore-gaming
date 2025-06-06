"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export function CreatBreadCrumb() {
  const pathname = usePathname();
  const pathArray = pathname.split("/");
  const recentPage = pathArray[pathArray.length - 1];
  const otherPages = pathArray.slice(0, -1);

  const getLink = (index: number) => {
    if (index === 0) {
      return "/";
    }
    return `${otherPages.slice(0, index + 1).join("/")}`;
  };
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {otherPages.map((page, index) => (
          <div key={index} className="hidden items-center gap-1 md:flex">
            <BreadcrumbItem>
              <BreadcrumbLink
                href={getLink(index)}
                className="text-muted-foreground"
              >
                {page === ""
                  ? "Home"
                  : page.charAt(0).toUpperCase() + page.slice(1)}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
          </div>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage className="font-bold">
            {recentPage.charAt(0).toUpperCase() + recentPage.slice(1)}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
