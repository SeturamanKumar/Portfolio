import React, { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";

const projectComponentMap = {
    'calculator': lazy(() => import('../my-proj/Calculator/Calculator.jsx')),
    'stopwatch': lazy(() => import('../my-proj/Stopwatch/Stopwatch.jsx')),
    'dropdown-nav': lazy(() => import('../my-proj/DropdownNav/DropdownNav.jsx')),
    'digital-clock': lazy(() => import('../my-proj/DigitalClock/DigitalClock.jsx')),
    'color-picker': lazy(() => import('../my-proj/ColorPicker/ColorPicker.jsx')),
    'to-do-list': lazy(() => import('../my-proj/ToDoList/ToDoList.jsx'))
};

function ProjectPage() {

    const { projectSlug } = useParams();

    console.log("Slug from URL:", projectSlug);

    const ProjectComponent = projectComponentMap[projectSlug];

    return(
        <div>
            <Suspense fallback={<div className="loading-fallback">Loading Project...</div>}>
                {ProjectComponent ? <ProjectComponent /> : <h2>Project Not Found</h2>}
            </Suspense>
        </div>
    );
    
}

export default ProjectPage;