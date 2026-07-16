import { useState, useEffect, useCallback, useRef } from "react";
import { ProjectCard } from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { useTranslations } from "../../i18n/utils";
import type { Project } from "../../types/project";
import type { Locale } from "../../i18n/ui";

export type { Project };

const PROJECTS_TO_SHOW = 6;
const MODAL_TRANSITION_MS = 300;

export default function ProjectsGrid({
  projects,
  lang = "en",
}: {
  projects: Project[];
  lang?: Locale;
}) {
  const [selected, setSelected] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t = useTranslations(lang);

  const visibleProjects = showAll
    ? projects
    : projects.slice(0, PROJECTS_TO_SHOW);
  const hasMore = projects.length > PROJECTS_TO_SHOW;

  const open = useCallback((project: Project) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setSelected(project);
  }, []);

  const close = useCallback(() => {
    setIsModalOpen(false);
    closeTimeoutRef.current = setTimeout(
      () => setSelected(null),
      MODAL_TRANSITION_MS,
    );
  }, []);

  // Enter transition: mount closed, then flip open on the next frame
  useEffect(() => {
    if (!selected) return;
    const raf = requestAnimationFrame(() => setIsModalOpen(true));
    return () => cancelAnimationFrame(raf);
  }, [selected]);

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

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project, index) => (
          <ProjectCard
            key={project.title}
            index={index}
            project={project}
            onClick={() => open(project)}
            animate={index < PROJECTS_TO_SHOW}
          />
        ))}
      </div>
      {hasMore && (
        <div className="mt-12 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="rounded-lg px-8 py-3 font-semibold text-red-400 hover:text-red-500 transition-colors cursor-pointer"
            data-scroll-animate="up"
          >
            {showAll ? t("projects.showLess") : t("projects.showMore")}
          </button>
        </div>
      )}
      {selected && (
        <ProjectModal
          project={selected}
          onClose={close}
          lang={lang}
          isOpen={isModalOpen}
        />
      )}
    </>
  );
}
