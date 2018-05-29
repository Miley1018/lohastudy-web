let today = new Date(Date.now());
const projectConstructor = (projectItem) => {
    let gapTime = ''
    let createTime = projectItem.get('projectCreatedDateTime')
    if (createTime !== undefined) {
        createTime = new Date(Date.parse(createTime));
        gapTime = Math.ceil((today.getTime() - createTime.getTime()) / (1000 * 3600 * 24))
    }
    return {
        projectName: projectItem.get('projectName'),
        createTime: gapTime,
        id: projectItem.get('projectId')
    };
};

export default function makeProjectItems(projects) {
    return projects.filter(project => project.get('needTranslation') === 'Y')
        .map(projectItem => {
        return {
            ...projectConstructor(projectItem)
        };
    }).toJS();
}
