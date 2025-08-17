import React from "react";
import { Link } from "react-router-dom";
import './EmbeddedProjectPage.css';

interface EmbeddedProjectProps {
    projectSlug: string;
}

const projectUrls: { [key:string]: string } = {
    'image-gallery': 'https://seturamankumar.github.io/portfolio-sub-image-gallery/',
    'github-finder': 'https://github-finder-black-nine.vercel.app/',
}

function EmbeddedProjectPage({ projectSlug }: EmbeddedProjectProps): React.JSX.Element {
    const projectUrl = projectUrls[projectSlug];

    if(!projectUrl){
        return <h2>Project Not Found</h2>
    }

    return (
        <div className="embedded-project-wrapper">
            <div className="iframe-container">
                <iframe src={projectUrl} title={projectSlug} />
            </div>
            <Link to='/' className="back-link-embedded">← Back to Portfolio</Link>
        </div>
    );
}

export default EmbeddedProjectPage;