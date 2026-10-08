/**
 * @author Souveraine Mabelemo
 * @created 2026-10-06
 */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router";

import { DOCUMENTATION } from "@/lib/documentation";
/**
 * Page d'accueil de la documentation.
 *
 * Présente les différentes rubriques disponibles
 * et permet d'accéder à chacune d'elles.
 */

export function DocumentationIndex() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {/* Chaque rubrique possède un lien vers sa page dédiée. */}

      {DOCUMENTATION.map((doc) => (
        <li key={doc.slug}>
          <Card size="sm" className="h-full">
            <CardHeader className=''>
              <CardTitle  className=''>{doc.title}</CardTitle>
            </CardHeader>
            <CardContent  className=''>
              <Link
                to={`/cni/documentation/${doc.slug}`}
                className="text-primary inline-flex items-center gap-1 text-sm underline underline-offset-4"
              >
                Lire la page
                <ChevronRightIcon className="size-3.5" />
              </Link>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}
