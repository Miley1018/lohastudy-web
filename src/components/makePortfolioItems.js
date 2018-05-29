let today = new Date(Date.now());
const portfolioConstructor = (portfolioItem) => {
    let gapTime = ''
    let createTime = portfolioItem.get('createDateTime')
    if (createTime !== undefined) {
        createTime = new Date(Date.parse(createTime));
        gapTime = Math.ceil((today.getTime() - createTime.getTime()) / (1000 * 3600 * 24))
    }
    return {
        portfolioTitle: portfolioItem.get('projectTitle'),
        createDateTime: gapTime,
        portfolioId: portfolioItem.get('portfolioProjectId')
    };
};

export default function makePortfolioItems(portfolios) {
    return portfolios.filter(portfolio => (portfolio.get('needTranslation') === 'Y'))
        .map(portfolioItem => {
            return {
                ...portfolioConstructor(portfolioItem)
            };
        }).toJS();
}
