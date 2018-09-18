export const getSectionText = (sources, sectionName) => {
    return sources.filter(src => src.key === sectionName)[0].text;
}