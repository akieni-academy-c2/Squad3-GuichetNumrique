import {
  BookOpenIcon,
  CalendarClockIcon,
  CircleAlertIcon,
  FileCheckIcon,
  FileTextIcon,
  IdCardIcon,
  MapPinIcon,
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router";

import { DOCUMENTATION } from "@/lib/documentation";

const ICONES = {
  introduction: IdCardIcon,
  "pieces-a-fournir": FileCheckIcon,
  "actes-acceptes": FileTextIcon,
  "types-de-demande": IdCardIcon,
  "delais-de-traitement": CalendarClockIcon,
  "motifs-de-rejet": CircleAlertIcon,
  "centres-de-production": MapPinIcon,
};

export function DocumentationLayout() {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-start gap-3">
        <div className="bg-primary/10 text-primary flex aspect-square size-9 shrink-0 items-center justify-center rounded-lg">
          <BookOpenIcon className="size-5" />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Documentation</h1>
          <p className="text-muted-foreground max-w-3xl text-sm leading-relaxed">
            Tout ce qu'il faut savoir avant de déposer une demande de carte
            nationale d'identité : les pièces, les délais, les centres et les
            règles applicables.
          </p>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[17rem_minmax(0,1fr)]">
        <nav className="lg:sticky lg:top-4 lg:self-start">
          <ul className="flex flex-col gap-1">
            {DOCUMENTATION.map((doc) => {
              const Icone = ICONES[doc.slug] ?? BookOpenIcon;
              const actif = pathname.endsWith(doc.slug);

              return (
                <li key={doc.slug}>
                  <Link
                    to={`/cni/documentation/${doc.slug}`}
                    aria-current={actif ? "page" : undefined}
                    className={
                      actif
                        ? "bg-secondary text-secondary-foreground flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium"
                        : "hover:bg-muted text-muted-foreground hover:text-foreground flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm"
                    }
                  >
                    <Icone className="size-4 shrink-0" />
                    {doc.titre}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
