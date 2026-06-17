import { useState, useEffect, useCallback } from "react";
import { ProjectCard } from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { useTranslations } from "../../i18n/utils";
import type { Project } from "../../types/project";
import type { Locale } from "../../i18n/ui";

export type { Project };

const PROJECTS_TO_SHOW = 6;

export default function ProjectsGrid({
  projects,
  lang = "en",
}: {
  projects: Project[];
  lang?: Locale;
}) {
  const [selected, setSelected] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);
  const t = useTranslations(lang);

  const visibleProjects = showAll
    ? projects
    : projects.slice(0, PROJECTS_TO_SHOW);
  const hasMore = projects.length > PROJECTS_TO_SHOW;

  const close = useCallback(() => setSelected(null), []);

  useEffect(() => {
    if (!selected) {
      document.body.style.overflow = "";
      return;
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [selected, close]);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
            onClick={() => setSelected(project)}
          />
        ))}
      </div>
      {hasMore && (
        <div className="mt-12 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="rounded-lg px-8 py-3 font-semibold text-red-400 hover:text-red-500 transition-colors cursor-pointer"
          >
            {showAll ? t("projects.showLess") : t("projects.showMore")}
          </button>
        </div>
      )}
      {selected && (
        <ProjectModal project={selected} onClose={close} lang={lang} />
      )}
    </>
  );
}
