/**
 * @author Souveraine Mabelemo
 * @created 2026-10-06
 */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { OFFICIAL_SOURCES, getDocument } from "@/lib/documentation";
/**
 * Affiche une rubrique précise de la documentation.
 *
 * Le slug transmis par la route permet de retrouver
 * le contenu correspondant dans documentation.js.
 */

export function DocumentationPage({ slug }) {
  const doc = getDocument(slug);
  // Recherche le document correspondant au slug reçu depuis la route.

  if (!doc) {
    return (
      <p className="text-muted-foreground text-sm">
        Cette page de documentation n'existe pas.
      </p>
    );
  }

  return (
    <article className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold tracking-tight">{doc.title}</h2>
      {/* Affiche successivement les différentes sections du document. */}

      {doc.sections.map((section) => (
        <section key={section.title} className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold tracking-wide">
            {section.title}
          </h3>
          {/* Affiche les informations textuelles de la section. */}

          {section.content && (
            <ul className="flex list-disc flex-col gap-2 pl-4">
              {section.content.map((phrase) => (
                <li key={phrase} className="text-sm leading-relaxed">
                  {phrase}
                </li>
              ))}
            </ul>
          )}
          {/* Affiche les éléments sous forme de liste. */}

          {section.items && (
            <ul className="flex list-disc flex-col gap-2 pl-4">
              {section.items.map((item) => (
                <li key={item} className="text-sm leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          )}
          {/* Affiche les données structurées sous forme de tableau. */}

          {section.table && (
            <div className="border-border overflow-x-auto rounded-lg border">
              <Table  className=''>
                <TableHeader className=''>
                  <TableRow  className=''>
                    <TableHead  className=''>Document</TableHead>
                    <TableHead  className=''>Obligatoire</TableHead>
                    <TableHead  className=''>Formats acceptés</TableHead>
                    <TableHead  className=''>Poids maximal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody  className=''>
                  {Object.values(section.table).map((entry) => (
                    <TableRow key={entry.key}  className=''>
                      <TableCell  className=''>
                        <span className="font-medium">{entry.label}</span>
                        <span className="text-muted-foreground block text-xs">
                          {entry.hint}
                        </span>
                      </TableCell>
                      <TableCell  className=''>
                        {entry.obligatoire ? "Oui" : "Selon le cas"}
                      </TableCell>
                      <TableCell className="tabular-nums">
                        {entry.extensions.join(", ")}
                      </TableCell>
                      <TableCell className="tabular-nums">
                        {entry.maxSizeMb} Mo
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </section>
      ))}

      <footer className="border-border border-t pt-4">
        {OFFICIAL_SOURCES.map((source) => (
          <a
            key={source.url}
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground text-xs underline underline-offset-4"
          >
            {source.label}
          </a>
        ))}
      </footer>
    </article>
  );
}
