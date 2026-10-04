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
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

function estLien(url) {
  return Boolean(url) && url !== "#";
}

function estActif(pathname, url) {
  if (!estLien(url)) {
    return false;
  }
  if (url === "/dashboard") {
    return pathname === url;
  }
  return pathname === url || pathname.startsWith(`${url}/`);
}

function NavGroup({ item, pathname, fermerSurMobile }) {
  const actif = estActif(pathname, item.url);
  const [ouvert, setOuvert] = useState(actif || Boolean(item.isActive));

  useEffect(() => {
    if (actif) {
      setOuvert(true);
    }
  }, [actif]);

  return (
    <Collapsible
      open={ouvert}
      onOpenChange={setOuvert}
      render={<SidebarMenuItem />}
    >
      <SidebarMenuButton
        tooltip={item.title}
        isActive={actif}
        onClick={fermerSurMobile}
        render={estLien(item.url) ? <Link to={item.url} /> : <span />}
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
                    isActive={estActif(pathname, subItem.url)}
                    onClick={fermerSurMobile}
                    render={
                      estLien(subItem.url) ? (
                        <Link to={subItem.url} />
                      ) : (
                        <span />
                      )
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

  function fermerSurMobile() {
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
            fermerSurMobile={fermerSurMobile}
          />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
