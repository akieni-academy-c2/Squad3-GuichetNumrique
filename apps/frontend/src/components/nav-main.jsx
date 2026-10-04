import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";

function isLink(url) {
  return Boolean(url) && url !== "#";
}

function isActive(pathname, url) {
  if (!isLink(url)) {
    return false;
  }
  if (url === "/dashboard") {
    return pathname === url;
  }
  return pathname === url || pathname.startsWith(`${url}/`);
}

function NavGroup({ item, pathname, closeOnMobile }) {
  const groupIsActive = isActive(pathname, item.url);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      render={<SidebarMenuItem />}
    >
      <SidebarMenuButton
        tooltip={item.title}
        isActive={groupIsActive}
        onClick={closeOnMobile}
        render={isLink(item.url) ? <Link to={item.url} /> : <span />}
      >
        {item.icon}
        <span>{item.title}</span>
      </SidebarMenuButton>

      {item.items?.length ? (
        <>
          <CollapsibleTrigger
            render={<SidebarMenuAction className="aria-expanded:rotate-90" />}
          >
            <ChevronRightIcon />
            <span className="sr-only">Toggle</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.items?.map((subItem) => (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton
                    isActive={isActive(pathname, subItem.url)}
                    onClick={closeOnMobile}
                    render={
                      isLink(subItem.url) ? <Link to={subItem.url} /> : <span />
                    }
                  >
                    <span>{subItem.title}</span>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </>
      ) : null}
    </Collapsible>
  );
}

export function NavMain({ items }) {
  const { pathname } = useLocation();
  const { isMobile, setIsMobile } = useSidebar();

  function closeOnMobile() {
    if (isMobile) {
      setIsMobile(false);
    }
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Administration</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <NavGroup
            key={item.title}
            item={item}
            pathname={pathname}
            closeOnMobile={closeOnMobile}
          />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
