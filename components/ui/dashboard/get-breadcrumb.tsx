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

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:flex items-center gap-3">
          {otherPages.map((page, index) => (
            <BreadcrumbLink href={`/${page}`} key={index} className="flex items-center gap-2">
              {page === ""
                ? "Home"
                : page.charAt(0).toUpperCase() + page.slice(1)}
        <BreadcrumbSeparator className="hidden md:block" />
            </BreadcrumbLink>
          ))}
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbPage className="font-bold">
            {recentPage.charAt(0).toUpperCase() + recentPage.slice(1)}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
