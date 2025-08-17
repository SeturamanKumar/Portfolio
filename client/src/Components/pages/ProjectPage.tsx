import React, { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import EmbeddedProjectPage from './EmbeddedProjectPage';

const projectComponentMap: { [key: string]: React.LazyExoticComponent<React.ComponentType<any>>} = { 
    'calculator': lazy(() => import('../my-proj/Calculator/Calculator.jsx')),
    'stopwatch': lazy(() => import('../my-proj/Stopwatch/Stopwatch.jsx')),
    'dropdown-nav': lazy(() => import('../my-proj/DropdownNav/DropdownNav.jsx')),
    'digital-clock': lazy(() => import('../my-proj/DigitalClock/DigitalClock.jsx')),
    'color-picker': lazy(() => import('../my-proj/ColorPicker/ColorPicker.jsx')),
    'to-do-list': lazy(() => import('../my-proj/ToDoList/ToDoList.jsx'))
};

type ProjectParams = {
    projectSlug: string;
};

const embeddedProjectSlugs = [
    'image-gallery',
    'github-finder',
    'quiz-app',
]

function ProjectPage(): React.JSX.Element {

    const { projectSlug } = useParams<ProjectParams>();

    if(projectSlug && embeddedProjectSlugs.includes(projectSlug)){
        return <EmbeddedProjectPage projectSlug={projectSlug} />
    }

    const ProjectComponent = projectSlug ? projectComponentMap[projectSlug] : null;

    return(
        <div>
            <Suspense fallback={<div className="loading-fallback">Loading Project...</div>}>
                {ProjectComponent ? <ProjectComponent /> : <h2>Project Not Found</h2>}
            </Suspense>
        </div>
    );
    
}

export default ProjectPage;