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
  Settings2Icon,
  TerminalSquareIcon,
} from "lucide-react";

const data = {
  navMain: [
    {
      title: "Tableau de bord",
      url: "#",
      icon: <TerminalSquareIcon />,
      isActive: true,
      items: [
        {
          title: "Historique",
          url: "#",
        },
        {
          title: "Demandes en cours",
          url: "#",
        },
        {
          title: "Documents administratifs",
          url: "#",
        },
      ],
    },
    {
      title: "Mes démarches",
      url: "#",
      icon: <FileTextIcon />,
      items: [
        {
          title: "Nouvelle demande de CNI",
          url: "#",
        },
        {
          title: "Renouvellement",
          url: "#",
        },
        {
          title: "Perte ou vol",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: <BookOpenIcon />,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Pièces à fournir",
          url: "#",
        },
        {
          title: "Tutoriels",
          url: "#",
        },
        {
          title: "Nouveautés",
          url: "#",
        },
      ],
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
                  Centre National d'Identification
                </span>
                <span className="truncate text-xs">Administration</span>
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
