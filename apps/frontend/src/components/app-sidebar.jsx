import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/auth-context.jsx";
import {
  BookOpenIcon,
  FileTextIcon,
  Landmark,
  TerminalSquareIcon,
} from "lucide-react";

import { TYPES_DEMANDE } from "@/lib/cni-config";
import { DOCUMENTATION } from "@/lib/documentation";

const data = {
  navMain: [
    {
      title: "Tableau de bord",
      url: "/dashboard",
      icon: <TerminalSquareIcon />,
      items: [
        { title: "Historique", url: "#" },
        { title: "Demandes en cours", url: "#" },
        { title: "Documents administratifs", url: "#" },
      ],
    },
    {
      title: "Mes démarches",
      url: "/cni",
      icon: <FileTextIcon />,
      items: TYPES_DEMANDE.map((type) => ({
        title: type.label,
        url: `/cni/formulaire/${type.value}`,
      })),
    },
    {
      title: "Documentation",
      url: "/cni/documentation",
      icon: <BookOpenIcon />,
      items: DOCUMENTATION.map((doc) => ({
        title: doc.title,
        url: `/cni/documentation/${doc.slug}`,
      })),
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { user } = useAuth();

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<a href="#" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Landmark className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  Ministère de l'Intérieur
                </span>
                <span className="truncate text-xs">République du Congo</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
